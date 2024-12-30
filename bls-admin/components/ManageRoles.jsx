"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const ManageRoles = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [tempRoles, setTempRoles] = useState({});
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      const decodedToken = getDecodedToken(token);
      if (decodedToken) {
        setCurrentUserRole(decodedToken?.role);
      }
    }

    fetchUsers();
  }, []);

  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("jwtToken");
    }
    return null;
  };

  const getDecodedToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  const fetchUsers = async () => {
    const token = getAuthToken();
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data);

      const initialRoles = response.data.reduce((acc, user) => {
        acc[user.id] = user.role;
        return acc;
      }, {});
      setTempRoles(initialRoles);
    } catch (err) {
      console.error("Error fetching users:", err);
      if (err.response && err.response.status === 401) {
        router.push("/login");
      } else {
        setError("Failed to fetch users. Please try again later.");
      }
    }
  };

  const handleRoleChangeTemp = (userId, newRole) => {
    setTempRoles({ ...tempRoles, [userId]: newRole });
  };

  const handleRoleUpdate = async (userId) => {
    setLoading(true);
    const token = getAuthToken();
    if (!token) {
      router.push("/login");
      return;
    }

    const newRole = tempRoles[userId];
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((users) =>
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      console.error(`Error updating role for user with ID ${userId}:`, err);
      if (err.response && err.response.status === 401) {
        router.push("/login");
      } else {
        setError(
          err.response?.data?.error ||
            "Failed to update user role. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="relative p-8">

{loading ? (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-[100vh]">
          <div className="fixed w-8 h-8 border-t-2 border-b-4 border-blue-600 rounded-full top-1/2 left-1/2 animate-spin"></div>
        </div>
      ) : null}
      
      <h2 className="mb-6 text-3xl font-bold text-black">Manage User Roles</h2>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-gray-600">Email</th>
              <th className="px-4 py-2 text-left text-gray-600">Role</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2 text-gray-800">{user.email}</td>
                <td className="px-4 py-2">
                  <select
                    value={tempRoles[user.id] || user.role}
                    onChange={(e) =>
                      handleRoleChangeTemp(user.id, e.target.value)
                    }
                    className="p-2 text-black border border-gray-300 rounded-md"
                    // disabled={user.role === 'superadmin' || currentUserRole !== 'superadmin'}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleRoleUpdate(user.id)}
                    className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRoles;
