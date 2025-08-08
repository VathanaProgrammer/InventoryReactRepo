import { AiFillWarning } from "react-icons/ai";
import { useProductService } from "./Services/useProductService";
import AddStock from "./AddStock";
import React, { useState } from "react";

function Lowstock() {
  const { products, refetch } = useProductService();

  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Open add stock modal and set selected product
  const openAddStockModal = (product) => {
    setSelectedProduct(product);
    setShowAddStockModal(true);
  };

  // Close modal handler
  const closeModal = () => {
    setShowAddStockModal(false);
    setSelectedProduct(null);
  };

  // After saving stock, close modal and optionally refresh products
  const handleStockSaved = () => {
    closeModal();
    if (refetch) refetch(); // refresh products after adding stock
  };

  return (
    <section className="rounded p-10 bg-white">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <AiFillWarning className="text-3xl text-orange-300" />
          <h4 className="text-2xl">Low Stock Items</h4>
        </div>
        <p className="text-gray-500">
          Items that are at or below minimum stock levels
        </p>
      </div>

      {/* AddStock modal */}
      {showAddStockModal && (
        <AddStock
          product={selectedProduct}
          onClose={closeModal}
          onSaved={handleStockSaved}
        />
      )}

      {/* Table */}
      <div className="overflow-x-auto max-h-56">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 font-semibold">
            <tr className="uppercase text-xs">
              <th className="p-3 text-left">Product id</th>
              <th className="p-3 text-left">Product name</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Supplier</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(products || [])
              .filter((p) => p.qty <= 10)
              .map((p) => (
                <tr key={p.id} className="border-gray-300">
                  <td className="p-3">{p.id}</td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3 flex items-center gap-1">
                    <span>{p.qty}</span>
                    <AiFillWarning className="text-orange-300" />
                  </td>
                  <td className="p-3">{p.categoryName}</td>
                  <td className="p-3">{p.supplierName}</td>
                  <td className="p-3">${p.price.toFixed(2)}</td>
                  <td className="p-3">
                    {p.qty <= 10 ? (
                      <span className="text-red-500 px-3 py-1 rounded-full inline-block text-center">
                        Low Stock
                      </span>
                    ) : (
                      <span className="bg-red-300 px-3 py-1 rounded-full inline-block text-center">
                        In Stock
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        className="bg-gray-100 border border-gray-300 py-1 px-3 rounded"
                        onClick={() => openAddStockModal(p)}
                      >
                        Stock
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Lowstock;
