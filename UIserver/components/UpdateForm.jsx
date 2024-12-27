'use client';
const formFields = [
  {
    id: "1",
    title: "PCC",
    linktext: "PCC",
    fields: [
      {
        name: "indianPassport",
        label: "Indian Passport First and Last Page",
        type: "file",
      },
      { name: "dob", label: "D.O.B", type: "date", value: "" },
      { name: "passportNumber", label: "Passport Number", type: "text", value: "" },
      {
        name: "birthDistrict",
        label: "District of Place of Birth",
        type: "text",
        value: ""
      },
      { name: "status", label: "Status", type: "file",  },
      { name: "policeStation", label: "Police Station", type: "text", value: "" },
      {
        name: "indianAddressProof",
        label: "Address Proof Indian if it doesn't match with the last page of the Indian Passport",
        type: "file",
      },
      { name: "education", label: "Education", type: "text", value: "" },
      {
        name: "canadaAddressProof",
        label: "Canada Address Proof",
        type: "file",
      },
      { name: "aadharCard", label: "Aadhar Card (Optional)", type: "text", value: "" },
      { name: "indianMobNo", label: "Indian Phone number", type: "tel", value: "" },
      { name: "canadianMobNo", label: "Canadian Phone number", type: "tel", value: "" },
      {
        name: "employmentStatus",
        label: "Job (Student/unemployed/self-employed/private/others)",
        type: "select",
        options: [
          "Student",
          "Unemployed",
          "Self employed",
          "Private",
          "Others"
        ],
        value: ""
      },
      { name: "email", label: "Email Id", type: "email", value: "" },
    ]
  },
  {
    id: "2",
    title: "Passport Renewal - Adult",
    linktext: "Passport-Renewal-Adult",
    fields: [
      {
        name: "indianPassport",
        label: "Indian Passport First and Last Page",
        type: "file",
      },
      { name: "dob", label: "D.O.B", type: "date", value: "" },
      { name: "passportNumber", label: "Passport Number", type: "text", value: "" },
      {
        name: "birthDistrict",
        label: "District of Place of Birth",
        type: "text",
        value: ""
      },
      { name: "canadianStatus", label: "Canadian Status", type: "file" },
      { name: "policeStation", label: "Police Station", type: "text", value: "" },
      {
        name: "parentsPassport",
        label: "Parents Passport copy (In case of name change in your Indian passport and your parents' Passports)",
        type: "file",
      },
      { name: "education", label: "Education", type: "text", value: "" },
      {
        name: "indianAddressProof",
        label: "Address Proof Indian if it doesn't match with the last page of the Indian Passport",
        type: "file",
      },
      { name: "aadharCard", label: "Aadhar Card (Optional)", type: "text", value: "" },
      {
        name: "canadaAddressProof",
        label: "Canada Address Proof",
        type: "file",
      },
      { name: "indianMobNo", label: "Indian Phone number", type: "tel", value: "" },
      { name: "canadianMobNo", label: "Canadian Phone number", type: "tel", value: "" },
      {
        name: "employmentStatus",
        label: "Job (Student/unemployed/self-employed/private/others)",
        type: "select",
        options: [
          "Student",
          "Unemployed",
          "Self employed",
          "Private",
          "Others"
        ],
        value: ""
      },
      { name: "email", label: "Email Id", type: "email", value: "" },
      {
        name: "emergencyContactName",
        label: "Emergency Contact Name",
        type: "text",
        value: ""
      },
      {
        name: "emergencyContactAddress",
        label: "Emergency Contact Address",
        type: "text",
        value: ""
      },
      {
        name: "emergencyContactNumber",
        label: "Emergency Contact Number",
        type: "tel",
        value: ""
      },
    ]
  },{
    id: "3",
    title: "Passport Renewal - Minor",
    linktext: "Passport-Renewal-Minor",

    fields: [
      {
        name: "indianPassport",
        label: "Indian Passport First and Last Page",
        type: "file",
      },
      { name: "dob", label: "D.O.B", type: "date",value: ""  },
      { name: "passportNumber", label: "Passport Number", type: "text",value: "" },
      {
        name: "birthDistrict",
        label: "District of Place of Birth",
        type: "text",
        value: ""
      },
      { name: "canadianStatus", label: "Canadian Status", type: "file" },
      { name: "policeStation", label: "Police Station", type: "text",value: "" },
      {
        name: "parentsIndianPassport",
        label: "Parents Indian Passport Copy",
        type: "file",
      },
      { name: "education", label: "Education", type: "text",value: "" },
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
      { name: "indianMobNo", label: "Indian Phone number", type: "tel",value: "" },
      { name: "canadianMobNo", label: "Canadian Phone number", type: "tel",value: "" },
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
        ],value: ""
      },
      { name: "email", label: "Email Id", type: "email",value: "" },
      {
        name: "emergencyContactName",
        label: "Emergency Contact Name",
        type: "text",
        value: ""
      },
      {
        name: "emergencyContactAddress",
        label: "Emergency Contact Address",
        type: "text",
        value: ""
      },
      {
        name: "emergencyContactNumber",
        label: "Emergency Contact Number",
        type: "tel",
        value: ""
      },
    ],
  },
  {
    id: "4",
    title: "Passport Surrender",
    linktext: "Passport-Surrender",

    fields: [
      {
        name: "indianPassport",
        label: "Indian Passport First and Last Page",
        type: "file",
      },
      { name: "dob", label: "D.O.B", type: "date" ,value: "" },
      { name: "passportNumber", label: "Passport Number", type: "text" ,value: ""},
      {
        name: "birthDistrict",
        label: "District of Place of Birth",
        type: "text",
        value: ""
      },
      {
        name: "citizenshipCertificate",
        label: "Citizenship Certificate",
        type: "file",
      },
      { name: "education", label: "Education", type: "text" ,value: ""},
      {
        name: "foreignPassport",
        label: "Canadian Passport / Foreign Passport",
        type: "file",
      },
      { name: "aadharCard", label: "Aadhar Card (Optional)", type: "text",value: "" },
      {
        name: "canadaAddressProof",
        label: "Canada Address Proof",
        type: "file",
      },
      { name: "canadianMobNo", label: "Canadian Phone Number", type: "tel",value: "" },
      {
        name: "emergencyContactName",
        label: "Emergency Contact Name",
        type: "text",
        value: ""
      },
      {
        name: "emergencyContactAddress",
        label: "Emergency Contact Address",
        type: "text",
        value: ""
      },
      {
        name: "emergencyContactNumber",
        label: "Emergency Contact Number",
        type: "tel",
        value: ""
      },
    ],
  },
  {
    id: "5",
    title: "OCI Adult - Indian Origin",
    linktext: "OCI-Adult-Indian-Origin",
    

    fields: [
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
      { name: "dob", label: "D.O.B", type: "date",value: ""  },
      { name: "passportNumber", label: "Passport Number", type: "text",value: "" },
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
      { name: "employmentAddress", label: "Employment Address", type: "text" ,value: ""},
      { name: "employerPhone", label: "Employer Phone Number", type: "tel",value: "" },
      { name: "addressProof", label: "Address Proof", type: "file" },
      {
        name: "familyOciCard",
        label: "Family Member OCI Card (If applicable)",
        type: "file",
      },
      { name: "canadianMobNo", label: "Canadian Phone Number", type: "tel" ,value: ""},
      { name: "email", label: "Email ID", type: "email", value: "" },
      {
        name: "parentsRelativeName",
        label: "Parents/Grandparents/Relative Name",
        type: "text",
        value: ""
      },
      {
        name: "parentsRelativeAddress",
        label: "Parents/Grandparents/Relative- Indian Address",
        type: "text",
        value: ""
      },
      {
        name: "parentsRelativeAge",
        label: "Parents/Grandparents/Relative- Age",
        type: "text",
        value: ""
      },
      {
        name: "familyOciStatus",
        label: "Do you or any family member have an OCI Card which is Granted?",
        type: "text",
        value: ""
      },
    ],
  },
  {
    id: "6",
    title: "OCI Minor - Indian Origin",
    linktext: "OCI-Minor-Indian-Origin",
    fields: [
      {
        name: "surrenderCertificate",
        label: "Surrender Certificate",
        type: "file",
      },
      { name: "dob", label: "D.O.B", type: "date", value: "" },
      { name: "passportNumber", label: "Passport Number", type: "text", value: "" },
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
      { name: "canadianPassport", label: "Canadian Passport", type: "file", value: "" },
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
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheckCircle  } from "react-icons/fa";

const renderField = (field, formData, handleInputChange) => {
  const [showMessage, setShowMessage] = useState(false);
  return (
    <div key={field.name} className="mb-4">
      <label
        htmlFor={field.name}
        className="block text-sm font-medium text-gray-700"
      >
        {field.label}
      </label>
    
      {field.type === "file" ? (
        <>
        {formData[field.name] && (
          <div className="relative">
            <FaCheckCircle 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-700 cursor-pointer"
              size={20} 
              onMouseOver={() => setShowMessage(true)} 
              onMouseOut={() => setShowMessage(false)} 
            />
            <div
              className={`absolute top-full mt-1 text-xs text-gray-700 bg-yellow-200 rounded-lg px-2 py-1 transition-all duration-300 ${
                showMessage ? "block" : "hidden"
              }`}
              style={{ right: "0" }}
            >
              Document Submitted
            </div>
          </div>
        )}
        <input
          type="file"
          id={field.name}
          name={field.name}
          onChange={handleInputChange}
          className="block w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </>
      ) 
      : field.type === "select" ? (
        <select
          id={field.name}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleInputChange}
          className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select {field.label}</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type}
          id={field.name}
          name={field.name}
           
          value={formData[field.name] || ""}
          onChange={handleInputChange}
          className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      )}
    </div>
  );
};

