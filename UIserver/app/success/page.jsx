'use client'

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Loader2, Home } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  )
}

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const type = searchParams.get('type'); // Extracting the 'type' parameter from the URL
  const [paymentStatus, setPaymentStatus] = useState('loading');
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (sessionId) {
      const fetchPaymentStatus = async () => {
        try {
          // Check the type and set the appropriate URL
          const endpoint = type === 'services'
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/payment/services/confirm-payment`
            : `${process.env.NEXT_PUBLIC_BASE_URL}/payment/confirm-payment`;

          const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          });
          const data = await res.json();


          if (data.status === "succeeded") {
            setPaymentStatus('success');
            setMessage("Payment successful! Thank you for your purchase.");
          } else {
            setPaymentStatus('error');
            setMessage("Payment failed. Please try again.");
          }
        } catch (error) {
          setPaymentStatus('error');
          setMessage("Error confirming payment.");
        }
      };

      fetchPaymentStatus();
    } else {
      setPaymentStatus('error');
      setMessage("Invalid session. Please try again.");
    }
  }, [sessionId, type]); // Include 'type' in the dependency array

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-b from-green-100 to-white">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          {paymentStatus === 'loading' && (
            <Loader2 className="w-12 h-12 mx-auto text-blue-500 animate-spin" />
          )}
          {paymentStatus === 'success' && (
            <>
              <CheckCircle className="w-12 h-12 mx-auto text-green-500" />
            </>
          )}
          {paymentStatus === 'error' && (
            <XCircle className="w-12 h-12 mx-auto text-red-500" />
          )}
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            {paymentStatus === 'loading' ? 'Processing your payment...' : message}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {paymentStatus === 'success' && "We have added your request to the queue. You will shortly receive an email or call from our official email address for further communication. info@blsindia-canada.ca"}
            {paymentStatus === 'error' && "If you continue to have issues, please contact our support team at info@blsindia-canada.ca."}
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/" className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg">
            <Home className="w-4 h-4 mr-2" /> Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
