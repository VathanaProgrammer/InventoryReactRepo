import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Config/Api";
import { toast } from "react-toastify";

function POSPanel() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(false);
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  const userId = user?.id || ""; // optional chaining and fallback

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/products`);
        setProducts(res.data || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        toast.error("Failed to load products");
      }
    };
    fetchProducts();
  }, []);

  // Filter products by search term
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add product to cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item.product.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1, price: product.price }]);
    }
  };

  // Update quantity
  const updateQuantity = (productId, qty) => {
    setCart(
      cart.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  // Calculate total
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Submit sale
  const submitSale = async () => {
    if (!customerName.trim()) {
      toast.error("Customer name is required");
      return;
    }
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const salePayload = {
      userId: userId,
      customerName,
      saleItems: cart.map((item) => ({
        productId: item.product.id, // send string id directly here
        quantity: item.quantity,
        price: item.price,
      })),

      totalAmount,
    };

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/sales`, salePayload);
      console.table("Sale submitted:", salePayload);
      toast.success("Sale completed!");
      setCustomerName("");
      setCart([]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit sale");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {/* Product List */}
      <div className="col-span-2 border rounded p-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-4"
        />
        <div className="grid grid-cols-3 gap-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-3 rounded shadow hover:shadow-lg cursor-pointer"
              onClick={() => addToCart(product)}
            >
              <h3 className="font-bold">{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="col-span-1 border rounded p-4 flex flex-col">
        <input
          type="text"
          placeholder="Customer name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="border px-3 py-2 rounded mb-4"
        />

        <div className="flex-1 overflow-auto">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between items-center mb-2"
            >
              <div>
                <p className="font-bold">{item.product.name}</p>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    updateQuantity(item.product.id, Number(e.target.value))
                  }
                  className="border px-2 w-16"
                />
              </div>
              <div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  className="text-red-600 text-sm"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t pt-4">
          <h3 className="font-bold text-lg">
            Total: ${totalAmount.toFixed(2)}
          </h3>
          <button
            onClick={submitSale}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full mt-2"
          >
            {loading ? "Processing..." : "Complete Sale"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default POSPanel;
