import React, { useEffect, useState } from "react";
import CircularProgressBar from "./CircularProgressBar";

const PieChart = ({ isDarkMode }) => {
  const [serviceTypeStats, setServiceTypeStats] = useState({
    pickonly: 0,
    droponly: 0,
    pickanddrop: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success/serviceTypeStats`
        );
        const data = await response.json();
        setServiceTypeStats(data.serviceTypeStats);
      } catch (error) {
        console.error("Error fetching service type stats:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate total and percentages
  const total =
    serviceTypeStats.pickonly +
    serviceTypeStats.droponly +
    serviceTypeStats.pickanddrop;

  const calculatePercentage = (count) => (total ? (count / total) * 100 : 0);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <CircularProgressBar
          value={calculatePercentage(serviceTypeStats.pickonly)}
          text="Pick Only Services"
          isDarkMode={isDarkMode}
        />
        <CircularProgressBar
          value={calculatePercentage(serviceTypeStats.droponly)}
          text="Drop Only Services"
          isDarkMode={isDarkMode}
        />
        <CircularProgressBar
          value={calculatePercentage(serviceTypeStats.pickanddrop)}
          text="Pick and Drop Services"
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default PieChart;
