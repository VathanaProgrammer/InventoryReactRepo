import React, { useState } from "react";
import { useProductService } from "./Services/useProductService";

function TableInventoryAtTheFirstSection() {
  // Use your custom hook to get products from API
  const { products, loading, error } = useProductService();

  // Local state for search and category filter (optional)
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Filter products based on search and category filter
 const filteredProducts = (products || []).filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().includes(searchTerm);

    const matchesCategory = categoryFilter
      ? product.category.toLowerCase() === categoryFilter.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white w-full p-10">
      {/* Search & Category Select */}
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
            <option value="Electronics">Electronics</option>
            <option value="Apparel">Apparel</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Beauty">Beauty</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
      </div>

      {/* Show loading, error, or the table */}
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.supplier}</td>
                    <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">{product.status}</td>
                    <td className="px-6 py-4">
                      <button className="font-medium text-blue-600 hover:underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center text-gray-500 py-4"
                  >
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
