import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Config/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNewSupplierModel({ supplier, onClose, onSaved }) {
  const [formData, setFormData] = useState({
    id: supplier?.id || "",
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (supplier) {
      setFormData({
        id: supplier.id || "",
        name: supplier.name || "",
        contactPerson: supplier.contactPerson || "",
        phone: supplier.phone || "",
        email: supplier.email || "",
        address: supplier.address || "",
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    if (!formData.name.trim()) {
      toast.error("Supplier name is required");
      return false;
    }
    if (formData.email && !emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (supplier) {
        // Edit
        await axios.put(`${API_BASE_URL}/suppliers`, formData);
        toast.success("Supplier updated successfully!");
      } else {
        // Add new
        await axios.post(`${API_BASE_URL}/suppliers`, formData);
        toast.success("Supplier added successfully!");
      }

      setTimeout(() => {
        onClose(); // Close modal after success
        onSaved(); // Call the onSaved callback to refresh data
      }, 5000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save supplier");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mb-4">
            {supplier ? "Edit Supplier" : "Add New Supplier"}
          </h2>
          <button onClick={onClose} className="text-gray-700">X</button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Supplier Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Contact Person</label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows="3"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {loading
                ? "Saving..."
                : supplier
                ? "Update Supplier"
                : "Add Supplier"}
            </button>
          </div>
        </form>

        <ToastContainer position="bottom-center" autoClose={3000} />
      </div>
    </div>
  );
}

export default AddNewSupplierModel;
