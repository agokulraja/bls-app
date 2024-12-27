'use client';

import { useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard'; 

export default function TrackPage() {
  const [passportNumber, setPassportNumber] = useState('');
  const [dob, setDob] = useState('');
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/track`, { passportNumber, dob });
    
      if (response.data.applications.length > 0) {
        setApplications(response.data.applications);
        setShowDashboard(true);
      } else {
        setError("No applications found.");
        setApplications([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  if (!showDashboard) {
    return (
      <div className="bg-[#F4E3B8] mx-auto py-4">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col  items-center min-h-screen bg-gradient-to-br from-[#FFF8E1] to-[#FFE4B5]">
            <div className="w-full lg:p-4 space-y-4 mt-4 mb-4 lg:mb-0">
                <h2 className="text-xl md:text-3xl font-semibold text-[#2F4F4F] text-center">Enter your details</h2>
            </div>
            
            <div className="w-full p-2 bg-white rounded-lg shadow-xl md:p-8 md:m-4 lg:w-2/5 mx-auto">
                <form onSubmit={handleTrack} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#2F4F4F]">Passport Number</label>
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2F4F4F]">Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 mt-4 text-white font-semibold rounded-lg bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={loading}
                >
                  {loading ? 'Tracking...' : 'Track Application'}
                </button>
              </form>
              {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <Dashboard applications={applications} />;
}
