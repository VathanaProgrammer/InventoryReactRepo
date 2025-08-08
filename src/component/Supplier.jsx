import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Config/Api";
import AddNewSupplierModel from "./AddNewSupplierModel"; // reuse your form
import { toast } from "react-toastify";
function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/suppliers`);
      console.log("Fetched suppliers:", response);
      setSuppliers(response.data.data || []);
      setFilteredSuppliers(response.data.data || []);
    } catch (err) {
      setError("Failed to fetch suppliers.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredSuppliers(suppliers);
    } else {
      setFilteredSuppliers(
        suppliers.filter((sup) =>
          sup.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, suppliers]);

  const handleDeleteSupplier = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/suppliers/${id}`);
        console.log("Delete response:", response);
        if (response.data.success) {
          toast.success("Supplier deleted successfully!", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchSuppliers(); // Refresh list after deletion
        } else {
          toast.error("Failed to delete supplier", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to delete supplier",
          {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        console.error("Error deleting supplier:", error);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddNewSupplier = () => {
    setEditingSupplier(null); // new mode
    setIsModalOpen(true);
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier); // edit mode
    setIsModalOpen(true);
  };

  const handleCloseModal = (refresh = false) => {
    setIsModalOpen(false);
    setEditingSupplier(null);
    if (refresh) {
      fetchSuppliers(); // reload after add/edit
    }
  };

  if (loading) return <p>Loading suppliers...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      {/* Search & Add Button */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search suppliers..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-3 py-2 w-1/3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleAddNewSupplier}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        >
          + Add New Supplier
        </button>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto h-96 shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Supplier ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Contact Person
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((sup, idx) => (
                <tr
                  key={sup.id}
                  className={`border-b border-gray-200 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {sup.id}
                  </th>
                  <td className="px-6 py-4">{sup.name}</td>
                  <td className="px-6 py-4">{sup.contactPerson}</td>
                  <td className="px-6 py-4">{sup.phone}</td>
                  <td className="px-6 py-4">{sup.email}</td>
                  <td className="px-6 py-4">{sup.address}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditSupplier(sup)}
                      className="text-blue-600 hover:underline me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSupplier(sup.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  No suppliers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 relative">
            <button
              onClick={() => handleCloseModal()}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <AddNewSupplierModel
              supplier={editingSupplier} // ✅ match the prop name used in form
              onClose={handleCloseModal}
              onSaved={() => fetchSuppliers()} // refresh list after save
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SupplierList;