export default function UpdateForm({ selectedApp, onCancel }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  
  useEffect(() => {
    if (selectedApp) {
      setFormData({ ...selectedApp });
    }
  }, [selectedApp]);

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  
  const selectedForm = formFields.find((form) => form.linktext === selectedApp.serviceName);

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
   
    for (const field of selectedForm.fields) {
      if (field.type === "file" && formData[field.name] ) {
       if (formData[field.name] instanceof File && formData[field.name].type === "application/pdf") {
        try {
          const formDataObj = new FormData();
          formDataObj.append("file", formData[field.name]);
          
          const uploadResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/upload`,
            formDataObj
          );
    
          const fileId = uploadResponse.data.fileMetadata.id;
          uploadedFiles[
            field.name
          ] = `https://drive.google.com/uc?id=${fileId}`;
        } catch (error) {
          setSubmitMessage({
            type: "error",
            message: `File upload failed for ${field.label}`,
          });
          setLoading(false);
          return;
        }
       }
      }
    }
    
    const data = {
      serviceId:selectedForm.id ,
    };

    const dataToSubmit = { ...formData, ...uploadedFiles, ...data };

    try {
     const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/services/${selectedApp.applicationId}`, dataToSubmit);
      setSubmitMessage({
        type: "success",
        message: "Form updated successfully",
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

  return (
    <div className="bg-[#ecebe7] w-full mx-auto mt-6">
    <div className="max-w-4xl py-6 mx-auto sm:px-6 lg:px-8 ">
    <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
          onSubmit={handleSubmit}>
      
      <div className="  flex justify-between items-center">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">{selectedForm.title}</h2>
        <p className=" mb-6 font-semibold text-[#2F4F4F]"> Application Id : {selectedApp.applicationId}</p>
      </div> 
    
      {selectedForm.fields.map((field) => renderField(field, formData, handleInputChange))}
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
      <div className="flex items-center justify-between mt-4">
        <button type="button" onClick={onCancel} className="text-gray-700">
          Cancel
        </button>
        <button
              disabled={loading}
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              {loading ? "Updating" : "Save"}
        </button>
      </div>
    </form>
    </div>
    </div>
  );
}

