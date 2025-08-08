import React, { useState } from "react";
import SearchIcon from "./Icons/SearchIcon";

function TableInventoryAtTheFirstSection() {
  // Sample dynamic product data
  const [products] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      supplier: "Acme Corp",
      price: 59.99,
      status: "In Stock",
    },
    {
      id: 2,
      name: "Running Shoes",
      category: "Apparel",
      supplier: "Sporty Inc",
      price: 89.99,
      status: "Out of Stock",
    },
    {
      id: 3,
      name: "Garden Shovel",
      category: "Home & Garden",
      supplier: "GreenWorks",
      price: 25.5,
      status: "In Stock",
    },
    {
      id: 4,
      name: "Lipstick",
      category: "Beauty",
      supplier: "BeautyCo",
      price: 15.0,
      status: "In Stock",
    },
    {
      id: 5,
      name: "Yoga Mat",
      category: "Sports",
      supplier: "FitLife",
      price: 30.0,
      status: "In Stock",
    },
  ]);

  return (
    <div className="bg-white w-screen h-screen p-10">
      <header className="table-inventory-at-the-first-section flex justify-between w-full items-center">
        <div className="header-content relative w-[75%] me-2">
          {/* adjust width as you want */}
          <SearchIcon
            className="search-icon absolute top-1/2 left-3 -translate-y-[5px] text-gray-400 pointer-events-none"
            width={20}
            height={20}
            stroke="currentColor"
          />
          <input
            type="text"
            placeholder="search by items name or SKU"
            className="px-4 ps-12 py-2 border border-gray-300 text-lg rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="w-[25%]">
          <select
            className="w-full py-2 px-4 border text-black border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue=""
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="electronics">Electronics</option>
            <option value="apparel">Apparel</option>
            <option value="home-garden">Home & Garden</option>
            <option value="beauty">Beauty</option>
            <option value="sports">Sports</option>
          </select>
        </div>
      </header>

      <div className="mt-6 w-full overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-800">
              <th className="border border-gray-300 px-4 py-2">Product Id</th>
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Supplier</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 text-gray-800">
                <td className="border border-gray-300 px-4 py-2">
                  {product.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.category}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.supplier}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${product.price.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="text-blue-600 hover:underline mr-2">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableInventoryAtTheFirstSection;
