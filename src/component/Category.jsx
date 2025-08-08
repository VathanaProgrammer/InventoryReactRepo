import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Config/Api";
import AddNewCategoryModel from "./AddNewCategoryModel";
import { toast } from "react-toastify";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New states to handle modal and selected category for editing
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Move fetchCategories here so we can reuse
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      setCategories(response.data || []);
      setFilteredCategories(response.data || []);
    } catch (err) {
      setError("Failed to fetch categories.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCategories(categories);
    } else {
      setFilteredCategories(
        categories.filter((cat) =>
          cat.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, categories]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Open modal to add new category
  const handleAddNewCategory = () => {
    setSelectedCategory(null); // null means "add" mode
    setShowModal(true);
  };

  // Example edit handler - open modal with category data
  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
        try {
            const response = await axios.delete(`${API_BASE_URL}/categories/${categoryId}`);
            if (response.data.success) {
                toast.success("Category deleted successfully!");
                fetchCategories(); // Refresh categories after delete
            } else {
                toast.error("Failed to delete category");
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error("Failed to delete category");
        }
    }
  }
  if (loading) return <p>Loading categories...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      {/* Header with search and add button */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-3 py-2 w-1/3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleAddNewCategory}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        >
          + Add New Category
        </button>
      </div>

      {showModal && (
        <AddNewCategoryModel
          category={selectedCategory}
          onClose={() => setShowModal(false)}
          onSaved={() => {
            fetchCategories(); // refresh list after add/edit
            setShowModal(false); // close modal
          }}
        />
      )}

      {/* Table */}
      <div className="relative overflow-x-auto h-96 shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category ID
              </th>
              <th scope="col" className="px-6 py-3">
                Category Name
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat, idx) => (
                <tr
                  key={cat.id}
                  className={`border-b border-gray-200 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {cat.id}
                  </th>
                  <td className="px-6 py-4">{cat.name}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditCategory(cat)}
                      className="text-blue-600 hover:underline me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-red-600 hover:underline"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 py-4">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryList;
