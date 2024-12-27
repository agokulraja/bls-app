"use client";

import React, { useState } from "react";
import axios from "axios";
import { encodeMessage } from "@/utils/decoder";
import { useRouter } from "next/navigation";

const formFields = [
  {
    id: "1",
    title: "PCC",
    linktext: "PCC",
    fields: [
      {
        name: "email",
        label: "Enter your email",
        type: "email",
      },
      {
        name: "indianPassport",
        label: "Indian Passport First and Last Page",
        type: "file",
      },
      { name: "dob", label: "D.O.B", type: "date" },
      { name: "passportNumber", label: "Passport Number", type: "text" },
      {
        name: "birthDistrict",
        label: "District of Place of Birth",
        type: "text",
      },
      { name: "status", label: "canadian status proof", type: "file" },
      { name: "policeStation", label: "Police Station", type: "text" },
      {
        name: "indianAddressProof",
        label:
          "Address Proof Indian if it doesn't match with the last page of the Indian Passport",
        type: "file",
      },
      { name: "education", label: "Education", type: "text" },
      {
        name: "canadaAddressProof",
        label: "Canada Address Proof",
        type: "file",
      },
      { name: "aadharCard", label: "Aadhar Card (Optional)", type: "text" },
      { name: "indianMobNo", label: "Indian Phone number", type: "tel" },
      { name: "canadianMobNo", label: "Canadian Phone number", type: "tel" },
      {
        name: "employmentStatus",
        label: "Job (Student/unemployed/self-employed/private/others)",
        type: "select",
        options: [
          "Student",
          "Unemployed",
          "Self employed",
          "Private",
          "Others",
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Passport Renewal - Adult",
    linktext: "Passport-Renewal-Adult",

    fields: [
      {
        name: "email",
        label: "Enter your email",
        type: "email",
      },
      {
        name: "indianPassport",
        label: "Indian Passport First and Last Page",
        type: "file",
      },
      { name: "dob", label: "D.O.B", type: "date" },
      { name: "passportNumber", label: "Passport Number", type: "text" },
      {
        name: "birthDistrict",
        label: "District of Place of Birth",
        type: "text",
      },
      { name: "canadianStatus", label: "Canadian Status", type: "file" },
      { name: "policeStation", label: "Police Station", type: "text" },
      {
        name: "parentsPassport",
        label:
          "Parents Passport copy (In case of name change in your Indian passport and your parents' Passports)",
        type: "file",
      },
      { name: "education", label: "Education", type: "text" },
      {
        name: "indianAddressProof",
        label:
          "Address Proof Indian if it doesn't match with the last page of the Indian Passport",
        type: "file",
      },
      { name: "aadharCard", label: "Aadhar Card (Optional)", type: "text" },
      {
        name: "canadaAddressProof",
        label: "Canada Address Proof",
        type: "file",
      },
      { name: "indianMobNo", label: "Indian Phone number", type: "tel" },
      { name: "canadianMobNo", label: "Canadian Phone number", type: "tel" },
      {
        name: "employmentStatus",
        label: "Job (Student/unemployed/self-employed/private/others)",
        type: "select",
        options: [
          "Student",
          "Unemployed",
          "Self employed",
          "Private",
          "Others",
        ],
      },
      { name: "email", label: "Email Id", type: "email" },
      {
        name: "emergencyContactName",
        label: "Emergency Contact Name",
        type: "text",
      },
      {
        name: "emergencyContactAddress",
        label: "Emergency Contact Address",
        type: "text",
      },
      {
        name: "emergencyContactNumber",
        label: "Emergency Contact Number",
        type: "tel",
      },
    ],
  },
  {
    id: "3",
    title: "Passport Renewal - Minor",
    linktext: "Passport-Renewal-Minor",

    fields: [
      {
        name: "email",
        label: "Enter your email",
        type: "email",
      },
      {
        name: "indianPassport",
        label: "Indian Passport First and Last Page",
        type: "file",
      },
      { name: "dob", label: "D.O.B", type: "date" },
      { name: "passportNumber", label: "Passport Number", type: "text" },
      {
        name: "birthDistrict",
        label: "District of Place of Birth",
        type: "text",
      },
      { name: "canadianStatus", label: "Canadian Status", type: "file" },
      { name: "policeStation", label: "Police Station", type: "text" },
      {
        name: "parentsIndianPassport",
        label: "Parents Indian Passport Copy",
        type: "file",
      },
      { name: "education", label: "Education", type: "text" },
      {
        name: "parentsCanadianStatus",
        label: "Parents Canadian Status",
        type: "file",
      },
      {
        name: "indianAddressProof",
        label:
          "Address Proof Indian if it doesn't match with the last page of the Indian Passport",
        type: "file",
      },
      {
        name: "canadaAddressProof",
        label: "Canada Address Proof",
        type: "file",
      },
      { name: "indianMobNo", label: "Indian Phone number", type: "tel" },
      { name: "canadianMobNo", label: "Canadian Phone number", type: "tel" },
      {
        name: "employmentStatus",
        label: "Job (Student/unemployed/self-employed/private/others)",
        type: "select",
        options: [
          "Student",
          "Unemployed",
          "Self employed",
          "Private",
          "Others",
        ],
      },
      { name: "email", label: "Email Id", type: "email" },
      {
        name: "emergencyContactName",
        label: "Emergency Contact Name",
        type: "text",
      },
      {
        name: "emergencyContactAddress",
        label: "Emergency Contact Address",
        type: "text",
      },
      {
        name: "emergencyContactNumber",
        label: "Emergency Contact Number",
        type: "tel",
      },
    ],
  },
  {
    id: "4",
    title: "Passport Surrender",
    linktext: "Passport-Surrender",

    fields: [
      {
        name: "email",
        label: "Enter your email",
        type: "email",
      },
      {
        name: "indianPassport",
        label: "Indian Passport First and Last Page",
        type: "file",
      },
      { name: "dob", label: "D.O.B", type: "date" },
      { name: "passportNumber", label: "Passport Number", type: "text" },
      {
        name: "birthDistrict",
        label: "District of Place of Birth",
        type: "text",
      },
      {
        name: "citizenshipCertificate",
        label: "Citizenship Certificate",
        type: "file",
      },
      { name: "education", label: "Education", type: "text" },
      {
        name: "foreignPassport",
        label: "Canadian Passport / Foreign Passport",
        type: "file",
      },
      { name: "aadharCard", label: "Aadhar Card (Optional)", type: "text" },
      {
        name: "canadaAddressProof",
        label: "Canada Address Proof",
        type: "file",
      },
      { name: "canadianMobNo", label: "Canadian Phone Number", type: "tel" },
      {
        name: "emergencyContactName",
        label: "Emergency Contact Name",
        type: "text",
      },
      {
        name: "emergencyContactAddress",
        label: "Emergency Contact Address",
        type: "text",
      },
      {
        name: "emergencyContactNumber",
        label: "Emergency Contact Number",
        type: "tel",
      },
    ],
  },
  {
    id: "5",
    title: "OCI Adult - Indian Origin",
    linktext: "OCI-Adult-Indian-Origin",

    fields: [
      {
        name: "email",
        label: "Enter your email",
        type: "email",
      },
      {
        name: "surrenderCertificate",
        label:
          "Surrender Certificate (Only applicable to those applicants who received citizenship after June 2010)",
        type: "file",
      },
      {
        name: "indianPassport",
        label: "Indian Passport First and Last Page",
        type: "file",
      },
      { name: "dob", label: "D.O.B", type: "date" },
      { name: "passportNumber", label: "Passport Number", type: "text" },
      {
        name: "citizenshipCertificate",
        label: "Citizenship Certificate",
        type: "file",
      },
      { name: "canadianPassport", label: "Canadian Passport", type: "file" },
      {
        name: "marriageCertificate",
        label: "Marriage Certificate",
        type: "file",
      },
      {
        name: "spouseCurrentPassport",
        label: "Spouse Current Passport",
        type: "file",
      },
      { name: "employmentAddress", label: "Employment Address", type: "text" },
      { name: "employerPhone", label: "Employer Phone Number", type: "tel" },
      { name: "addressProof", label: "Address Proof", type: "file" },
      {
        name: "familyOciCard",
        label: "Family Member OCI Card (If applicable)",
        type: "file",
      },
      { name: "canadianMobNo", label: "Canadian Phone Number", type: "tel" },
      { name: "email", label: "Email ID", type: "email" },
      {
        name: "parentsRelativeName",
        label: "Parents/Grandparents/Relative Name",
        type: "text",
      },
      {
        name: "parentsRelativeAddress",
        label: "Parents/Grandparents/Relative- Indian Address",
        type: "text",
      },
      {
        name: "parentsRelativeAge",
        label: "Parents/Grandparents/Relative- Age",
        type: "text",
      },
      {
        name: "familyOciStatus",
        label: "Do you or any family member have an OCI Card which is Granted?",
        type: "text",
      },
    ],
  },
  {
    id: "6",
    title: "OCI Minor - Indian Origin",
    linktext: "OCI-Minor-Indian-Origin",
    fields: [
      {
        name: "email",
        label: "Enter your email",
        type: "email",
      },
      {
        name: "surrenderCertificate",
        label: "Surrender Certificate",
        type: "file",
      },
      { name: "dob", label: "D.O.B", type: "date" },
      { name: "passportNumber", label: "Passport Number", type: "text" },
      {
        name: "indianPassport",
        label: "Indian Passport First and Last Page",
        type: "file",
      },
      {
        name: "citizenshipCertificate",
        label: "Citizenship Certificate",
        type: "file",
      },
      { name: "canadianPassport", label: "Canadian Passport", type: "file" },
      {
        name: "marriageCertificate",
        label: "Marriage Certificate",
        type: "file",
      },
      {
        name: "parentsCanadianStatus",
        label:
          "Parents Canadian Status (Canadian Passport/Study Permit/Work Permit)",
        type: "file",
      },
      {
        name: "parentsIndianPassport",
        label: "Parents Indian Passport",
        type: "file",
      },
    ],
  },
];

export default function OCIApplicationForm({ serviceId }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false); // Loader state
  const [submitMessage, setSubmitMessage] = useState(null);
  const router = useRouter();

  const selectedForm = formFields.find((form) => form.linktext === serviceId);


  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    let newValue = value;

    // Check for specific input fields and ensure only numeric values
    if (
      name === "indianMobNo" ||
      name === "emergencyContactNumber" ||
      name === "canadianMobNo"
    ) {
      newValue = newValue.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : newValue,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    setSubmitMessage("");
    e.preventDefault();

    const missingFields = selectedForm.fields.filter(
      (field) => !formData[field.name] && field.type !== "file"
    );
    if (missingFields.length) {
      setSubmitMessage({
        type: "error",
        message: "Please fill the required feilds",
      });
      return;
    }

    setLoading(true);
    const uploadedFiles = {};

    // Loop through fields and upload files
    for (const field of selectedForm.fields) {
      if (field.type === "file" && formData[field.name]) {
        try {
          const formDataObj = new FormData();
          formDataObj.append("file", formData[field.name]); // Append the file to FormData

          const uploadResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/upload`,
            formDataObj,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          const fileId = uploadResponse.data.fileMetadata.id;
          uploadedFiles[
            field.name
          ] = `https://drive.google.com/uc?id=${fileId}`;
        } catch (error) {
          console.error(`Failed to upload ${field.label}:`, error);
          setSubmitMessage({
            type: "error",
            message: `File upload failed for ${field.label}`,
          });
          setLoading(false);
          return;
        }
      }
    }
    const data = {
      serviceId: selectedForm.id,
    };

    // Merge uploaded file links into formData
    const dataToSubmit = { ...formData, ...uploadedFiles, ...data };

    // Submit complete form data
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/services`,
        dataToSubmit
      );

      const encryptedId = encodeMessage(String(response.data.id));
      router.push(
        `/services-checkout?serviceid=${encodeURIComponent(encryptedId)}`
      );

      setSubmitMessage({
        type: "success",
        message: "Form submitted successfully",
      });
    } catch (error) {
      setSubmitMessage({
        type: "error",
        message: "Failed to submit form. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case "file":
        return (
          <div key={field.name} className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-black"
            >
              {field.label}
            </label>
            <input
              type="file"
              id={field.name}
              name={field.name}
              onChange={handleInputChange}
              className="block w-full mt-1 text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        );
      case "select":
        return (
          <div key={field.name} className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-black"
            >
              {field.label}
            </label>
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 mt-1 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select {field.label}</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return (
          <div key={field.name} className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-black"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 mt-1 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        );
    }
  };

  return (
    <div className="bg-[#F4E3B8] w-full mx-auto relative">
      {loading ? (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-20">
          <div className="fixed w-8 h-8 border-t-2 border-b-4 border-blue-600 rounded-full top-1/2 left-1/2 animate-spin"></div>
        </div>
      ) : null}
      <div className="max-w-4xl py-6 mx-auto sm:px-6 lg:px-8 ">
        {selectedForm ? (
          <form
            onSubmit={handleSubmit}
            className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
          >
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              {selectedForm.title}
            </h2>
            {selectedForm.fields.map(renderField)}
            {submitMessage && (
              <div
                className={`p-4 rounded-md ${
                  submitMessage.type === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
                role="alert"
              >
                {submitMessage.message}
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              {loading ? "Submiting" : "Submit"}
            </button>
          </form>
        ) : (
          <p className="text-gray-600">Form not found</p>
        )}
      </div>
    </div>
  );
}
