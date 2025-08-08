import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Config/Api";
import { toast } from "react-toastify";

export function useProductService() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Update a product by id and new data
  const updateProduct = async (id, updatedData) => {
    try {
      setLoading(true);
      setError(null);
      await axios.put(`${API_BASE_URL}/products/${id}`, updatedData);
      // Refresh the list after update
      await fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  // Delete a product by id
  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
      console.log("Delete response:", response);
      if (response.data.success) {
        toast.success("Product deleted successfully!",
          { position: "bottom-center", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined }
        );
      } else {
        toast.error("Failed to delete product", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }
      // Refresh the list after delete
      await fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    updateProduct,
    deleteProduct,
  };
}
