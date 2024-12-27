"use client";
import React, { useEffect } from "react";

const CalendlyWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-gray-50 items-center py-10 px-4">
      <h1 className="mb-4 text-4xl font-semibold text-center text-red-800 mt-8">
        Get Your BLS Forms Filled Out Quickly and Accurately
      </h1>
      <p className="max-w-4xl mx-auto text-center text-gray-950">
        Looking to complete your BLS forms without hassle? Our professional BLS
        form-filling services streamline the process to ensure your application
        is accurate and compliant. Whether you're a healthcare professional
        needing documentation for certification or recertification, we make it
        simple and stress-free. The form filling process takes approximately
        **20 minutes to 1 hour** depending on the complexity of your case.
      </p>

      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/blsindia-canada-info?hide_gdpr_banner=1&text_color=b71c1c&primary_color=ff0000"
        style={{ minWidth: "320px", height: "700px" }}
      ></div>

      {/* Service Offerings Section */}
      <div className="mt-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Our 1:1 Form Filling Services
        </h2>

        <ul className="list-disc ml-6 text-gray-600">
                <li>PCC</li>
                <li>Passport Renewal - Adult</li>
                <li>Passport Renewal - Minor </li>
                <li>Passport Surrender</li>
                <li>OCI Adult - Indian Origin </li>
                <li>OCI Minor - Indian Origin </li>
              </ul>
      </div>
    </div>
  );
};

export default CalendlyWidget;
