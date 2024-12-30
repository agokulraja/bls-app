import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyLineGraph = (weeklyData) => {
  if (!weeklyData || Object.keys(weeklyData).length === 0) {
    return <p className="text-center text-lg font-medium text-gray-600 dark:text-gray-300">No data available</p>;
  }

  const applicationsCountByDay = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  };

  Object.keys(weeklyData).forEach((serviceType) => {
    const serviceData = weeklyData[serviceType];

    serviceData.forEach((item) => {
      console.log(item.createdAt);
      const day = new Date(item.createdAt).toLocaleDateString("en-CA", {
        weekday: "short",
        timeZone: "UTC",
      });

      if (applicationsCountByDay[day] !== undefined) {
        applicationsCountByDay[day] += 1;
      }
    });
  });

  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const data = labels.map((day) => applicationsCountByDay[day]);

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center">
        Weekly Successful Submissions
      </h2>
      <div className="relative overflow-x-auto">
        <Bar
          data={{
            labels,
            datasets: [
              {
                label: "Total Applications",
                data,
                backgroundColor: "rgba(75, 192, 192, 0.7)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: false,
              },
              legend: {
                position: "top",
                labels: {
                  color: "#4B5563",
                  font: {
                    size: 12,
                  },
                },
              },
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                titleColor: "#fff",
                bodyColor: "#fff",
              },
            },
            scales: {
              x: {
                ticks: {
                  color: "#4B5563", 
                },
                grid: {
                  color: "rgba(107, 114, 128, 0.2)", 
                },
              },
              y: {
                ticks: {
                  color: "#4B5563",
                  stepSize: 1,
                },
                grid: {
                  color: "rgba(107, 114, 128, 0.2)",
                },
                beginAtZero: true,
              },
            },
          }}
          height={280}
        />
      </div>
    </div>
  );
};

export default WeeklyLineGraph;
