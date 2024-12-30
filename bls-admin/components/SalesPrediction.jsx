import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import _ from "lodash";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SalesPrediction = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const currentMonth = selectedDate.toLocaleString("default", { month: "long" });
  const currentYear = selectedDate.getFullYear();
  const today = new Date();

  const fetchData = async (month, year) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        // `https://api.blsinternational.ca/api/payment/sales-report?month=${month}&year=${year}`
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/sales-report?month=${month}&year=${year}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      const parsedResult = result.map((item) => ({
        ...item,
        total_sales: parseInt(item.total_sales, 10),
      }));
      setData(parsedResult);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedDate.getMonth() + 1, currentYear);
  }, [selectedDate]);

  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  const totalSales = _.sumBy(data, "total_sales");
  const averageDailySales = totalSales / data.length;
  const maxDailySales = _.maxBy(data, "total_sales")?.total_sales || 0;
  const minDailySales = _.minBy(data, "total_sales")?.total_sales || 0;

  const Prediction = Math.round((averageDailySales * 365) / 12);
  const lastWeekSales = data.slice(-7);
  const lastWeekAverage = _.meanBy(lastWeekSales, "total_sales");
  const TrendPrediction = Math.round((lastWeekAverage * 365) / 12);

  const formatCanadianDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      // timeZone: "America/Toronto", 
    };
    return new Intl.DateTimeFormat("en-CA", options).format(new Date(dateString));
  };
  const chartData = data.map((item) => ({
    sales: item.total_sales,
    date: item.sale_date,
  }));

  const handleMonthChange = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const isPrevDisabled =
    selectedDate.getFullYear() === 2024 && selectedDate.getMonth() === 10;
  const isNextDisabled =
    selectedDate.getFullYear() === today.getFullYear() &&
    selectedDate.getMonth() >= today.getMonth();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-md max-w-5xl mx-auto mt-6">
      {/* Header Section */}
      <div className="flex items-center justify-center mb-6 relative">
        <button
          onClick={() => handleMonthChange(-1)}
          disabled={isPrevDisabled}
          className={`absolute left-2 md:left-4 p-2 rounded-full ${
            isPrevDisabled
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-gray-700 text-white hover:bg-gray-800"
          }`}
        >
          <FaChevronLeft size={20} />
        </button>
        <h2 className="text-sm font-light p:4 md:text-2xl lg:font-semibold text-gray-800 dark:text-white">
              Monthly Sales Report of {`${currentMonth} ${currentYear}`}
        </h2>
        <button
          onClick={() => handleMonthChange(1)}
          disabled={isNextDisabled}
          className={`absolute right-2 md:right-4 p-2 rounded-full ${
            isNextDisabled
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-gray-700 text-white hover:bg-gray-800"
          }`}
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      {/* Summary and Predictions */}
      <div className="grid grid-cols-1 text-black md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded shadow-md bg-green-100 dark:bg-green-500">
          <h3 className="text-lg font-medium text-green-700 dark:text-white mb-4">
            Sales Summary
          </h3>
          <p className="text-gray-800 dark:text-gray-200">
            Total Sales: <span className="font-bold">{totalSales}</span>
          </p>
          <p className="text-gray-800 dark:text-gray-200">
            Average Daily Sales:{" "}
            <span className="font-bold">{averageDailySales.toFixed(2)}</span>
          </p>
          <p className="text-gray-800 dark:text-gray-200">
            Max Daily Sales: <span className="font-bold">{maxDailySales}</span>
          </p>
          <p className="text-gray-800 dark:text-gray-200">
            Min Daily Sales: <span className="font-bold">{minDailySales}</span>
          </p>
        </div>

        <div className="p-4 rounded shadow-md bg-blue-200 dark:text-white  dark:bg-blue-500">
          <h3 className="text-lg font-medium text-blue-700 mb-4 dark:text-white">
            Predictions
          </h3>
          <p className="text-gray-800 dark:text-gray-200">
            Simple Prediction: <span className="font-bold">{Prediction}</span>
          </p>
          <p className="text-gray-800 dark:text-gray-200">
            Trend-based Prediction:{" "}
            <span className="font-bold">{TrendPrediction}</span>
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-4 rounded shadow-md bg-white dark:bg-gray-700">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e0e0e0"
              className="dark:stroke-gray-400"
            />
            <XAxis
              dataKey="date"
                    tick={{ fill: "#555" }}
              className="dark:fill-gray-200 dark:text-white"
            />
            <YAxis
              tick={{ fill: "#555" }}
              className="dark:fill-gray-200"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                color: "#333",
              }}
              wrapperStyle={{
                borderColor: "#ccc",
              }}
              className="dark:!bg-gray-800 dark:!text-white dark:!border-gray-600"
            />
            <Legend
              wrapperStyle={{
                color: "#333",
              }}
              className="dark:text-gray-200"
            />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 4 }}
              className="dark:stroke-blue-400"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default SalesPrediction;
