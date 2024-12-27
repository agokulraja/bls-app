"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PicAndDropOff from '@/public/Images/pickandDropOff.png';
import PickupDropOffSeoBlock from "./seoLinkBlockPickUpDrop";

const PickupDropPage = () => {
  const router = useRouter();

  const services = [
    {
      title: "PICK UP AND DROP OFF",
      description: "PLEASE CHOOSE THIS SERVICE IF YOU ARE SENDING FRESH APPLICATION TO BLS CENTER",
      image: '/pickandDropOff.webp',
      alt: "Pick Up and Drop Off",
      type: "pickanddrop",
    },
    {
      title: "PICK UP",
      description: "PLEASE CHOOSE THIS SERVICE IF YOU ARE SENDING ANY PENDING DOCUMENT",
      image: '/pickUp.webp',
      alt: "Pick Up",
      type: "pickonly",
    },
    {
      title: "DROP OFF",
      description: "PLEASE CHOOSE THIS SERVICE IF YOU WANT YOUR DOCUMENT TO BE DELIVERED AT YOUR ADDRESS",
      image: "/dropOff.webp",
      alt: "Drop Off",
      type: "droponly",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-center text-2xl font-bold text-orange-600 mb-8">
        BLS PICK AND DROP SERVICES
      </h1>
      <p className="text-center text-lg font-bold text-gray-800 mb-8">
        Get reliable pickup and drop-off services from us at
        <span className="text-orange-500 font-extrabold"> Unbeatable </span>
        prices. We ensure
        <span className="text-orange-500 font-extrabold"> hassle-free </span>
        and
        <span className="text-orange-500 font-extrabold"> Affordable delivery</span>!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden text-center p-6">
            <Image
              src={service.image}
              alt={service.alt}
              width={150}
              height={200}
              className="w-full h-45 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold mb-2 text-gray-900">{service.title}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-200"
              onClick={() => router.push(`/pickup-drop?type=${service.type}`)}
            >
              Proceed
            </button>
          </div>
        ))}
      </div>
      <div className="text-black">
        <hr className="border-t-2 border-gray-300 w-1/2 mx-auto mb-6 mt-10" />
        <div className="p-6 max-w-5xl mx-auto font-sans leading-relaxed">
          <h2 className="text-xl text-red-800 font-semibold mb-4">Important Information:</h2>
          <p className="mb-4">
            <span className="font-bold">PICK-UP:</span> We’ll pick up your application package from your doorstep on the scheduled date.
            Please make sure to include all documents, the application form, and the demand draft as listed in the checklist.
          </p>
          <p className="mb-4">
            <span className="font-bold">DROP-OFF (Return Courier):</span> Once processed by the consulate, we’ll send the documents back to your mailing address.
          </p>
          <p className="mb-4">
            <span className="font-bold">PICK-UP AND DROP-OFF (TOGETHER):</span> If this is your first time using BLS service, we’ll pick up the application from your doorstep and deliver the processed documents back to you.
          </p>
          <p className="mb-4">
            <span className="font-bold">PICK-UP (SEPARATE):</span> If you need to send any additional documents later, you can use this separate pick-up service.
          </p>
          <p className="mb-4">
            <span className="font-bold">DROP-OFF (SEPARATE):</span> If your application status says "Ready for collection," you can book this delivery service to get your documents sent to you.
          </p>
        </div>
      </div>
      <PickupDropOffSeoBlock/>
    </div>
  );
};

export default PickupDropPage;
