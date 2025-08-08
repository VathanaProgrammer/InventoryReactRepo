import React, { useEffect, useState } from "react";
import { useProductService } from "./Services/useProductService";
import AddNewProductModel from "./AddNewProductModel.jsx";
import { API_BASE_URL } from "../Config/Api";
import axios from "axios";
function TableInventoryAtTheFirstSection() {
  // Use your custom hook to get products from API
  const { products, loading, error, refetch, deleteProduct } =
    useProductService();

  // Local state for search and category filter (optional)
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categories, setCategories] = useState([]); // Assuming you have categories to filter
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  // Filter products based on search and category filter
  const filteredProducts = (products || []).filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().includes(searchTerm);

    const matchesCategory = categoryFilter
      ? product.categoryName.toLowerCase() === categoryFilter.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  });

  // Open modal to add product
  const openAddModal = () => {
    setEditingProduct(null); // clear edit product
    setShowAddProductModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  // Open modal to edit product
  const openEditModal = (product) => {
    setEditingProduct(product);
    setShowAddProductModal(true);
  };

  const handleProductAdded = () => {
    // e.g. refresh product list here
    setShowAddProductModal(false);
    setEditingProduct(null);
    refetch(); // Re-fetch products after adding a new one
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        console.log("Fetched categories:", response);
        setCategories(response.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []); // <--- Add empty array here

  return (
    <div className="bg-white min-h-36 w-full p-10">
      <div className="flex justify-end items-center mb-2">
        <button
          onClick={openAddModal}
          className="bg-blue-500 sm:p-2 p-1 w-[15%] text-white sm:text-sm text-xs"
        >
          + Add product
        </button>
      </div>
      {showAddProductModal && (
        <AddNewProductModel
          product={editingProduct}
          onClose={() => setShowAddProductModal(false)}
          onSaved={handleProductAdded}
        />
      )}

      <div className="max-w-full mb-6">
        <div className="flex">
          {/* Search Input */}
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-s-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Select */}
          <select
            className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Show loading, error, or the table */}
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <div className="relative overflow-x-auto h-96 shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Supplier
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, idx) => (
                  <tr
                    key={product.id}
                    className={`border-b border-gray-200 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {product.id}
                    </th>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.qty}</td>
                    <td className="px-6 py-4">{product.categoryName}</td>
                    <td className="px-6 py-4">{product.supplierName}</td>
                    <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      {product.qty <= 10 ? (
                        <span className="text-yellow-600 font-semibold">
                          Low Stock
                        </span>
                      ) : (
                        <span className="text-green-600 font-semibold">
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openEditModal(product)}
                        className="font-medium text-blue-600 hover:underline me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-4">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TableInventoryAtTheFirstSection;
