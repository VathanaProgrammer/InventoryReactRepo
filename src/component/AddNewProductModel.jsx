import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Config/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNewProductModel({ product = null, onClose, onSaved }) {
  const [formData, setFormData] = useState({
    id: product?.id || "",
    name: product?.name || "",
    quantity: product?.qty || 0,
    categoryId: product?.categoryId || "",
    supplierId: product?.supplierId || "",
    price: product?.price || "",
  });

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories & suppliers once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, supRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/categories`),
          axios.get(`${API_BASE_URL}/suppliers`),
        ]);
        setCategories(catRes.data || []);
        setSuppliers(supRes.data.data || []);
      } catch (error) {
        console.error("Error fetching categories or suppliers:", error);
        toast.error("Error fetching categories or suppliers");
      }
    };
    fetchData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value;
    if (name === "quantity") val = Number(value);
    if (name === "price") val = value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  // Validate form inputs
  const validate = () => {
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return false;
    }
    if (formData.name.length < 3) {
      toast.error("Product name must be at least 3 characters");
      return false;
    }
    if (formData.quantity < 0) {
      toast.error("Quantity cannot be negative");
      return false;
    }
    if (!formData.categoryId) {
      toast.error("Please select a category");
      return false;
    }
    if (!formData.supplierId) {
      toast.error("Please select a supplier");
      return false;
    }
    if (formData.price === "" || Number(formData.price) < 0) {
      toast.error("Price must be a positive number");
      return false;
    }
    return true;
  };

  // Submit form (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      let response;
      if (product) {
        response = await axios.put(`${API_BASE_URL}/products`, formData);
      } else {
        response = await axios.post(`${API_BASE_URL}/products`, formData);
      }

      if (response.data.success) {
        toast.success(
          product
            ? "Product updated successfully!"
            : "Product added successfully!"
        );
        setTimeout(() => {
          if (onSaved) onSaved();
          if (onClose) onClose();
        }, 5000); // Short delay so toast is visible before modal closes
      }

      setFormData({
        name: "",
        quantity: 0,
        categoryId: "",
        supplierId: "",
        price: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay background */}
      <div
        onClick={() => {
          console.log("Overlay clicked - closing modal");
          onClose();
        }}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
      ></div>

      {/* Modal container */}
      <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
        <div
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative"
        >
          <header className="flex justify-between items-center mb-2">
            <h2 className="text-2xl text-gray-700 font-bold">
              {product ? "Update Product" : "Add New Product"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 font-bold"
            >
              ×
            </button>
          </header>
          <p className="text-sm text-gray-600 mb-6">
            {product
              ? "Update the product details below."
              : "Add a new product to your inventory. Fill in all the required details below."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                className="w-full text-gray-700 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                disabled={loading}
                className="w-full border text-gray-700 border-gray-300 bg-white rounded-lg px-3 py-2"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Category
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                disabled={loading}
                className="w-full border text-gray-700 border-gray-300 rounded-lg px-3 py-2"
              >
                <option disabled value="">
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Supplier */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Supplier
              </label>
              <select
                name="supplierId"
                value={formData.supplierId}
                onChange={handleChange}
                disabled={loading}
                className="w-full border text-gray-700 border-gray-300 rounded-lg px-3 py-2"
              >
                <option disabled value="">
                  Select a supplier
                </option>
                {suppliers.map((sup) => (
                  <option key={sup.id} value={sup.id}>
                    {sup.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                disabled={loading}
                className="w-full text-gray-700 border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
            >
              {loading
                ? product
                  ? "Updating..."
                  : "Saving..."
                : product
                ? "Update Product"
                : "Add Product"}
            </button>
          </form>

          <ToastContainer position="bottom-center" autoClose={3000} />
        </div>
      </div>
    </>
  );
}

export default AddNewProductModel;
