"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Pages = () => {
  const token = localStorage.getItem("jwtToken");
  const [pages, setPages] = useState([]);
  const [formData, setFormData] = useState({ pageName: "", commonAccess: [] });
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({ delete: false, update: false });

  // Fetch pages
  const fetchPages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/verify/pages`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPages(response.data);
    } catch (error) {
      console.error("Failed to fetch pages", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission to create a page
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const accessString = formData.commonAccess.join(", ");

      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/verify/pages`,
        { ...formData, commonAccess: accessString },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchPages();  
      setFormData({ pageName: "", commonAccess: [] });  
      window.alert("Page created successfully!");
    } catch (error) {
      console.error("Failed to create page", error);
      window.alert("Error creating page. Please try again.");
    }finally{
      fetchPages();
      setLoading(false)
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      try {
        setActionLoading((prev) => ({ ...prev, delete: true }));
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/verify/pages/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchPages();
        window.alert("Page deleted successfully!");
      } catch (error) {
        console.error("Failed to delete page", error);
        window.alert("Error deleting page. Please try again.");
      } finally {
        setActionLoading((prev) => ({ ...prev, delete: false }));
      }
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const accessString = editData.commonAccess.join(", ");
      setActionLoading((prev) => ({ ...prev, update: true }));

      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/verify/pages/${editData.id}`,
        { ...editData, commonAccess: accessString },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchPages();  
      setEditData(null); 
      window.alert("Page updated successfully!");
    } catch (error) {
      console.error("Failed to update page", error);
      window.alert("Error updating page. Please try again.");
    } finally {
      setActionLoading((prev) => ({ ...prev, update: false }));
    }
  };

  const handleAccessChange = (role, isChecked, dataType) => {
    const updateData = dataType === "formData" ? formData : editData;
    
    let updatedAccess = [...updateData.commonAccess];

    if (isChecked) {
      updatedAccess = [...updatedAccess, role];
    } else {
      updatedAccess = updatedAccess.filter((roleItem) => roleItem !== role);
    }

    if (dataType === "formData") {
      setFormData({ ...formData, commonAccess: updatedAccess });
    } else {
      setEditData({ ...editData, commonAccess: updatedAccess });
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const openEditModal = (page) => {
    const commonAccessArray = page.commonAccess.split(", ").map(role => role.trim());
    setEditData({ ...page, commonAccess: commonAccessArray });
  };

  return (
    <div className="container py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">Page Management</h1>

      <div className="max-w-screen-sm p-6 mb-8 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Page Name:</label>
            <input
              type="text"
              value={formData.pageName}
              onChange={(e) => setFormData({ ...formData, pageName: e.target.value })}
              className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-gray-700">Select Access:</label>
            <div>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  value="superadmin"
                  checked={formData.commonAccess.includes("superadmin")}
                  onChange={(e) => handleAccessChange("superadmin", e.target.checked, "formData")}
                />
                <span className="ml-2 text-black">Super Admin</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  value="admin"
                  checked={formData.commonAccess.includes("admin")}
                  onChange={(e) => handleAccessChange("admin", e.target.checked, "formData")}
                />
                <span className="ml-2 text-black">Admin</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="user"
                  checked={formData.commonAccess.includes("user")}
                  onChange={(e) => handleAccessChange("user", e.target.checked, "formData")}
                />
                <span className="ml-2 text-black">User</span>
              </label>
            </div>
          </div>

          <button
            disable={loading}
            type="submit"
            className="w-full px-4 py-2 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add Page
          </button>
        </form>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="text-center text-gray-800 bg-blue-100">
              <th className="p-4 border-b">ID</th>
              <th className="p-4 border-b">Page Name</th>
              <th className="p-4 border-b">Common Access</th>
              <th className="p-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading || actionLoading.update || actionLoading.delete ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">Loading...</td>
              </tr>
            ) : pages.length > 0 ? (
              pages.map((page,index) => (
                <tr key={index} className="text-center text-gray-700 transition hover:bg-gray-100">
                  <td className="p-4 text-black border-b">{page.id}</td>
                  <td className="p-4 text-black border-b">{page.pageName}</td>
                  <td className="p-4 text-black border-b">{page.commonAccess}</td>
                  <td className="p-4 border-b">
                    <button
                      onClick={() => openEditModal(page)}
                      className="px-4 py-1 mr-2 text-white transition duration-200 bg-yellow-500 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(page.id)}
                      className="px-4 py-1 text-white transition duration-200 bg-red-500 rounded-md hover:bg-red-600"
                      disabled={actionLoading.delete}
                    >
                      {actionLoading.delete ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">No pages available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-8 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-center text-black">Edit Page</h2>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block mb-2 font-medium text-gray-700">Page Name:</label>
                <input
                  type="text"
                  value={editData.pageName}
                  onChange={(e) => setEditData({ ...editData, pageName: e.target.value })}
                  className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block font-medium text-gray-700">Select Access:</label>
                <div>
                  <label className="inline-flex items-center mr-4 text-black">
                    <input
                      type="checkbox"
                      value="superadmin"
                      checked={editData.commonAccess.includes("superadmin")}
                      className="text-black "
                      onChange={(e) => handleAccessChange("superadmin", e.target.checked, "editData")}
                    />
                    <span className="ml-2">Super Admin</span>
                  </label>
                  <label className="inline-flex items-center mr-4 text-black">
                    <input
                      type="checkbox"
                      className="text-black "
                      value="admin"
                      checked={editData.commonAccess.includes("admin")}
                      onChange={(e) => handleAccessChange("admin", e.target.checked, "editData")}
                    />
                    <span className="ml-2">Admin</span>
                  </label>
                  <label className="inline-flex items-center text-black">
                    <input
                      type="checkbox"
                      className="text-black "
                      value="user"
                      checked={editData.commonAccess.includes("user")}
                      onChange={(e) => handleAccessChange("user", e.target.checked, "editData")}
                    />
                    <span className="ml-2">User</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
                disabled={actionLoading.update}
              >
                {actionLoading.update ? "Updating..." : "Update Page"}
              </button>
              <button
                onClick={() => setEditData(null)}
                type="button"
                className="w-full px-4 py-2 mt-4 text-white transition duration-200 bg-gray-500 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pages;

