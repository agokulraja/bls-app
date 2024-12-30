// import React from "react";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

// const CircularProgressBar = ({ value, text }) => {
//   return (
//     <div className="max-w-sm mx-auto p-6 bg-gradient-to-br from-red-500 to-red-700 rounded-xl shadow-xl flex flex-col justify-center items-center space-y-4">
//       <div className="w-32 h-32 md:w-40 md:h-40">
//         <CircularProgressbar
//           value={value}
//           text={`${value.toFixed(1)}%`}
//           styles={buildStyles({
//             pathColor: "#ffffff", 
//             textColor: "#ffffff",
//             trailColor: "rgba(255, 255, 255, 0.2)", 
//             strokeLinecap: "round", 
//             pathTransitionDuration: 0.5, 
//             strokeWidth: 16, 
//           })}
//         />
//       </div>
//       {/* Text Label */}
//       <div className="px-4 py-2 border border-white/30 bg-white/10 rounded-full text-white text-sm font-medium shadow-md">
//         {text}
//       </div>
//     </div>
//   );
// };

// export default CircularProgressBar;
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar = ({ value, text,isDarkMode }) => {
  // Service-specific color configurations
  console.log(isDarkMode);
  const serviceColors = {
    "Pick Only Services": {
      lightPrimaryColor: "#4CAF50", // Green
      lightSecondaryColor: "#E8F5E9",
      darkGradientFrom: "#FF5722",
      darkGradientTo: "#F4511E"
    },
    "Drop Only Services": {
      lightPrimaryColor: "#2196F3", // Blue
      lightSecondaryColor: "#E3F2FD",
      darkGradientFrom: "#FF5722",
      darkGradientTo: "#F4511E"
    },
    "Pick and Drop Services": {
      lightPrimaryColor: "#FF5722", // Orange
      lightSecondaryColor: "#FBE9E7",
      darkGradientFrom: "#FF5722",
      darkGradientTo: "#F4511E"
    }
  };

  // Determine colors based on service type
  const serviceColor = serviceColors[text] || serviceColors["Pick Only Services"];

  return (
    <div 
      className="max-w-sm mx-auto p-6 
                 bg-white rounded-xl shadow-lg 
                 dark:bg-gradient-to-br dark:from-red-500 dark:to-red-700 
                 flex flex-col justify-center items-center space-y-4
                 transition-all duration-300 ease-in-out hover:scale-105"
    >
      <div className="w-32 h-32 md:w-40 md:h-40">
        <CircularProgressbar
          value={value}
          text={`${value.toFixed(1)}%`}
          styles={buildStyles({
            pathColor: isDarkMode ? "#ffffff" : "#3b82f6", // White for dark mode, blue for light mode
            textColor: isDarkMode ? "#ffffff" : "#3b82f6", // White for dark mode, blue for light mode
            trailColor: isDarkMode ? "rgba(255, 255, 255, 0.2)" : "#d1d5db", // Light gray for light mode
            strokeLinecap: "round",
            strokeWidth: 16,
          })}
        />
      </div>
      {/* Text Label */}
      <div 
        className="px-4 py-2 border rounded-full text-sm font-medium shadow-md
                   dark:border-white/30 dark:bg-white/10 dark:text-white
                   border-gray-200 bg-gray-100 text-gray-700
                   group"
      >
        <span 
          className="dark:text-white 
                     text-gray-700"
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default CircularProgressBar;