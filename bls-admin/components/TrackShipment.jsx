'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';

const ShipmentStatus = ({ trackingNumber: initialTrackingNumber }) => {
    const [trackingNumber, setTrackingNumber] = useState(initialTrackingNumber || '');
    const [shipmentData, setShipmentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchShipmentStatus = async () => {
        if (!trackingNumber) {
            setError('Tracking number cannot be empty.');
            return;
        }

        setLoading(true);
        setError('');
        setShipmentData(null);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/track/shipment`,
                { trackingNumber }
            );
            console.log(response.data);
            setShipmentData(response.data);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to fetch shipment status.');
        } finally {
            setLoading(false);
        }
    };

    const formatToAST = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return moment(dateString).tz('America/Halifax').format('MMMM D, YYYY, h:mm A z');
        } catch (error) {
        console.error('Error formatting date:', error);
            return dateString;
        }
    };

    useEffect(() => {
        if (initialTrackingNumber && initialTrackingNumber.length > 0) {
            setTrackingNumber(initialTrackingNumber);
            fetchShipmentStatus();
        }
    }, [initialTrackingNumber]);

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-6 text-black">Track Shipment</h1>
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Enter Tracking Number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
                <button
                    onClick={fetchShipmentStatus}
                    className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
                >
                    Track
                </button>
            </div>
            {loading && <p className="text-blue-500">Wait Fetching shipment details...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {shipmentData && (
                <div className="text-black">
                    <h2 className="text-xl font-bold mb-4 text-blue-500">
                        Status: {shipmentData.quickTrackShipmentStatusTitle || 'N/A'}
                    </h2>
                    <p className="text-blue-800">
                        <strong>Last Known Location:</strong>{' '}
                        {shipmentData.quickTrackLastKnownCity || 'N/A'},{' '}
                        {shipmentData.quickTrackLastKnownState || 'N/A'}
                    </p>
                    <p>
                        <strong>Last Update:</strong>{' '}
                        {formatToAST(shipmentData.shipmentStatusDisplayDate) || 'N/A'}
                    </p>
                    {shipmentData.statuses && shipmentData.statuses.length > 0 && (
                        <>
                            <h3 className="text-lg font-semibold mt-6 mb-3">Status History:</h3>
                            <ol className="relative border-s border-gray-200 dark:border-gray-700">
                                {shipmentData.statuses.map((status, index) => (
                                    <li key={index} className="mb-10 ms-4">
                                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                        <time className="mb-1 text-sm font-normal leading-none text-black ">
                                            {formatToAST(status.statusDateLocal) || 'N/A'}
                                        </time>
                                        <h3 className="text-lg font-semibold text-green-600">
                                            {status.status || 'N/A'}
                                        </h3>
                                        <p className="mb-4 text-base font-normal text-black">
                                            Location: {status.location || 'N/A'}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShipmentStatus;