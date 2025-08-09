import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Config/Api";
import { toast } from "react-toastify";

function AddStock({ product = null, onClose, onSaved }) {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  const userId = user?.id || ""; // optional chaining and fallback

  const [formData, setFormData] = useState({
    userId: userId, // You can get this from auth context or props in real apps
    productId: product?.id || "",
    quantity: 0, // amount to add, not current qty
    type: "in", // always "in" to add stock here
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (formData.quantity <= 0) {
      setMessage({
        type: "error",
        text: "Please enter a positive quantity to add.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/stock_entries`,
        formData
      );
      if (response.data.success) {
        toast.success("Stock entry recorded successfully!", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setTimeout(() => {
          onClose(); // Close modal after success
          onSaved(); // Call the onSaved callback to refresh data
        }, 5000);
      } else {
        setMessage({ type: "error", text: "Failed to record stock entry." });
      }
        setFormData({
            userId: userId,
            productId: product?.id || "",
            quantity: 0,
            type: "in",
            note: "",
        });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to record stock entry.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()} // prevent closing modal when clicking inside
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Add Stock to Product</h2>

        {product && (
          <div className="mb-4">
            <p>
              <strong>Product:</strong> {product.name}
            </p>
            <p>
              <strong>Current Quantity:</strong> {product.qty}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="quantity"
              className="block font-medium text-gray-700 mb-1"
            >
              Quantity to Add
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              disabled={loading}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter quantity"
              required
            />
          </div>

          <div>
            <label
              htmlFor="note"
              className="block font-medium text-gray-700 mb-1"
            >
              Note (optional)
            </label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Add a note for this stock addition"
            />
          </div>

          {message && (
            <p
              className={`${
                message.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message.text}
            </p>
          )}

          <div className="flex justify-end space-x-2">
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
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading ? "Adding..." : "Add Stock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStock;
