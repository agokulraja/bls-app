"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export default function ServicesCheckOut({ formData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const commissionRate = 0.034;
  const commissionAmount = parseFloat((formData.service.price * commissionRate).toFixed(2));
  const totalAmount = parseFloat((formData.service.price + parseFloat(commissionAmount)).toFixed(2));

  const handlePayment = async () => {
    if (!termsAccepted) {
      setError("Please accept the terms and conditions");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const paymentResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/services/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            serviceName:formData.service.serviceName,
            formId: formData.id,
            amount: totalAmount,
            serviceId: formData.service.id,
            email:formData.email,
          }),
        }
      );

      const { id: sessionId } = await paymentResponse.json();

      const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`);

      (await stripe).redirectToCheckout({ sessionId });
    } catch (err) {

      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  
      <div className="p-4 mx-auto bg-white rounded-lg shadow-lg max-w-7xl sm:p-6 lg:min-w-[950px]">
      <h1 className="mb-4 text-xl font-bold text-black sm:text-2xl sm:mb-6 text-center">
        CHECKOUT
      </h1>

      {/* Applicant Details */}
      <div className="mb-6 sm:mb-8">
        <h2 className="mb-2 text-lg font-semibold text-black sm:mb-4">
          Applicant Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse sm:text-base">
            <thead>
              <tr>
                <th className="p-2 text-left text-white bg-blue-600 sm:p-3">
                  Service
                </th>
                <th className="p-2 text-left text-white bg-blue-600 sm:p-3">
                  Email
                </th>
                <th className="p-2 text-left text-white bg-blue-600 sm:p-3">
                  Passport
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-blue-50">
                <td className="p-2 text-black border sm:p-3">
                  {formData.service.serviceName }
                </td>
                <td className="p-2 text-black border sm:p-3">
                  {formData.email}
                </td>
                <td className="p-2 text-black border sm:p-3">
                  {formData.passportNumber}
                </td>

              </tr>
            </tbody>
          </table>
        </div>
       
      </div>

      {/* Payment Details */}
      <div className="mb-6 sm:mb-8">
        <h2 className="mb-2 text-lg font-semibold text-black sm:mb-4">
          Payment Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse sm:text-base">
            <thead>
              <tr>
                <th className="p-2 text-left text-white bg-blue-600 sm:p-3">
                  SERVICE
                </th>
                <th className="p-2 text-left text-white bg-blue-600 sm:p-3">
                  TOTAL CHARGES
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="p-2 text-black capitalize border sm:p-3">
                  {formData.service.serviceName}
                </td>
                <td className="p-2 text-black border sm:p-3">
                  ${formData.service.price}
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2 text-black capitalize border sm:p-3">
                  Service Charges
                </td>
                <td className="p-2 text-black border sm:p-3">
                  ${commissionAmount}
                </td>
              </tr>
              <tr className="font-semibold bg-gray-50">
                <td className="p-2 text-black border sm:p-3">
                  TOTAL
                </td>
                <td className="p-2 text-black border sm:p-3">
                  ${totalAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Terms and Payment */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-2 sm:items-center">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="w-4 h-4 mt-1 border-gray-300 rounded sm:mt-0"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I have read and agree with the above mentioned terms and conditions.
          </label>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end">
          <button
            onClick={handlePayment}
            disabled={isSubmitting || !termsAccepted}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded sm:px-6 sm:text-base hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </div>
  );
}
