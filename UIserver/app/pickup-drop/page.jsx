'use client';

import AddressForm from '@/components/AddressForm';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function PageContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [mode, setMode] = useState(null);

  useEffect(() => {
    if (type) {
      setMode(type || null);
    }
  }, [type]);

  return mode ? <div className='bg-[#F4E3B8] w-full'><AddressForm mode={mode} /> </div>: <div>Please select a mode</div>;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading Address Form...</div>}>
      <PageContent />
    </Suspense>
  );
}
