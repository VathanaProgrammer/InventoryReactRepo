import { BsBoxFill } from "react-icons/bs";
import { AiFillWarning } from "react-icons/ai";
import { BsGraphUpArrow } from "react-icons/bs";
import { useState } from "react";
import SupplierList from "./Supplier.jsx";
import Lowstock from "../component/LowStockItems.jsx";
import TableInventoryAtTheFirstSection from "../component/TableInvetoryAtTheFirstSection.jsx";
import CardAtTheReportSection from "../component/CardAtTheReportSection.jsx";
import { useProductService } from "./Services/useProductService";
import CategoryList from "./Category.jsx";
import POS from "./POS.jsx";
function Dashboard() {
  const { products } = useProductService();
  const lowStockCount = (products || []).filter((p) => p.qty <= 10).length;
  const totalPriceStock = (products || []).reduce(
    (sum, p) => sum + Number(p.price),
    0
  );
  const cateCount = new Set((products || []).map((p) => p.categoryId)).size;
  const productCount = (products || []).length;
  const [activeTab, setActiveTab] = useState("inventory");
  return (
    <section className="h-screen flex flex-col xl:px-30 lg:px-20 sm:px-10 px-5 w-screen text-gray-700 bg-gray-100">
      <header className="flex justify-between w-full items-center py-10">
        <div className="">
          <h4 className="lg:text-4xl sm:text-3xl text-xl font-semibold py-1 uppercase">
            Inventory Management
          </h4>
          <p className="text-gray-500 sm:text-xl text-sm">
            Manage your stock efficiently
          </p>
        </div>
      </header>
      <div className="grid xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-2 gap-10">
        <div className="border-2 border-gray-300 rounded relative px-10 py-5 bg-white">
          <i className=" absolute top-4 right-4">
            <BsBoxFill className="text-xl" />
          </i>
          <h4 className="font-semibold sm:text-xl text-sm text-gray-700">
            Total Product
          </h4>
          <h4 className="sm:text-xl text-sm font-semibold">{productCount}</h4>
          <p className="text-gray-500 ">Active inventory items</p>
        </div>
        <div className="border-2 border-gray-300 rounded relative px-10 py-5 bg-white">
          <i className=" absolute top-4 right-4">
            <AiFillWarning className="text-xl text-orange-300" />
          </i>
          <h4 className="font-semibold sm:text-xl text-sm text-gray-700">
            Low Stock Alerts
          </h4>
          <h4 className="sm:text-xl text-sm text-orange-300 font-semibold">
            {lowStockCount}
          </h4>
          <p className="text-gray-500">Items need restocking</p>
        </div>
        <div className="border-2 border-gray-300 rounded relative px-10 py-5 bg-white">
          <i className=" absolute top-4 right-4">
            <BsGraphUpArrow className="text-xl text-green-500" />
          </i>
          <h4 className="font-semibold sm:text-xl text-sm text-gray-700">
            Total Stock Value
          </h4>
          <h4 className="sm:text-xl text-sm text-green-500 font-semibold">
            ${totalPriceStock.toFixed(2)}
          </h4>
          <p className="text-gray-500">Current inventory value</p>
        </div>
        <div className="border-2 border-gray-300 rounded relative px-10 py-5 bg-white">
          <i className=" absolute top-4 right-4">
            <BsBoxFill className="text-xl" />
          </i>
          <h4 className="font-semibold sm:text-xl text-sm text-gray-700">
            Categories
          </h4>
          <h4 className="sm:text-xl text-sm font-semibold">{cateCount}</h4>
          <p className="text-gray-500">Product categories</p>
        </div>
      </div>
      <div className="col-span-4 bg-gray-200 rounded my-5">
        <div className="grid grid-cols-3 text-center p-1">
          <h1
            className={`py-2 uppercase cursor-pointer text-sm rounded font-semibold text-gray-600 ${
              activeTab === "inventory" ? "bg-white" : ""
            }`}
            onClick={() => setActiveTab("inventory")}
          >
            Product
          </h1>
          <h1
            className={`py-2 uppercase cursor-pointer text-sm rounded font-semibold text-gray-600 ${
              activeTab === "lowstock" ? "bg-white" : ""
            }`}
            onClick={() => setActiveTab("lowstock")}
          >
            Low Stock
          </h1>
          <h1
            className={`py-2 uppercase cursor-pointer text-sm rounded font-semibold text-gray-600 ${
              activeTab === "report" ? "bg-white" : ""
            }`}
            onClick={() => setActiveTab("report")}
          >
            Report
          </h1>
          <h1
            className={`py-2 uppercase cursor-pointer text-sm rounded font-semibold text-gray-600 ${
              activeTab === "category" ? "bg-white" : ""
            }`}
            onClick={() => setActiveTab("category")}
          >
            Category
          </h1>
          <h1
            className={`py-2 uppercase cursor-pointer text-sm rounded font-semibold text-gray-600 ${
              activeTab === "supplier" ? "bg-white" : ""
            }`}
            onClick={() => setActiveTab("supplier")}
          >
            Supplier
          </h1>
          <h1
            className={`py-2 uppercase cursor-pointer text-sm rounded font-semibold text-gray-600 ${
              activeTab === "POS" ? "bg-white" : ""
            }`}
            onClick={() => setActiveTab("POS")}
          >
            Sale
          </h1>
        </div>
      </div>
      {activeTab === "inventory" && <TableInventoryAtTheFirstSection />}
      {activeTab === "lowstock" && <Lowstock />}
      {activeTab === "report" && <CardAtTheReportSection />}
      {activeTab === "category" && <CategoryList />}
      {activeTab === "supplier" && <SupplierList />}
      {activeTab === "POS" && <POS />}
    </section>
  );
}
export default Dashboard;
