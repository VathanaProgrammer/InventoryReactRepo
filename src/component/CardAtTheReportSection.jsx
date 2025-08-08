import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Config/Api"; // adjust path as needed

function CardAtTheReportSection() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories and products on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/categories`),
          axios.get(`${API_BASE_URL}/products`),
        ]);

        // Assuming the data structure:
        // categoriesRes.data = array of categories with { id, name, ... }
        // productsRes.data = array of products with { id, name, stock or qty, categoryId, ... }

        // For categories, if you want percentages, you need to calculate it:
        // Calculate total products count first:
        const totalProducts = productsRes.data.length;

        // Count how many products per category
        const categoryCounts = categoriesRes.data.map((cat) => {
          const count = productsRes.data.filter(
            (p) => p.categoryId === cat.id
          ).length;
          return {
            name: cat.name,
            count,
          };
        });

        // Calculate percentage per category
        const categoriesWithPercentage = categoryCounts.map((cat) => ({
          name: cat.name,
          percentage: totalProducts ? ((cat.count / totalProducts) * 100).toFixed(1) : 0,
        }));

        setCategories(categoriesWithPercentage);
        setProducts(productsRes.data);
      } catch (err) {
        setError("Failed to load data from server.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Stock status calculations (based on `stock` or `qty` field in product)
  const inStock = products.filter((p) => p.qty > 10).length;
  const lowStock = products.filter((p) => p.qty > 0 && p.qty <= 10).length;
  const outOfStock = products.filter((p) => p.qty === 0).length;

  const stockStatus = [
    { status: "In Stock", count: inStock, color: "bg-green-500" },
    { status: "Low Stock", count: lowStock, color: "bg-yellow-500" },
    { status: "Out of Stock", count: outOfStock, color: "bg-red-500" },
  ];

  if (loading) return <p>Loading report data...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

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
