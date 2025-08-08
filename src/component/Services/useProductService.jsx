import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Config/Api";

export function useProductService() {
  // BUG: products initialized as null — will cause errors if used before fetch completes
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchProducts = async () => {
    try {
      console.log("Starting fetchProducts...");
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_BASE_URL}/products`);
      console.log("API response:", response.data);

      setProducts(response.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
      console.log("Finished fetchProducts");
    }
  };

  useEffect(() => {
    console.log("Products:", products);
    console.log("Loading:", loading);
    console.log("Error:", error);
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
}
