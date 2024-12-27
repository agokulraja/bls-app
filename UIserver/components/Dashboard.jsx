'use client';
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import UpdateForm from './UpdateForm'; 

export default function Dashboard({ applications }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);  

  const handleUpdateClick = (app) => {
    setSelectedApp(app);  
    setIsFormVisible(true);  
  };
  
  
  const handleUpdate = (updatedApp) => {
    setIsFormVisible(false); 
  };


  const handleCancel = () => {
    setIsFormVisible(false); 
  };

  return (
    <div className="bg-[#F4E3B8] min-h-screen py-6">
      <div className="px-4 mx-auto max-w-4xl">
        <div className="w-full mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#2F4F4F]">
            Your Applications
          </h2>
        </div>

        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.applicationId} className="bg-[#FFF8E1] p-4 rounded-lg shadow-md flex justify-between items-center">
              <p className="font-semibold text-[#2F4F4F]">{app.applicationId} {app.serviceName}</p>
              <button
                onClick={() => handleUpdateClick(app)}
                className="flex items-center px-6 py-3 text-white transition-colors duration-300 ease-in-out bg-green-600 rounded-lg hover:bg-green-700"
              >
                Update Details
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          ))}
        </div>
        
        {isFormVisible && selectedApp && (
          <UpdateForm 
            selectedApp={selectedApp} 
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}
