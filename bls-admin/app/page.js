'use client'
import { useState, useEffect } from "react";
import WeeklyLineGraph from '../components/WeeklyLineGraph';
import PieChart from '../components/PieChart';
import SalesPrediction from "@/components/SalesPrediction";

const quotes = [
  "Success is the sum of lgall efforts, repeated day in and day out.  –  Robert Collier",
  "Alone we can do so little; together we can do so much.\n   –  Helen Keller",
  "Great things never come from comfort zones.  \n –  Anonymous",
  "Don’t watch the clock; do what it does. Keep going. \n   – Sam Levenson",
  "The harder you work for something, the greater you’ll feel when you achieve it. \n – Anonymous",
  "The only limit to our realization of tomorrow is our doubts of today. \n  – Franklin D. Roosevelt",
];

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [serviceTypeStats, setServiceTypeStats] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success/week`
        );
        const data = await response.json();
        setWeeklyData(data.weeklyData);
      } catch (error) {
        console.error("Error fetching weekly data:", error);
      }
    };

    fetchWeeklyData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 dark:text-white">
      {/* Carousel Section */}
      <div className="w-full h-[200px] lg:h-[300px] bg-red-900 text-white flex flex-col justify-center items-center">
        <h1 className="text-xl lg:text-2xl font-bold text-center px-4">
          {quotes[currentQuote]
            .split("\n")
            .map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
        </h1>

        <div className="flex justify-center mt-4 gap-2">
          {quotes.map((_, idx) => (
            <span
              key={idx}
              className={`h-3 w-3 rounded-full ${
                currentQuote === idx
                  ? "bg-white"
                  : "bg-red-300 dark:bg-red-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full max-w-7xl  py-8 lg:flex flex-col min-w-full items-center dark:bg-gray-900 dark: text-white">
     
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Service Statistics
        </h1>
        {serviceTypeStats && weeklyData ? (
          <>
            <div className="flex flex-col gap-8 lg:gap-12">
              {/* Charts */}
              {/* <div className="flex flex-col lg:flex-row justify-between gap-6 w-full  rounded-lg p-6 "> */}
                {/* <div className="w-full lg:w-1/2"> */}
                  <PieChart isDarkMode/>
                {/* </div> */}
                <div className="w-full ">
                  <WeeklyLineGraph data={weeklyData} />
                </div>
              {/* </div> */}
             
            </div>
            <div className="w-full">
                <SalesPrediction />
              </div>
          </>
        ) : (
          <p className="text-gray-600 text-center">Loading...</p>
        )}
      </div>
    </div>
  );
}
