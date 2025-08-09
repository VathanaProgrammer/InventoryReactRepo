import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Config/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNewCategoryModel({ category = null, onClose, onSaved }) {
  // If category prop is passed, initialize formData for edit mode
  const [formData, setFormData] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(false);

  // When `category` prop changes (e.g. open modal with existing category), update form
  useEffect(() => {
    if (category) {
      setFormData({ name: category.name, id: category.id });
    } else {
      setFormData({ name: "" });
    }
  }, [category]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form data
  const validate = () => {
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return false;
    }
    if (formData.name.length < 3) {
      toast.error("Category name must be at least 3 characters");
      return false;
    }
    return true;
  };

  // Handle form submit (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      let response;
      if (category) {
        // Edit mode: PUT request to update category by ID
        response = await axios.put(
          `${API_BASE_URL}/categories`,
          formData
        );
      } else {
        // Add mode: POST request to create new category
        response = await axios.post(`${API_BASE_URL}/categories`, formData);
      }

      if (response.data.success) {
        toast.success(
          category ? "Category updated successfully!" : "Category added successfully!"
        );

        setTimeout(() => {
          onClose(); // Close modal after success
            onSaved(); // Call the onSaved callback to refresh data
        }, 5000);

        // Clear form only if adding new category
        if (!category) setFormData({ name: "" });
      } else {
        toast.error("Failed to save category");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to save category"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl text-gray-700 font-bold mb-2">
          {category ? "Edit Category" : "Add New Category"}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          {category
            ? "Edit the category details below."
            : "Add a new category to your inventory. Fill in all the required information below."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              disabled={loading}
              autoFocus
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Saving..." : category ? "Save Changes" : "Add Category"}
            </button>
          </div>
        </form>

        {/* Toast container renders the toasts */}
        <ToastContainer position="bottom-center" autoClose={3000} />
      </div>
    </div>
  );
}

export default AddNewCategoryModel;
