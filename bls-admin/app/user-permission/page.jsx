"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import usePagePermission from "@/components/usePagePermission";

function UserManagement() {
  const token = localStorage.getItem("jwtToken");
  const [users, setUsers] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const pageId = 14;
  const { hasAccess, isLoading, userId } = usePagePermission(pageId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-4 text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md p-6 text-center bg-white rounded-lg shadow-lg">
          <div className="flex justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01m-6.938 4h13.856c1.054 0 1.934-.816 1.994-1.851L21 17.1V6.9a2 2 0 00-1.851-1.994L19 5H5a2 2 0 00-1.994 1.851L3 6.9v10.2c0 1.054.816 1.934 1.851 1.994L5 19z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Access Denied</h1>
          <p className="mt-2 text-gray-600">
            You do not have permission to view this page. Please contact the
            administrator for assistance.
          </p>
        </div>
      </div>
    );
  }

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/page-permissions/users/date`,
        {
          params: { fromDate, toDate },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/user/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` },}
      );
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleDateFilter = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-6xl mx-auto mt-10">
        <div className="px-8 py-6 bg-white rounded-lg shadow-lg">
          <h1 className="mb-8 text-2xl font-bold text-center text-indigo-800">
            User Management Dashboard
          </h1>
          <form
            onSubmit={handleDateFilter}
            className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-3"
          >
            <div>
              <label
                htmlFor="fromDate"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                From Date
              </label>
              <input
                id="fromDate"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-4 py-2 text-black border rounded-md focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label
                htmlFor="toDate"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                To Date
              </label>
              <input
                id="toDate"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-4 py-2 text-black border rounded-md focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md shadow-lg hover:bg-indigo-700"
              >
                Apply Filters
              </button>
            </div>
          </form>

          {/* User Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-black border border-collapse border-gray-200 table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">UserId</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Created At</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="text-center">
                    <td className="px-4 py-2 border">{user.id}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                          user.status === true
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status === true ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-2 border">
                      <select
                        value={user.status === true ? "active" : "inactive"}
                        onChange={(e) =>
                          handleStatusChange(
                            user.id,
                            e.target.value === "active"
                          )
                        }
                        className="block px-3 py-2 border rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-indigo-400 focus:border-indigo-400"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
