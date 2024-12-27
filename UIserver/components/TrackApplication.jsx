import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';

const ShipmentStatus = ({ trackingNumber: initialTrackingNumber }) => {
    const [trackingNumber, setTrackingNumber] = useState(initialTrackingNumber || '');
    const [shipmentData, setShipmentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchShipmentStatus = async (trackingNumber) => {
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
            setShipmentData(response.data);
        } catch (err) {
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
            return dateString;
        }
    };

    useEffect(() => {
        if (initialTrackingNumber) {
            setTrackingNumber(initialTrackingNumber);
            setTimeout(() => fetchShipmentStatus(initialTrackingNumber), 0);
        }
    }, [initialTrackingNumber]);

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-lg min-h-[540px] p-5">
            <h1 className="text-xl text-center font-semibold mb-4 text-gray-900 mt-5">Track Your Shipment</h1>
            <div className="flex gap-3 mb-5">
                <input
                    type="number"
                    placeholder="Enter Tracking Number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded focus:ring-1 text-black"
                />
                <button
                    onClick={() => fetchShipmentStatus(trackingNumber)}
                    disabled={loading}
                    className="bg-red-800 text-white px-6 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out"
                >
                    {loading ? 'Loading...' : 'Track'}
                </button>

            </div>
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
                <div className="flex justify-center items-center">
                    <img src="/loader.gif" alt="Loading..." className="w-90 h-90" />
                </div>
            ) : shipmentData ? (
                <div className="text-gray-900">
                    <div className='border-2 border-red-800 p-3 rounded-lg'>
                    <h2 className="text-lg font-semibold text-red-800">
                        Status: {shipmentData.quickTrackShipmentStatusTitle || 'N/A'}
                    </h2>
                    <p className="text-gray-800">
                        <strong>Last Known Location:</strong> {shipmentData.quickTrackLastKnownCity || 'N/A'}, {shipmentData.quickTrackLastKnownState || 'N/A'}
                    </p>
                    <p>
                        <strong>Last Update:</strong> {shipmentData.shipmentStatusDisplayDate|| 'N/A'}
                    </p>
                    </div>
                    {shipmentData.statuses && shipmentData.statuses.length > 0 && (
                        <>
                            <h3 className="text-lg font-semibold mt-4">Shipment History:</h3>
                            <ol className="relative border-l border-gray-200">
                                {shipmentData.statuses.map((status, index) => (
                                    <li key={index} className="mb-5 pl-4">
                                        <div className="absolute w-3 h-3 bg-red-800 rounded-full -left-1.5 border border-white"></div>
                                        <time className="mb-1 text-sm font-normal leading-none">
                                            {formatToAST(status.statusDateLocal) || 'N/A'}
                                        </time>
                                        <h3 className="text-sm font-semibold text-red-600">
                                            {status.status || 'N/A'}
                                        </h3>
                                        <p className="text-sm font-semibold">
                                            Location: {status.location || 'N/A'}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default ShipmentStatus;
