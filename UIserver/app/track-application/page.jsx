"use client";

import React, { useEffect, useState, Suspense } from 'react';
import ShipmentStatus from '@/components/TrackApplication';
import SeoContentTrackingBlock from '@/components/SeoLinkBlockforTracking';


function TrackShipment() {
  const [trackingNumber, setTrackingNumber] = useState(null);

useEffect(() => {
  if (typeof window !== 'undefined') {
    const query = new URLSearchParams(window.location.search);
    setTrackingNumber(query.get('trackingNumber'));
  }
}, []);

  return (
   <>
      <ShipmentStatus trackingNumber={trackingNumber} /> 
   </>
  );
}

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackShipment/>
      <SeoContentTrackingBlock/>
    </Suspense>
  );
}

export default Page;
