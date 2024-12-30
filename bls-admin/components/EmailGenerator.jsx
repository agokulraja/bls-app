import React, { useState } from "react";
import { FiCopy } from "react-icons/fi"; 

const EmailForm = ({ formData }) => {
  const [purolatorPin, setPurolatorPin] = useState("");
  const [pickupNumber, setPickupNumber] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const generateEmail = () => {
    const emailTemplate = `
<html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #2a2a2a;">
        <p>Hi <strong style="text-transform: capitalize;">${formData.pickupName}</strong>,</p>
        <p>
            This e-mail confirms that your Pickup request has been scheduled. 
            Your pickup confirmation number is <strong style="color: #000;">${pickupNumber}</strong>.
        </p>
        <h3 style="color: #000; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Pickup Details</h3>
        <ul style="list-style: none; padding-left: 0;">
            <li><strong>Date: </strong>${formData.pickupDate}</li>
            <li><strong>Pickup Window:</strong> ${formData.pickupTime}</li>
            <li><strong>Address:</strong>${formData.pickupAddress}, ${formData.pickupCity}, ${formData.pickupPostalCode}, ${formData.pickupProvince}</li>
        </ul>
        <h3 style="color: #000; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Shipment Details</h3>
        <ul style="list-style: none; padding-left: 0;">
            <li><strong>Total Weight:</strong> 1 lbs</li>
            <li><strong>Number of Pieces:</strong>1</li>
        </ul>
        <p>
            Thank you for using Purolator. This message confirms the creation of a shipment to BLS INTERNATIONAL SERVICES 
            starting with tracking number / PIN: 
            <a href="https://www.purolator.com/en/shipping/tracker?pin=${purolatorPin}" style="color: #0066cc; text-decoration: none;">
                ${purolatorPin}
            </a>.
        </p>
        <p style="margin-top: 20px; color: #e67e22; font-weight: bold;">Thanks and Regards,</p>
        <p>
            <strong>BLS India</strong><br/>
            Email: <a href="mailto:info@blsindia-canada.ca" style="color: #0066cc;">info@blsindia-canada.ca</a><br/>
            Website: <a href="https://blsindia-canada.ca" style="color: #0066cc;">blsindia-canada.ca</a><br/>
            <strong style="color: #e67e22;">BLS India Visa And Consular Services</strong>
        </p>
    </body>
</html>
`;
    setGeneratedEmail(emailTemplate.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset the "Copied!" state after 2 seconds
    });
  };

  return (
    <div className="email-form border border-white mt-4 p-3 bg-gray-500 rounded-md">
      <h2 className="text-lg font-semibold text-center mb-3">Email Template Generator</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ flex: "1" }}>Purolator PIN:</label>
          <input
            type="text"
            value={purolatorPin}
            onChange={(e) => setPurolatorPin(e.target.value)}
            className="text-black"
            placeholder="Enter Purolator PIN"
            style={{
              flex: "2",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ flex: "1" }}>Pickup Confirmation Number:</label>
          <input
            type="text"
            value={pickupNumber}
            onChange={(e) => setPickupNumber(e.target.value)}
            className="text-black"
            placeholder="Enter Pickup Confirmation Number"
            style={{
              flex: "2",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          onClick={generateEmail}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            alignSelf: "flex-start",
          }}
        >
          Generate Email
        </button>
      </div>
      {generatedEmail && (
        <div className="email-preview" style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>Generated Email:</h3>
            <button
              onClick={copyToClipboard}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "5px 10px",
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <FiCopy size={18} />
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
          <textarea
            value={`Purolator Label | Pickup and Drop-off Request`}
            readOnly
            rows="1"
            cols="1"
            style={{
              color: "black",
              width: "100%",
              padding: "10px",
              fontFamily: "monospace",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          ></textarea>
          
          <textarea
            value={generatedEmail}
            readOnly
            rows="10"
            cols="50"
            style={{
              color: "black",
              width: "100%",
              padding: "10px",
              fontFamily: "monospace",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default EmailForm;
