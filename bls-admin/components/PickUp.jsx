"use client";

import React, { useState, useEffect } from "react";
import { fetchPaymentsData } from "../services/paymentService";
import { useRouter, useSearchParams } from "next/navigation";
import PickUpOnlyTable from "./PickUpOnlyTable";
import PickAndDropTable from "./PickAndDropOnly";
import DropOnlyTable from "./DropOnlyTable";
import AllServicesTable from "./AllServicesTable";

const PickUp = () => {
  const [payments, setPayments] = useState([]);
  const [category, setCategory] = useState("all");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getPayments = async () => {
      const storedPayments = JSON.parse(sessionStorage.getItem("payments"));
      if (storedPayments) {
        setPayments(storedPayments);
      } else {
        try {
          const data = await fetchPaymentsData();
          if (Array.isArray(data)) {
            sessionStorage.setItem("payments", JSON.stringify(data));
            setPayments(data);
          } else {
            console.error("Invalid data format:", data);
          }
        } catch (error) {
          console.error("Error fetching payments data:", error);
        }
      }
    };
    getPayments();
  }, []);

  useEffect(() => {
    const categoryFromQuery = searchParams.get("category") || "all";
    setCategory(categoryFromQuery);
  }, [searchParams]);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    router.push(`?category=${newCategory}`);
  };

  const handleViewDetails = (id) => {
    router.push(`/details/${id}`);
  };

  const handleViewDropDetails = (id) => {
    router.push(`/drop/${id}`);
  };

  const handleViewPickDetails = (id) => {
    router.push(`/details/pick/${id}`);
  };

  const renderTableComponent = () => {
    switch (category) {
      case "pickuponly":
        return <PickUpOnlyTable payments={payments} onViewDetails={handleViewPickDetails} />;
      case "pickanddrop":
        return <PickAndDropTable payments={payments} onViewDetails={handleViewDetails} />;
      case "droponly":
        return <DropOnlyTable payments={payments} onViewDetails={handleViewDropDetails} />;
      case "all":
        return <AllServicesTable payments={payments} onViewDetails={handleViewDetails} />;
      default:
        return <div>Select a category to display data</div>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold dark:text-white">Courier Requests</h1>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="p-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="pickuponly">Pickup Only</option>
          <option value="pickanddrop">Pick and Drop</option>
          <option value="droponly">Drop Only</option>
        </select>
      </div>
      {renderTableComponent()}
    </div>
  );
};

export default PickUp;
