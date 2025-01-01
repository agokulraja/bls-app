// "use client";

// import React, { useState, useEffect } from "react";
// import { fetchPaymentsData } from "../services/paymentService";
// import { useRouter, useSearchParams } from "next/navigation";
// import PickUpOnlyTable from "./PickUpOnlyTable";
// import PickAndDropTable from "./PickAndDropOnly";
// import DropOnlyTable from "./DropOnlyTable";
// import AllServicesTable from "./AllServicesTable";

// const PickUp = () => {
//   const [payments, setPayments] = useState([]);
//   const [category, setCategory] = useState("all");
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const getPayments = async () => {
//       // const storedPayments = JSON.parse(sessionStorage.getItem("payments"));
//       // if (!storedPayments) {
//       //   setPayments(storedPayments);
//       // } else {
//         try {
//           const data = await fetchPaymentsData();
//           if (Array.isArray(data)) {
//             sessionStorage.setItem("payments", JSON.stringify(data));
//             setPayments(data);
//           } else {
//             console.error("Invalid data format:", data);
//           }
//         } catch (error) {
//           console.error("Error fetching payments data:", error);
//         }
//       // }
//     };
//     getPayments();
//   }, []);

//   useEffect(() => {
//     const categoryFromQuery = searchParams.get("category") || "all";
//     setCategory(categoryFromQuery);
//   }, [searchParams]);

//   const handleCategoryChange = (e) => {
//     const newCategory = e.target.value;
//     setCategory(newCategory);
//     router.push(`?category=${newCategory}`);
//   };

//   const handleViewDetails = (id) => {
//     router.push(`/details/${id}`);
//   };

//   const handleViewDropDetails = (id) => {
//     router.push(`/drop/${id}`);
//   };

//   const handleViewPickDetails = (id) => {
//     router.push(`/details/pick/${id}`);
//   };

//   const renderTableComponent = () => {
//     switch (category) {
//       case "pickuponly":
//         return <PickUpOnlyTable payments={payments} onViewDetails={handleViewPickDetails} />;
//       case "pickanddrop":
//         return <PickAndDropTable payments={payments} onViewDetails={handleViewDetails} />;
//       case "droponly":
//         return <DropOnlyTable payments={payments} onViewDetails={handleViewDropDetails} />;
//       case "all":
//         return <AllServicesTable payments={payments} onViewDetails={handleViewDetails} />;
//       default:
//         return <div>Select a category to display data</div>;
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-3xl font-bold dark:text-white">Courier Requests</h1>
//         <select
//           value={category}
//           onChange={handleCategoryChange}
//           className="p-2 text-sm border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="all">All</option>
//           <option value="pickuponly">Pickup Only</option>
//           <option value="pickanddrop">Pick and Drop</option>
//           <option value="droponly">Drop Only</option>
//         </select>
//       </div>
//       {renderTableComponent()}
//     </div>
//   );
// };

// export default PickUp;



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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch payments data
  useEffect(() => {
    const getPayments = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch data
        const data = await fetchPaymentsData();
        if (Array.isArray(data)) {
          sessionStorage.setItem("payments", JSON.stringify(data));
          setPayments(data);
        } else {
          throw new Error("Invalid data format received from the server");
        }
      } catch (error) {
        console.error("Error fetching payments data:", error);
        setError("Failed to load payment data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getPayments();
  }, []);

  // Sync category with query parameters
  useEffect(() => {
    const categoryFromQuery = searchParams.get("category") || "all";
    setCategory(categoryFromQuery);
  }, [searchParams]);

  // Handle category change
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    router.push(`?category=${newCategory}`);
  };

  // Table rendering logic based on category
  const renderTableComponent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div className="text-red-500">{error}</div>;
    }

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

  // Navigate to detail views
  const handleViewDetails = (id) => router.push(`/details/${id}`);
  const handleViewDropDetails = (id) => router.push(`/drop/${id}`);
  const handleViewPickDetails = (id) => router.push(`/details/pick/${id}`);

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold dark:text-white">Courier Requests</h1>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="p-2 text-sm border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="pickuponly">Pickup Only</option>
          <option value="pickanddrop">Pick and Drop</option>
          <option value="droponly">Drop Only</option>
        </select>
      </div>

      {/* Table Component */}
      {renderTableComponent()}
    </div>
  );
};

export default PickUp;
