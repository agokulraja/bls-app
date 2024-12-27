"use client";

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import { Loader, AlertCircle } from 'lucide-react';
import { decodeMessage } from '@/utils/decoder';
import ServicesCheckOut from '@/components/ServicesCheckOut';
import DisableBackNavigation from '@/components/DisableBackNavigation';


function CheckOutPageContent() {
  const searchParams = useSearchParams();
  const formId = searchParams.get('serviceid');
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const decryptedId = decodeMessage(formId);

  useEffect(() => {
    const fetchFormData = async () => {
      if (!decryptedId) return;
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/services/${decryptedId}`);
        setFormData(response);
      } catch (err) {
        console.error('Error fetching form data:', err);
        setError('Failed to load form data.');
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, [decryptedId]);

  return (

    <div className='flex items-center justify-center w-full min-h-screen bg-[#F4E3B8]'>
      <DisableBackNavigation/>
      {loading ? (
        <div className="flex items-center justify-center h-40">
          {/* <Loader className="animate-spin" size={24} /> */}
          <p className="ml-2">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-40 text-red-500">
          <AlertCircle size={24} />
          <p className="ml-2">{error}</p>
        </div>
      ) : (
        formData ? (
          <ServicesCheckOut formData={formData.data} />
        ) : (
          <p className="mt-4 text-center">No data available.</p>
        )
      )}
    </div>
  );
}

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckOutPageContent />
    </Suspense>
  );
}

export default Page;
