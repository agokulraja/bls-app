"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { isEditable } from "@/utils/timechecker";
import { FaExternalLinkAlt,FaSync } from 'react-icons/fa';

const PaymentDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isdropoffTrackingNoEditing, setIsdropoffTrackingNoEditing] = useState(false);
  const [dropoffTrackingNo, setdropoffTrackingNo] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const jwtToken = localStorage.getItem('jwtToken');
  const userId = localStorage.getItem('userId');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [IsdropoffTrackingNoLoading , setIsdropoffTrackingNoLoading] = useState(false);
  const [status,setStatus]=useState("Unavailable");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');


  const handleNavigation = () => {
    if (dropoffTrackingNo) {
      router.push(`/track-application?trackingNumber=${dropoffTrackingNo}`);
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
          setStatus(data.pickupDetails.dropoffShipmentStatus);
          
          console.log("status",data.pickupDetails.dropoffShipmentStatus)
          setdropoffTrackingNo(data.pickupDetails.dropoffTrackingNo || "");
          setTrackingNumber(data.pickupDetails.dropoffTrackingNo);
        
      } catch (error) {
        console.log("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, [id]);

  const handledropoffTrackingNoUpdate = async () => {
    setIsdropoffTrackingNoLoading(true)
    if(dropoffTrackingNo.trim() == ''){
      return setIsdropoffTrackingNoLoading(false)
    }
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/pdform/update-dropofftrack/${paymentDetails.pickupDetails.id}`,
        { dropoffTrackingNo },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 201) {
        setIsdropoffTrackingNoEditing(false);
        setPaymentDetails(prevState => ({
          ...prevState,
          pickupDetails: {
            ...prevState.pickupDetails,
            dropoffTrackingNo: dropoffTrackingNo
          }
        }));
        await handleSyncStatus();
      } else {
        setIsdropoffTrackingNoLoading(false)
      }
    } catch (error) {
      console.log('Error updating dropoffTrackingNo:', error);
    } finally{
      setIsdropoffTrackingNoLoading(false)
    }
  };

  const handleSyncStatus = async () => {
    if (!dropoffTrackingNo) {
      setSyncMessage('Tracking number cannot be empty.');
      console.log("dropoffTrackingNo");
      return;
    }else{
      setSyncing(true);
      setSyncMessage('');

      setTrackingNumber(dropoffTrackingNo);
        try {
            // Step 1: Fetch shipment status
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/track/shipment`,
                { trackingNumber:dropoffTrackingNo }
            );
            // console.log("response:",response, shipmentStatus);
            const shipmentStatus = response.data.status || 'N/A';
            console.log("response:",response, shipmentStatus);
            // Step 2: Update the database with the status
            console.log("d",dropoffTrackingNo);
            setStatus(shipmentStatus)
            await axios.patch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/pdform/update-status`,
                { trackingNo: dropoffTrackingNo, status: shipmentStatus , service:"drop", userId}
            );

            setSyncMessage(`Payment status successfully synced. Status: ${shipmentStatus}`);
        } catch (error) {
            console.error(error);
            setSyncMessage(
                error.response?.data?.message || 'Failed to sync payment status.'
            );
        } finally {
            setSyncing(false);
        }
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

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/payments/${id}`);
        const data = await response.json();
        
        setComments(data.pickupDetails.comments);
        setdropoffTrackingNo(data.pickupDetails.dropoffTrackingNo || "");
        setPaymentDetails(data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };
    fetchPaymentDetails();
  }, [id]);

  if (!paymentDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  const { pickupDetails } = paymentDetails;

  // Filter non-empty pickup and dropoff details
  const nonEmptyPickupDetails = Object.entries(pickupDetails).filter(
    ([key, value]) => value && key.startsWith("pickup")
  );
  const nonEmptyDropoffDetails = Object.entries(pickupDetails).filter(
    ([key, value]) => value && key.startsWith("dropoff")
  );
  const handleBack = () => {
    const category = new URLSearchParams(window.location.search).get("category") || "droponly";
    router.push(`/courier?category=${category}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <div className="relative w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        {/* Navigation Buttons */}
        <div className="flex justify-between mb-6">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Back
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            aria-controls="sidebar"
          >
            Add Label
          </button>
        </div>

        {/* Title */}
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 dark:text-white">
          Drop Only Services
        </h1>
        {/* IDs Section */}
        <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            <span className="font-bold">Pickup ID:</span> {pickupDetails.id}
          </p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            <span className="font-bold">Payment ID:</span> {paymentDetails.id}
          </p>
        </div>

        {/* Payment Summary */}
        <div
          className={`border  px-8 pt-6 mb-6 rounded-lg ${
            paymentDetails.status === "succeeded"
              ? "border-green-300 bg-green-50 dark:bg-gray-600"
              : "border-red-300 bg-red-50 dark:bg-gray-600"
          }`}
        >
          <Section title="Payment Summary">
            {/* <div className="flex"> */}
              <Detail label="Amount" value={`${paymentDetails.amount}`} />
              <div >
                  <p className={`${paymentDetails.status=="succeeded"? "bg-green-700":"bg-red-700"}  inline-block px-2 py-1 rounded-md text-white`}>
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
            
          </Section>
        </div>

      {dropoffTrackingNo &&
        <div className={`border px-8 pt-6 mb-2 rounded-lg ${pickupDetails.status=="Delivered"? "border-green-300":"border-yellow-300"}`}>
          <Section title="DropOff Details">
            <Detail label="DropOff Tracking Number" value={pickupDetails.dropoffTrackingNo}  />
            <div >
              <p className={`${pickupDetails.dropoffShipmentStatus=="Delivered"? "bg-green-700":"bg-yellow-600"} text-yellow-50  px-3 py-1 rounded-md inline-block`}>
                <span className="font-medium"> Status: {pickupDetails.dropoffShipmentStatus}</span>
              </p>
            </div>
          </Section>
        </div>
      }

        {/* Dropoff Details */}
        <div className="px-8 pt-6 mb-2 ">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-white">
              Dropoff Details
            </h2>
            {nonEmptyDropoffDetails.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {nonEmptyDropoffDetails.map(([key, value]) => (
                  <p key={key} className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">
                      {formatdropoffTrackingNo(key)}:
                    </span>{" "}
                    {value}
                  </p>
                ))}
              </div>
            ) : (
              <p className="italic text-gray-500 dark:text-gray-400">
                No dropoff details available.
              </p>
            )}
          </section>
        </div>
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
          <div className="sticky top-0  z-10 bg-white   dark:bg-gray-800 dark:text-white">
            <div className="flex items-center mt-12 justify-between px-2 pt-4">
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
            {/* Status and Sync Icon */}
            {dropoffTrackingNo && (
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
            
          {/* Dropoff Tracking Number Section */}
            <div className=" mt-4 p-2 border-b border-gray-200">
              
              <h3 className="px-2 text-lg font-semibold text-gray-800 dark:text-white">
                Dropoff Tracking Number
              </h3>
        
              
              {isdropoffTrackingNoEditing ? (
                <div className="flex items-center ">
                  <input
                    type="text"
                    value={dropoffTrackingNo}
                    onChange={(e) => setdropoffTrackingNo(e.target.value)}
                    className="flex-grow p-2 text-black border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Edit dropoffTrackingNo"
                  />
                  <button
                    onClick={handledropoffTrackingNoUpdate}
                    className="px-4 py-2  text-white bg-blue-500 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {IsdropoffTrackingNoLoading ? "Updating" : "Save"}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-2 bg-gray-100 rounded dark:bg-gray-800 dark:text-white">
                  <span className="text-gray-800 dark:text-white">
                    {pickupDetails.dropoffTrackingNo || "Enter Drop Off Tracking Number"}
                  </span>
                  <div className="flex items-center">
                  <button
                    onClick={() => setIsdropoffTrackingNoEditing(true)}
                    className="p-1 text-blue-500 hover:text-blue-600 focus:outline-none"
                    aria-label="Edit dropoffTrackingNo"
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
                  {dropoffTrackingNo &&
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

// Helper function to format dropoffTrackingNos
const formatdropoffTrackingNo = (key) => {
  return key
    .replace("pickup", "")
    .replace("dropoff", "")
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());
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

// Component to render individual details
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
