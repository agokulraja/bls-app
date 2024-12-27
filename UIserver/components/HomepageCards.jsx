import React from 'react';
import { TbPackageExport } from "react-icons/tb";
import { LuPackageOpen } from "react-icons/lu";
import { FaWhatsapp, FaWpforms } from "react-icons/fa";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";


const HomePageCards = () => {
  return (
    <div className="border backdrop-blur-3xl bg-red-800/90  rounded-lg shadow-lg shadow-gray-300 text-white mb-20">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-10 lg:px-10">        
        <div className="flex flex-wrap gap-4 mt-4 justify-between text-center">
          <a href="/pickup-drop?type=pickanddrop" className="flex-1 flex flex-col items-center justify-center bg-red-100 p-4 rounded-md text-black hover:bg-red-700 transition duration-300 ease-in-out">
            <LuPackageOpen className="text-4xl mb-2 text-red-900" />
            <span>Pickup Drop-off</span>
          </a>
          <a href="/track-application" className="flex-1 flex flex-col items-center justify-center bg-red-100 p-4 rounded-md text-black hover:bg-red-700 transition duration-300 ease-in-out">
           <FaMagnifyingGlassLocation  className="text-4xl mb-2 text-red-900" />
            <span>Track Shipment</span>
          </a>
          <a href="/services" className="flex-1 flex flex-col items-center justify-center bg-red-100 p-4 rounded-md text-black hover:bg-red-700 transition duration-300 ease-in-out">
            <FaWpforms className="text-4xl mb-2 text-red-900" />
            <span>Form Filling</span>
          </a>
          <a href="https://api.whatsapp.com/send/?phone=%2B12892012094&text=Hi+India+Visa+and+Consular+Services%2C+I+would+like+to+inquire+about+courier+services.&type=phone_number&app_absent=0" className="flex-1 flex flex-col items-center justify-center bg-red-100 p-4 rounded-md text-black hover:bg-red-700 transition duration-300 ease-in-out">
            <FaWhatsapp className="text-4xl mb-2 text-red-900" />
            <span>Support</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePageCards;
