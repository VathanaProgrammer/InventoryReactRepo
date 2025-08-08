import React from "react";

function CardAtTheReportSection() {
  // Example dynamic category distribution data
  const categories = [
    { name: "Electronics", percentage: 45 },
    { name: "Clothing", percentage: 25 },
    { name: "Books", percentage: 15 },
    { name: "Home Appliances", percentage: 10 },
    { name: "Others", percentage: 5 },
  ];

  // Example dynamic product data
  const products = [
    { name: "Laptop", stock: 15 },
    { name: "Shirt", stock: 0 },
    { name: "Book - React Guide", stock: 4 },
    { name: "Washing Machine", stock: 8 },
    { name: "Camera", stock: 25 },
    { name: "Microwave", stock: 2 },
  ];

  // Calculate stock status counts dynamically
  const inStock = products.filter((p) => p.stock > 10).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  // Stock status with colored badges for counts only
  const stockStatus = [
    { status: "In Stock", count: inStock, color: "bg-green-500" },
    { status: "Low Stock", count: lowStock, color: "bg-yellow-500" },
    { status: "Out of Stock", count: outOfStock, color: "bg-red-500" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
      {/* Category Distribution */}
      <section className="p-6 border min-h-[400px] border-gray-300 shadow-md bg-white rounded-lg w-full">
        <header>
          <h1 className="text-3xl text-gray-700 font-semibold mb-6">
            Category Distribution
          </h1>
        </header>

        <div className="space-y-3">
          {categories.map((cat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-600">{cat.name}</span>
              <div className="flex items-center space-x-2 w-1/2">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
                <span className="text-gray-700 font-medium">{cat.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stock Status Summary */}
      <section className="p-6 border border-gray-300 min-h-[400px] shadow-md bg-white rounded-lg w-full">
        <header>
          <h1 className="text-3xl text-gray-700 font-semibold mb-6">
            Stock Status Summary
          </h1>
        </header>

        <ul className="space-y-3">
          {stockStatus.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0"
            >
              <span className="text-gray-800 text-lg">{item.status}</span>
              <span
                className={`${item.color} text-white text-sm font-semibold px-4 py-1 rounded-full min-w-[40px] text-center`}
              >
                {item.count}
              </span>
            </li> 
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CardAtTheReportSection;
