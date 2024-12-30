"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Permissions = () => {
  const token = localStorage.getItem("jwtToken");
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState([]);
  const [formData, setFormData] = useState({ userId: "", pageId: "", access: true });
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/page-permissions/permissions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPermissions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch permissions", error);
      setLoading(false);
    }
  };

  const fetchUsersAndPages = async () => {
    try {
      setLoading(true);
      const [usersResponse, pagesResponse] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/users`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/verify/pages`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setUsers(usersResponse.data);
      setPages(pagesResponse.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/page-permissions/permissions`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPermissions();
      setFormData({ userId: "", pageId: "", access: true });
    } catch (error) {
      console.error("Failed to create permission", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this permission?")) return;
    try {
      setLoading(true);
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/page-permissions/permissions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPermissions();
    } catch (error) {
      console.error("Failed to delete permission", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/page-permissions/permissions/${editData.id}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPermissions();
      setEditData(null); // Close modal after editing
    } catch (error) {
      console.error("Failed to update permission", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
    fetchUsersAndPages();
  }, []);

  return (
    <div className="container py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">Permissions Management</h1>

      <div className="max-w-screen-sm p-6 mb-8 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700">User:</label>
            <select
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.email}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Page:</label>
            <select
              value={formData.pageId}
              onChange={(e) => setFormData({ ...formData, pageId: e.target.value })}
              className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Page</option>
              {pages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.pageName} and Access:{page.commonAccess}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Access:</label>
            <input
              type="checkbox"
              checked={formData.access}
              onChange={(e) => setFormData({ ...formData, access: e.target.checked })}
              className="w-5 h-5 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add Permission
          </button>
        </form>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full text-center border-collapse table-auto">
          <thead>
            <tr className="text-gray-800 bg-blue-100">
              <th className="p-4 border-b">ID</th>
              <th className="p-4 border-b">User</th>
              <th className="p-4 border-b">Page</th>
              <th className="p-4 border-b">Access</th>
              <th className="p-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-6 text-gray-500">Loading...</td>
              </tr>
            ) : permissions && permissions.length > 0 ? (
              permissions.map((permission) => (
                <tr key={permission.id} className="text-gray-700 transition hover:bg-gray-100">
                  <td className="p-4 border-b">{permission.id}</td>
                  <td className="p-4 text-black border-b">{permission.adminUser.email}</td>
                  <td className="p-4 border-b">{permission.Page.pageName}</td>
                  <td className="p-4 border-b">
                    {permission.access ? "Granted" : "Denied"}
                  </td>
                  <td className="p-4 border-b">
                    <button
                      onClick={() => setEditData(permission)}
                      className="px-4 py-1 mr-2 text-white transition duration-200 bg-yellow-500 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(permission.id)}
                      className="px-4 py-1 text-white transition duration-200 bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-gray-500">No permissions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-md w-96">
            <h3 className="mb-4 text-2xl font-semibold text-gray-800">Edit Permission</h3>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-700">User:</label>
                <input
                  type="text"
                  disabled
                  value={editData.adminUser.email}
                  className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Page:</label>
                <input
                  type="text"
                  disabled
                  value={editData.Page.pageName}
                  className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Access:</label>
                <input
                  type="checkbox"
                  checked={editData.access}
                  onChange={(e) => setEditData({ ...editData, access: e.target.checked })}
                  className="w-5 h-5 text-black border rounded-md"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Permissions;
