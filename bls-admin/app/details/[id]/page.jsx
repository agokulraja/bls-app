"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { isEditable } from "@/utils/timechecker";
import EmailForm from "@/components/EmailGenerator";
import { FaExternalLinkAlt, FaSync } from "react-icons/fa";


const PaymentDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [IspickupTrackingNoLoading , setIspickupTrackingNoLoading] = useState(false);
  const [IsdropoffTrackingNoLoading , setIsdropoffTrackingNoLoading] = useState(false);
  const jwtToken = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  // State for pickup tracking number editing
  const [ispickupTrackingNoEditing, setIspickupTrackingNoEditing] = useState(false);
  const [pickupTrackingNo, setPickupTrackingNo] = useState("");
  const [pickupstatus,setPickupStatus] =useState("UN");
  const [dropoffstatus,setDropoffStatus] =useState("UN");
  // State for dropoff tracking number editing
  const [isdropoffTrackingNoEditing, setIsdropoffTrackingNoEditing] = useState(false);
  const [dropoffTrackingNo, setDropoffTrackingNo] = useState("");
  const handleNavigation = () => {
    if (dropoffTrackingNo) {
      router.push(`/track-application?trackingNumber=${dropoffTrackingNo}`);
    }
    if (pickupTrackingNo){
      router.push(`/track-application?trackingNumber=${pickupTrackingNo}`)
    }
  };
  // useEffect(() => {
  //   const fetchPaymentDetails = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_BASE_URL}/payment/payments/${id}`
  //       );
  //       const data = await response.json();
  //       setPaymentDetails(data);
  //       setComments(data.pickupDetails.comments);
  //       setPickupStatus(data.pickupDetails.pickupShipmentStatus);
  //       setDropoffStatus(data.pickupDetails.dropoffShipmentStatus);
  //     } catch (error) {
  //       console.error("Error fetching payment details:", error);
  //     }
  //   };
  //   fetchPaymentDetails();
  // }, [id]);
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/payment/payments/${id}`
        );
        const data = await response.json();
        setPaymentDetails(data);
        setComments(data.pickupDetails.comments);
        setPickupStatus(data.pickupDetails.pickupShipmentStatus);
        setDropoffStatus(data.pickupDetails.dropoffShipmentStatus);
        setPickupTrackingNo(data.pickupDetails.pickupTrackingNo || "");
        setDropoffTrackingNo(data.pickupDetails.dropoffTrackingNo || "");
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };
  
    fetchPaymentDetails();
  }, [id]);

  const handlePickupSyncStatus = async () => {
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
          const response = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/track/shipment`,
              { trackingNumber }
          );
          const shipmentStatus = response.data.status || 'N/A';
          console.log("response:",response, shipmentStatus);
          // Step 2: Update the database with the status
          setPickupStatus(shipmentStatus)
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


  const handleDropoffSyncStatus = async () => {
    if (!dropoffTrackingNo) {
      setSyncMessage('Tracking number cannot be empty.');
      return;
    }
    setSyncing(true);
    setSyncMessage('');
    setTrackingNumber(dropoffTrackingNo);
    try {
      // Step 1: Fetch shipment status
        if(dropoffTrackingNo){
          const response = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/track/shipment`,
              { trackingNumber :dropoffTrackingNo }
          );
      // console.log("response:",response, shipmentStatus);
          const shipmentStatus = response.data.status || 'N/A';
          console.log("response:",response, shipmentStatus);
          // Step 2: Update the database with the status
          setDropoffStatus(shipmentStatus)
          await axios.patch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/pdform/update-status`,
              { trackingNo: dropoffTrackingNo, status: shipmentStatus , service:"drop",userId}
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

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/payment/payments/${id}`
        );
        const data = await response.json();
        setPaymentDetails(data);
        setComments(data.pickupDetails.comments);
      } catch (error) {
        console.log("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, [id]);

  
  const handleAddComment = async () => {
    setIsLoading(true);
    if (newComment.trim() == "") {
      return setIsLoading(false);
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comments`,
        {
          userId,
          pickDropId: paymentDetails.pickupDetails.id,
          comment: newComment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 201) {
        setComments([...comments, response.data]);
        setNewComment("");
      } else {
        console.error("Failed to add comment");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error adding comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditComment = async (commentId, updatedComment) => {
    setEditingComment(true);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comments/${commentId}`,
        { comment: updatedComment },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedComments = comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, comment: updatedComment }
            : comment
        );
        setComments(updatedComments);
        setEditingCommentId(null);
      } else {
        setEditingComment(false);
        console.log("Failed to edit comment");
      }
    } catch (error) {
      console.log("Error editing comment:", error);
    } finally {
      setEditingComment(false);
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
        setPickupTrackingNo(data.pickupDetails.pickupTrackingNo || "");
        setDropoffTrackingNo(data.pickupDetails.dropoffTrackingNo || "");
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };
    fetchPaymentDetails();
  }, [id]);


  const handlePickupTrackingNoUpdate = async () => {
    setIspickupTrackingNoLoading(true)
    if(pickupTrackingNo.trim() == ''){
      return setIspickupTrackingNoLoading(false)
    }
    try {
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
        setPaymentDetails((prevState) => ({
          ...prevState,
          pickupDetails: {
            ...prevState.pickupDetails,
            pickupTrackingNo: pickupTrackingNo,
          },
        }));
        await handlePickupSyncStatus();
      } else {
        setIspickupTrackingNoLoading(false)
      }
    } catch ( error) {
      console.error('Error updating pickupTrackingNo:', error);
    }
    finally{
      setIspickupTrackingNoLoading(false)
    }
  };

  const handleDropoffTrackingNoUpdate = async () => {
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
        setPaymentDetails((prevState) => ({
          ...prevState,
          pickupDetails: {
            ...prevState.pickupDetails,
            dropoffTrackingNo: dropoffTrackingNo
          }
        }));
        await handleDropoffSyncStatus();
      } else {
        setIsdropoffTrackingNoLoading(false)
      }
    } catch (error) {
      console.error('Error updating dropoffTrackingNo:', error);
    } finally{
      setIsdropoffTrackingNoLoading(false)
    }
  };

  

  if (!paymentDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg font-semibold text-gray-700 dark:text-white">
          Loading...
        </p>
      </div>
    );
  }
  const handleBack = () => {
    const category =
      new URLSearchParams(window.location.search).get("category") ||
      "pickanddrop";
    router.push(`/courier?category=${category}`);
  };


  

  const { pickupDetails } = paymentDetails;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="relative w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <button
          onClick={handleBack}
          className="px-4 py-2 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {"<- Back"}
        </button>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute px-4 py-2 mb-4 text-white bg-blue-500 rounded top-4 right-2 hover:bg-blue-600"
          aria-controls="sidebar"
        >
          {"Add Label"}
        </button>
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-white">
          Pick and Drop Payment Details
        </h1>

        {/* IDs Section */}
        <div className="grid grid-cols-2 gap-4 mb-6 ml-12">
          <Detail label="Pickup ID" value={pickupDetails.id} />
          <Detail label="Payment ID" value={paymentDetails.id} />
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
            {pickupDetails.service?.serviceName && (
              <Detail
                label="Service Name"
                value={pickupDetails.service.serviceName}
              />
            )}
          </Section>
        </div>
        


        {(pickupTrackingNo || dropoffTrackingNo) &&
        <div className={`border  px-10 pt-6 mb-6 rounded-lg ${(pickupstatus=="Delivered" && dropoffstatus=="Delivered")? "border-green-300":"border-yellow-300"}`}>
          {pickupstatus && (
          <Section title="PickUp Details">
            <Detail label="PickUp Tracking Number" value={pickupTrackingNo}  />
            <div >
              <p className={`${pickupstatus=="Delivered"? "bg-green-700":"bg-yellow-600"} text-yellow-50  px-3 py-1 rounded-md inline-block`}>
                <span className="font-medium"> Shipment Status: {pickupstatus}</span>
              </p>
             
          
            </div>
          </Section>
          )}
        
        {dropoffstatus && (
        <Section title="Drop-off Details">
        <Detail label="Drop-off Tracking Number" value={dropoffTrackingNo} />
          <div>
            <p
              className={`${
                dropoffstatus === "Delivered" ? "bg-green-700" : "bg-yellow-600"
              } text-yellow-50 px-3 py-1 rounded-md inline-block`}
            >
              <span className="font-medium">
                Shipment Status: {dropoffstatus}
              </span>
            </p>
          </div>
          </Section>
        )}
     
        </div>
      }
      <div className="pl-8">

        {/* Pickup Details */}
        <Section title="Pickup Details">
          <Detail label="Name" value={pickupDetails.pickupName} />
          <Detail label="Passport No" value={pickupDetails.pickupPassportNo} />
          <Detail label="Contact No" value={pickupDetails.pickupContactNo} />
          <Detail label="Email" value={pickupDetails.pickupEmail} />
          <Detail
            label="Address"
            value={`${pickupDetails.pickupAddress}, ${pickupDetails.pickupAddress1}`}
          />
          <Detail label="City" value={pickupDetails.pickupCity} />
          <Detail label="Postal Code" value={pickupDetails.pickupPostalCode} />
          <Detail label="Province" value={pickupDetails.pickupProvince} />
          <Detail label="Pick Up Date" value={pickupDetails.pickupDate} />
          <Detail label="Time" value={pickupDetails.pickupTime} />
          <Detail
            label="Package Location"
            value={pickupDetails.packageLocation}
          />
        </Section>

        {/* Dropoff Details */}
        <Section title="Dropoff Details">
          <Detail label="Name" value={pickupDetails.dropoffName} />
          <Detail label="Passport No" value={pickupDetails.dropoffPassportNo} />
          <Detail label="Contact No" value={pickupDetails.dropoffContactNo} />
          <Detail label="Email" value={pickupDetails.dropoffEmail} />
          <Detail
            label="Address"
            value={`${pickupDetails.dropoffAddress}, ${pickupDetails.dropoffAddress1}`}
          />
          <Detail label="City" value={pickupDetails.dropoffCity} />
          <Detail label="Postal Code" value={pickupDetails.dropoffPostalCode} />
          <Detail label="Province" value={pickupDetails.dropoffProvince} />
        </Section>
        </div>
        <EmailForm formData={pickupDetails} />
        <div
          id="sidebar"
          className={`fixed inset-y-0 right-0 w-96  bg-white shadow-2xl transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } transition-all duration-300 ease-in-out overflow-hidden dark:bg-gray-800 dark:text-white`}
          aria-hidden={!isSidebarOpen}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 dark:bg-gray-800 dark:text-white">
            <div className="flex items-center justify-between p-4 mt-12">
              <h2 className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
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
            <div className="px-6 pb-2 ">
              
            
          </div>

        
          {/* Pickup Tracking Number Editing */}
        <div className="px-4 ">
          <div className="flex justify-between ">
            <h3 className="font-semibold text-gray-800 text-md dark:text-yellow-50">Pickup TN. :
            </h3>
            {pickupTrackingNo && (
            <div className="flex items-center justify-between ">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                      pickupstatus === "NA"
                      ? "bg-red-100 text-red-800"
                      : pickupstatus === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800 "
                  }`}
                  >
                    {pickupstatus}
                  </span>
                  
                    <FaSync
                      onClick={handlePickupSyncStatus}
                      className="ml-2 mr-1 text-sm text-blue-500 cursor-pointer hover:text-blue-600"
                      title="Sync Status"
                    />
                 
             </div> )}
          </div>
          
          {ispickupTrackingNoEditing ? (
            <div className="flex items-center mt-2">
              <input
                type="text"
                value={pickupTrackingNo}
                onChange={(e) => setPickupTrackingNo(e.target.value)}
                className="flex-grow px-2 py-2 text-black border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Edit pickupTrackingNo"
              />
              <button
                onClick={handlePickupTrackingNoUpdate}
                className="px-4 py-2 text-white bg-green-500 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                 {IspickupTrackingNoLoading ? "Updating" : "Save"}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-2 my-2 bg-gray-100 rounded dark:bg-gray-800 dark:text-white">
              <span className="text-gray-800 dark:text-white">{pickupTrackingNo || "Enter Pick Up Tracking No"}</span>
              <div className="flex items-center">
              <button
                onClick={() => setIspickupTrackingNoEditing(true)}
                className="p-1 text-blue-500 hover:text-blue-600 focus:outline-none"
                aria-label="Edit dropoffTrackingNo"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              {pickupTrackingNo && 
              <FaExternalLinkAlt
                      onClick={handleNavigation}
                      className="text-sm text-blue-500 cursor-pointer hover:text-blue-600"
                      title="Track Application"
                    />
                  }
             </div>
            </div>
          )}
        </div>

        {/* Dropoff Tracking Number Editing */}
        <div className="px-4 mt-2 ">
          <div className="flex justify-between ">
            <h3 className="font-semibold text-gray-800 text-md dark:text-yellow-50">Dropoff TN. :</h3>
            {dropoffTrackingNo && (
            <div className="flex items-center justify-between ">
              <span
                className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                dropoffstatus === "NA"
                      ? "bg-red-100 text-red-800"
                      : dropoffstatus === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800 "
                  }`}
              >
                {dropoffstatus}
              </span>
              
                <FaSync
                  onClick={handleDropoffSyncStatus}
                  className="ml-2 mr-1 text-sm text-blue-500 cursor-pointer hover:text-blue-600"
                  title="Sync Status"
                />
                 </div>
              )}
           
          </div>


          {isdropoffTrackingNoEditing ? (
            <div className="flex items-center my-2">
              <input
                type="text"
                value={dropoffTrackingNo}
                onChange={(e) => setDropoffTrackingNo(e.target.value)}
                className="flex-grow p-2 text-black border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Edit dropoffTrackingNo"
              />
              <button
                onClick={handleDropoffTrackingNoUpdate}
                className="px-4 py-2 text-white bg-green-500 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {IsdropoffTrackingNoLoading ? "Updating" : "Save"}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-2 my-2 bg-gray-100 rounded dark:bg-gray-800 dark:text-white">
              <span className="text-gray-800 dark:text-white">{dropoffTrackingNo || "Enter Dropoff Tracking No."}</span>
              <div className="flex items-center">
              <button
                onClick={() => setIsdropoffTrackingNoEditing(true)}
                className="p-1 text-blue-500 hover:text-blue-600 focus:outline-none"
                aria-label="Edit dropoffTrackingNo"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              {dropoffTrackingNo &&
              <FaExternalLinkAlt
                      onClick={handleNavigation}
                      className="text-sm text-blue-500 cursor-pointer hover:text-blue-600 "
                      title="Track Application"
                    />}
             </div>
              
            </div>
          )}
        </div>
        </div>


          {/* Scrollable Content */}
          <div className="flex flex-col h-full">
            {/* Comments Section */}
            <div className="flex-grow p-6 pb-40 overflow-y-auto custom-scrollbar no-scrollbar">
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
            <div className="sticky bottom-0 z-10 p-4 bg-white dark:bg-gray-800 dark:text-white">
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
    </div>
  );
};

// Component to render a section
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

// Helper function to format dates
const formatDate = (dateString) =>
  dateString
    ? new Date(dateString).toLocaleString('en-CA', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'N/A';

export default PaymentDetailsPage;
