"use client";

import React, { useState, useEffect } from "react";
import { useParams,useRouter } from "next/navigation";
import axios from 'axios';
import { isEditable } from "@/utils/timechecker";
import EmailForm from "@/components/EmailGenerator";
import { FaExternalLinkAlt,FaSync } from 'react-icons/fa';

const PaymentDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const jwtToken = localStorage.getItem('jwtToken');
  const userId = localStorage.getItem('userId');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [IspickupTrackingNoLoading , setIspickupTrackingNoLoading] = useState(false);
  const [status,setStatus]=useState("Unavailable");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [ispickupTrackingNoEditing, setIspickupTrackingNoEditing] = useState(false);
  const [pickupTrackingNo, setpickupTrackingNo] = useState("");

  
  const handleNavigation = () => {
    if (pickupTrackingNo) {
      router.push(`/track-application?trackingNumber=${pickupTrackingNo}`);
    }
  };

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/payment/payments/${id}`
        );
        const data = await response.json();
        setPaymentDetails(data);
        setComments(data.pickupDetails.comments);
        setpickupTrackingNo(data.pickupDetails.pickupTrackingNo || "");
        setStatus(data.pickupDetails.pickupShipmentStatus)
        // console.log(data.pickupDetails.service.serviceName)
       
      } catch (error) {
        console.log("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, [id]);
  

  const handlepickupTrackingNoUpdate = async () => {
    setIspickupTrackingNoLoading(true)
    if(pickupTrackingNo.trim() == ''){
      return setIspickupTrackingNoLoading(false)
    }
    try {
      // await handleSyncStatus();
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/pdform/update-pickuptrack/${paymentDetails.pickupDetails.id}`,
        { pickupTrackingNo },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 201) {
        setIspickupTrackingNoEditing(false);
        setPaymentDetails(prevState => ({
          ...prevState,
          pickupDetails: {
            ...prevState.pickupDetails,
            pickupTrackingNo: pickupTrackingNo
          }
        }));
        await handleSyncStatus();
      } else {
        setIspickupTrackingNoLoading(false)
      }
    } catch (error) {
      console.log('Error updating pickupTrackingNo:', error);
    }
    finally{
      setIspickupTrackingNoLoading(false)
    }
  };


  const handleSyncStatus = async () => {
    if (!pickupTrackingNo) {
      setSyncMessage('Tracking number cannot be empty.');
      return;
    }

  setSyncing(true);
  setSyncMessage('');
  setTrackingNumber(pickupTrackingNo);

  try {
      // Step 1: Fetch shipment status
      if(pickupTrackingNo){
        console.log(pickupTrackingNo)
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/track/shipment`,
            { trackingNumber : pickupTrackingNo}
        );
      // console.log("response:",response, shipmentStatus);
        const shipmentStatus = response.data.status || 'N/A';
        console.log("response:",response, shipmentStatus);
        // Step 2: Update the database with the status
        setStatus(shipmentStatus)
        await axios.patch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/pdform/update-status`,
            { trackingNo: pickupTrackingNo, status: shipmentStatus , service:"pick",userId}
        );

        setSyncMessage(`Payment status successfully synced. Status: ${shipmentStatus}`);
      }else{
        console.log(trackingNumber,"is empty");
      }
    } catch (error) {
        console.error(error);
        setSyncMessage(
            error.response?.data?.message || 'Failed to sync payment status.'
        );
    } finally {
        setSyncing(false);
    }
  };

  const handleAddComment = async () => {
    setIsLoading(true)
    if(newComment.trim() == ''){
      return setIsLoading(false)
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comments`,
        { userId, pickDropId: paymentDetails.pickupDetails.id, comment: newComment },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 201) {
        setComments([...comments, response.data]);
        setNewComment('');
      } else {
        console.error('Failed to add comment');
        setIsLoading(false)
      }
    } catch (error) {
      console.log('Error adding comment:', error);
    }
    finally{
      setIsLoading(false)
    }
  };

  const handleEditComment = async (commentId, updatedComment) => {
    setEditingComment(true)

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comments/${commentId}`,
        { comment: updatedComment },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedComments = comments.map(comment =>
          comment.id === commentId ? { ...comment, comment: updatedComment } : comment
        );
        setComments(updatedComments);
        setEditingCommentId(null);
      } else {
        setEditingComment(false)
        console.log('Failed to edit comment');
      }
    } catch (error) {

      console.log('Error editing comment:', error);
    }
    finally{
      setEditingComment(false)
    }
  };

  if (!paymentDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }
  const handleBack = () => {
    const category = new URLSearchParams(window.location.search).get("category") || "pickuponly";
    router.push(`/courier?category=${category}`);
  };

  const { pickupDetails } = paymentDetails;

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <div className="relative w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <div className="flex justify-between mb-6">
      <button
          onClick={handleBack}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Back
        </button>
      <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute px-4 py-2 mb-4 text-white bg-blue-500 rounded top-4 right-2 hover:bg-blue-600"
          aria-controls="sidebar"
        >
          {"Add Label"}
        </button>
        </div>
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 dark:text-white">
          Pick Only Services
        </h1>


        {/* IDs Section */}
        <div className="pl-10 grid grid-cols-1 gap-4 mb-8 md:grid-cols-2">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            <span className="font-bold">Pickup ID:</span> {pickupDetails.id}
          </p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            <span className="font-bold">Payment ID:</span> {paymentDetails.id}
          </p>
        </div>
        
        {/* Payment Summary */}
        <div
          className={`border p-8 mb-8 rounded-lg ${
            paymentDetails.status === "succeeded"
              ? "border-green-300 bg-green-50 dark:bg-gray-700"
              : "border-red-300 bg-red-50 dark:bg-gray-700"
          }`}
        >
          <Section title="Payment Summary">
              <Detail label="Amount" value={`${paymentDetails.amount}`} />
              <div className={`${paymentDetails.status=="succeeded"? "bg-green-700":"bg-red-700"}  max-w-40 px-2 py-1 rounded-md`}>
                  <p className="text-white">
                <span className="font-medium">Status: </span>{paymentDetails.status}
              </p>
            </div>
            <Detail
              label="Created At"
              value={formatDate(paymentDetails.createdAt)}
            />
            <Detail
              label="Updated At"
              value={formatDate(paymentDetails.updatedAt)}
            />
            {pickupDetails.service?.serviceName && (
              <>
                <Detail
                  label="Service Name"
                  value={pickupDetails.service.serviceName}
                />
                <Detail
                label="Service Charges"
                value="$30"
                />
              </>
            )}
            
          </Section>
        </div>

        {pickupTrackingNo &&
        <div className={`border px-8 pt-6 mb-2 rounded-lg ${status=="Delivered"? "border-green-300":"border-yellow-300"}`}>
          <Section title="Shipment Details">
            <Detail label="PickUp Tracking Number" value={pickupTrackingNo}  />
            <div >
              <p className={`${status=="Delivered"? "bg-green-700":"bg-yellow-600"} text-yellow-50  px-3 py-1 rounded-md inline-block`}>
                <span className="font-medium"> Status: {status}</span>
              </p>
            </div>
          </Section>
        </div>
      }

        {/* Pickup Details */}
        <div className="px-8  mb-2 ">
        <section className="m-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
            Pickup Details
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Name:</span> {pickupDetails.pickupName}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Passport No:</span>{" "}
              {pickupDetails.pickupPassportNo}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Contact No:</span>{" "}
              {pickupDetails.pickupContactNo}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Email:</span> {pickupDetails.pickupEmail}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">City:</span> {pickupDetails.pickupCity}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Pick Up Date:</span> {pickupDetails.pickupDate}
            </p>
          </div>
        </section>

        {/* Pickup Address */}
        <section className="m-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
            Pickup Address
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{pickupDetails.pickupAddress}</p>
          <p className="text-gray-600 dark:text-gray-300">{pickupDetails.pickupAddress1}</p>
          <p className="text-gray-600 dark:text-gray-300">
            {pickupDetails.pickupCity}, {pickupDetails.pickupProvince} -{" "}
            {pickupDetails.pickupPostalCode}
          </p>
        </section>

        {/* Additional Info */}
        <section className="m-6">
          <h2 className=" text-xl font-semibold text-gray-700 dark:text-gray-200">
            Additional Info
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Service Type:</span>{" "}
              {pickupDetails.serviceType}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Package Location:</span>{" "}
              {pickupDetails.packageLocation}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Pickup Time:</span>{" "}
              {pickupDetails.pickupTime}
            </p>
          </div>
        </section>
        </div>
        <EmailForm formData={pickupDetails} />

      </div>
       {/* Sidebar */}
       <div
          id="sidebar"
          className={`fixed inset-y-0 right-0 w-96  bg-white shadow-2xl transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } transition-all duration-300 ease-in-out overflow-hidden dark:bg-gray-800 dark:text-white`}
          aria-hidden={!isSidebarOpen}
        >
          {/* Header */}
          <div className="sticky top-0  z-10 bg-white dark:bg-gray-800 dark:text-white">
            <div className="flex items-center mt-12 justify-between p-4">
              <h2 className="text-xl ml-2 font-bold text-gray-800 dark:text-white">
              Application Status
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Close sidebar"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Status and Sync Icon */}
          {pickupTrackingNo && (
            <div className="flex items-center justify-between  px-4">
                <span
                  className={`inline-block px-2 py-2 text-sm font-semibold rounded ${
                    status === "NA"
                      ? "bg-red-100 text-red-800"
                      : status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800 "
                  }`}
                >
                  {status}
                </span>
                
                  <FaSync
                    onClick={handleSyncStatus}
                    className="ml-4 text-blue-500 hover:text-blue-600 cursor-pointer"
                    title="Sync Status"
                  />
               
              </div>
               )}
            
          {/* Pick Up Tracking Number Section */}
            <div className=" mt-4 p-2 border-b border-gray-200">
              
              <h3 className="px-2 text-lg font-semibold text-gray-800 dark:text-white">
                Pick Up Tracking Number
              </h3>
        
              
              {ispickupTrackingNoEditing ? (
                <div className="flex items-center m-2">
                  <input
                    type="text"
                    value={pickupTrackingNo}
                    onChange={(e) => setpickupTrackingNo(e.target.value)}
                    className="flex-grow p-2 text-black border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Edit pickupTrackingNo"
                  />
                  <button
                    onClick={handlepickupTrackingNoUpdate}
                    className="px-4 py-2 text-white bg-green-500 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {IspickupTrackingNoLoading ? "Updating" : "Save"}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-2 bg-gray-100 rounded dark:bg-gray-800 dark:text-white">
                  <span className="text-gray-800 dark:text-white">
                    {pickupDetails.pickupTrackingNo || "Enter Pickup Tracking Number"}
                  </span>
                  <div className="flex items-center">
                  <button
                    onClick={() => setIspickupTrackingNoEditing(true)}
                    className="p-1 text-blue-500 hover:text-blue-600 focus:outline-none"
                    aria-label="Edit pickupTrackingNo"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  {pickupTrackingNo && 
                  <FaExternalLinkAlt
                      onClick={handleNavigation}
                      className="text-blue-500 hover:text-blue-600 cursor-pointer text-lg"
                      title="Track Application"
                    />}
                </div>
                
                </div>
              )}
            </div>

          {/* Scrollable Content */}
          <div className="flex flex-col h-full">
            {/* Comments Section */}
            <div className="flex-grow custom-scrollbar pb-60 overflow-y-auto p-6 no-scrollbar">
              <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-white">
                Comments
              </h3>
              <div className="mb-4 space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 bg-gray-100 rounded-lg dark:bg-gray-900 dark:text-white"
                  >
                    {(editingCommentId === comment.id &&  isEditable(comment.createdAt))  ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={comment.comment}
                          onChange={(e) => {
                            const updatedComments = comments.map((c) =>
                              c.id === comment.id
                                ? { ...c, comment: e.target.value }
                                : c
                            );
                            setComments(updatedComments);
                          }}
                          className="flex-grow p-2 text-black border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                          aria-label="Edit comment"
                        />
                        <button
                          onClick={() =>
                            handleEditComment(comment.id, comment.comment)
                          }
                          className="px-4 py-2 text-white bg-blue-500 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          {editingComment ? "Updating" : "Save"}
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-800 dark:text-white">
                          {comment.comment}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-white">
                              {comment.commentUser?.email}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-white">
                              on {new Date(comment.createdAt).toLocaleString()}
                            </p>
                          </div>
                          {(userId == comment.userId && isEditable(comment.createdAt)) && (
                            <button
                              onClick={() => setEditingCommentId(comment.id)}
                              className="text-sm text-blue-500 hover:text-blue-600 focus:outline-none"
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 z-10 bg-white dark:bg-gray-800 dark:text-white p-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-3 mb-2 text-black border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a comment..."
                rows="3"
              />
              <button
                onClick={handleAddComment}
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default PaymentDetailsPage;


const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-white">
      {title}
    </h2>
    <div className="grid grid-cols-2 gap-4">{children}</div>
  </div>
);

const Detail = ({ label, value }) => (
  <p className="text-gray-600 dark:text-white">
    <span className="font-medium">{label}:</span> {value || "N/A"}
  </p>
);

const formatDate = (dateString) =>
  dateString
    ? new Date(dateString).toLocaleString('en-CA', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'N/A';