"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export default function CheckOut({ mode, amount, formData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [result, setResult] = useState(null);

  const commissionRate = 0.034;
  const cost = parseFloat(formData.cost); // Ensure cost is a number
  if (!isNaN(cost)) {
    var commissionAmount = parseFloat((cost * commissionRate).toFixed(2));
    var totalAmount = parseFloat((cost + commissionAmount).toFixed(2));
  } else {
    console.error("Invalid cost value");
  }
  // cOST CHECK
  const additionalCost = formData.serviceSelectedId === 1 ? 30 : 0;
  const totalWithAdditionalCost = parseFloat((totalAmount + additionalCost).toFixed(2));
  

  const handlePayment = async () => {
    if (!termsAccepted) {
      setError("Please accept the terms and conditions");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const paymentResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formId: formData.id,
            // amount: result == "outprovience" ? cost : totalAmount,
            amount: totalWithAdditionalCost,
            serviceId: formData.serviceType,
            // phonenumber: formData.,
            email:
              formData.serviceType == "pickonly" || mode.mode == "pickanddrop"
                ? formData.pickupEmail
                : formData.dropoffEmail,
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
  // lg:w-[920px]

  return (
    <div className="p-4 mx-auto my-4 bg-white rounded-lg shadow-lg  sm:p-6 max-w-[350px] lg:min-w-[960px] border ">
      <h1 className="mb-4 text-xl font-bold text-black sm:text-2xl sm:mb-6">
        CHECKOUT
      </h1>

      <h2 className="mb-2 text-lg font-semibold text-black sm:mb-4">
        Applicant Details
      </h2>
      
      <div className="overflow-x-auto">
      <table className="  text-sm border-collapse sm:text-base text-black border border-green-50">
      
          <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left text-white bg-red-900 sm:p-2 w-1/3 md:w-1/7">
              Field
            </th>
            {mode.includes("pick") ? (
              <th className="p-2 text-left text-white bg-red-900 sm:p-2 w-1/4 md:w-1/4">
                Pickup Details
              </th>
            ) : null}
            {mode.includes("drop") ? (
              <th className="p-2 text-left text-white bg-red-900 sm:p-2 w-1/3 md:w-1/4">
                Dropoff Details
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {/* Conditional rendering based on service type */}
          {formData.serviceType === "pickanddrop" ? (
            <>
              {/* Pickup Address */}
              <tr>
                <td className="p-2 border border-gray-300">Name</td>
                <td className="p-2 border border-gray-300">
                  {formData.pickupName}
                </td>
                <td className="p-2 border border-gray-300">
                  {formData.dropoffName}
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Address line</td>
                <td className="p-2 border border-gray-300">
                  {formData.pickupAddress}
                </td>
                <td className="p-2 border border-gray-300">
                  {formData.dropoffAddress}
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Address line 1</td>
                <td className="p-2 border border-gray-300">
                  {formData.pickupAddress1}
                </td>
                <td className="p-2 border border-gray-300">
                  {formData.dropoffAddress1}
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">City</td>
                <td className="p-2 border border-gray-300">
                  {formData.pickupCity}
                </td>
                <td className="p-2 border border-gray-300">
                  {formData.dropoffCity}
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Postal Code</td>
                <td className="p-2 border border-gray-300">
                  {formData.pickupPostalCode}
                </td>
                <td className="p-2 border border-gray-300">
                  {formData.dropoffPostalCode}
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Province</td>
                <td className="p-2 border border-gray-300">
                  {formData.pickupProvince}
                </td>
                <td className="p-2 border border-gray-300">
                  {formData.dropoffProvince}
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Contact Number</td>
                <td className="p-2 border border-gray-300">
                  {formData.pickupContactNo}
                </td>
                <td className="p-2 border border-gray-300">
                  {formData.dropoffContactNo}
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Email</td>
                <td className="p-2 border border-gray-300">
                  {formData.pickupEmail}
                </td>
                <td className="p-2 border border-gray-300">
                  {formData.dropoffEmail}
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Passport Number</td>
                <td className="p-2 border border-gray-300">
                  {formData.pickupPassportNo}
                </td>
                <td className="p-2 border border-gray-300">
                  {formData.dropoffPassportNo}
                </td>
              </tr>
            </>
          ) : (
            // If serviceType is not 'pickanddrop', only show relevant section
            <>
              <tr>
                <td className="p-2 border border-gray-300">Name</td>
                <td className="p-2 border border-gray-300">
                  {" "}
                  {mode.includes("pick")
                    ? formData.pickupName
                    : formData.dropoffName}
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Address line</td>
                <td className="p-2 border border-gray-300">
                  {mode.includes("pick")
                    ? formData.pickupAddress
                    : formData.dropoffAddress}
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Address line 1</td>
                <td className="p-2 border border-gray-300">
                  {mode.includes("pick")
                    ? formData.pickupAddress1
                    : formData.dropoffAddress1}
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">City</td>
                <td className="p-2 border border-gray-300">
                  {mode.includes("pick")
                    ? formData.pickupCity
                    : formData.dropoffCity}
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Postal Code</td>
                <td className="p-2 border border-gray-300">
                  {mode.includes("pick")
                    ? formData.pickupPostalCode
                    : formData.dropoffPostalCode}
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Province</td>
                <td className="p-2 border border-gray-300">
                  {mode.includes("pick")
                    ? formData.pickupProvince
                    : formData.dropoffProvince}
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Contact Number</td>
                <td className="p-2 border border-gray-300">
                  {mode.includes("pick")
                    ? formData.pickupContactNo
                    : formData.dropoffContactNo}
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Email</td>
                <td className="p-2 border border-gray-300">
                  {mode.includes("pick")
                    ? formData.pickupEmail
                    : formData.dropoffEmail}
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Passport Number</td>
                <td className="p-2 border border-gray-300">
                  {mode.includes("pick")
                    ? formData.pickupPassportNo
                    : formData.dropoffPassportNo}
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      </div>

      {/* Payment Details */}
      <div className="mb-6 sm:mb-8 mt-5">
        <h2 className="mb-2 text-lg font-semibold text-black sm:mb-4">
          Payment Details
        </h2>
        <div className="overflow-x-auto">
        <table className="min-w-[340px] sm:min-w-full w-[320px] sm:w-full text-sm border-collapse sm:text-base">
      
            <thead>
              <tr>
                <th className="p-2 text-left text-white bg-red-900 sm:p-3">
                  SERVICE
                </th>
                <th className="p-2 text-left text-white bg-red-900 sm:p-3">
                  NUMBER OF APPLICANTS
                </th>
                <th className="p-2 text-left text-white bg-red-900 sm:p-3">
                  TOTAL CHARGES
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="p-2 text-black capitalize border sm:p-3">
                  {formData.serviceType}
                </td>
                <td className="p-2 text-black border sm:p-3">1</td>
                <td className="p-2 text-black border sm:p-3">
                  ${cost}
                </td>
              </tr>

              {/* {result == "outprovience" ? null : ( */}
                <tr className="bg-gray-50">
                  <td
                    className="p-2 text-black capitalize border sm:p-3"
                    colSpan={2}
                  >
                    Service Charges
                  </td>
                  <td className="p-2 text-black border sm:p-3">
                    {/* {result == "outprovience" ? 0 : `$${commissionAmount}`} */}
                    ${commissionAmount}
                  </td>
                </tr>
                {additionalCost > 0 && (
                <tr className="bg-gray-50">
                  <td className="p-2 text-black capitalize border sm:p-3" colSpan={2}>
                    Form filling assistance
                  </td>
                  <td className="p-2 text-black border sm:p-3">
                    ${additionalCost}
                  </td>
                </tr>
              )}
              {/* )} */}

              <tr className="font-semibold bg-gray-50">
                <td className="p-2 text-black border sm:p-3" colSpan={2}>
                  TOTAL
                </td>
                <td className="p-2 text-black border sm:p-3">
                  {/* {result == "outprovience" ? formData.cost : `$${totalAmount}`} */}
                  ${totalWithAdditionalCost}
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
            className="px-4 py-2 text-sm text-white bg-red-900 rounded sm:px-6 sm:text-base hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </div>
  );
}
