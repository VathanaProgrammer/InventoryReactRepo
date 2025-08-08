import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Config/Api";

function StockEntryForm() {
  const [formData, setFormData] = useState({
    productId: "",
    userId: "",    // You can get this from auth context or props in real apps
    quantity: 0,
    type: "in",    // "in" to add stock, "out" to remove stock
    note: "",
  });

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]); // assuming you want user select
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Fetch products (and users if needed) on mount
  useEffect(() => {
    axios.get(`${API_BASE_URL}/products`)
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]));

    axios.get(`${API_BASE_URL}/users`)
      .then(res => setUsers(res.data))
      .catch(() => setUsers([]));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await axios.post(`${API_BASE_URL}/stock_entries`, formData);
      setMessage({ type: "success", text: "Stock entry recorded successfully!" });
      setFormData({
        productId: "",
        userId: "",
        quantity: 0,
        type: "in",
        note: "",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to record stock entry",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex justify-center items-center min-h-screen p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl text-gray-700 font-bold mb-4">Add Stock Entry</h2>
        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Select */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Product</label>
            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Select product</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          {/* User Select */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">User</label>
            <select
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Select user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Type (In/Out) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Entry Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="in">Add Stock (In)</option>
              <option value="out">Remove Stock (Out)</option>
            </select>
          </div>

          {/* Note */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Note (optional)</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
          >
            {loading ? "Saving..." : "Add Stock Entry"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default StockEntryForm;
