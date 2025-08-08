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
      setLoading(true);
      setError(null);
      // BUG: missing await here, so response is a Promise, not the data
      const response = axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data); // This will fail
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
}
