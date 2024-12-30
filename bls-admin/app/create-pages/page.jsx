"use client"
import Pages from '@/components/PageCreation';
import usePagePermission from '@/components/usePagePermission';
import React from 'react';

function page(props) {
    const pageId = 16;
    const { hasAccess, isLoading, userId } = usePagePermission(pageId);
  
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full border-t-transparent animate-spin"></div>
            <p className="mt-4 text-xl font-semibold text-gray-700">Loading...</p>
          </div>
        </div>
      );
    }
  
    if (!hasAccess) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="max-w-md p-6 text-center bg-white rounded-lg shadow-lg">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01m-6.938 4h13.856c1.054 0 1.934-.816 1.994-1.851L21 17.1V6.9a2 2 0 00-1.851-1.994L19 5H5a2 2 0 00-1.994 1.851L3 6.9v10.2c0 1.054.816 1.934 1.851 1.994L5 19z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Access Denied</h1>
            <p className="mt-2 text-gray-600">
              You do not have permission to view this page. Please contact the
              administrator for assistance.
            </p>
          </div>
        </div>
      );
    }
    return (
        <div className="items-center justify-center page FLEX">
            <Pages/>
        </div>
    );
}

export default page;