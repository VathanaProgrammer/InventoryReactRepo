import { AiFillWarning } from "react-icons/ai";
import { FaRegPenToSquare } from "react-icons/fa6";
import { useProductService } from "./Services/useProductService";
function Lowstock() {
     const { products, loading, error } = useProductService();

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

               {/* Table */}
               <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700">
                         <thead className="bg-gray-100 text-gray-600 font-semibold">
                              <tr className="uppercase text-xs">
                                   <th className="p-3 text-left">Product id</th>
                                   <th className="p-3 text-left">product name</th>
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
                                   .filter(p => p.qty <= 10)
                                   .map(p => (
                                        <tr key={p.id} className=" border-gray-300">
                                             {/* Item Details */}
                                             <td className="p-3">

                                                  <span>{p.id}</span>

                                             </td>

                                             {/* Name */}
                                             <td className="p-3">{p.name}</td>

                                             {/* Stock */}
                                             <td className="p-3">
                                                  <div className="flex items-center gap-1">
                                                       <span>{p.qty}</span>
                                                       <AiFillWarning className="text-orange-300" />
                                                  </div>
                                             </td>

                                             {/* Category */}
                                             <td className="p-3">
                                                  <span className="inline-block text-center">
                                                       {p.categoryName}
                                                  </span>
                                             </td>

                                             {/* Supplier */}
                                             <td className="p-3">{p.supplierName}</td>

                                             {/* Price */}
                                             <td className="p-3">{p.price.toFixed(2)}</td>

                                             {/* Status */}
                                             <td className="p-3">
                                                  {
                                                       p.qty <= 10 ? (
                                                            <span className=" text-red-500 px-3 py-1 rounded-full inline-block text-center">
                                                                 Low Stock
                                                            </span>
                                                       ) : (
                                                            <span className="bg-red-300 px-3 py-1 rounded-full inline-block text-center">
                                                                 In Stock
                                                            </span>
                                                       )}
                                             </td>

                                             {/* Actions */}
                                             <td className="p-3">
                                                  <div className="flex items-center gap-2">
                                                       <button className="bg-gray-100 border border-gray-300 py-1 px-3 rounded">
                                                            Stock
                                                       </button>
                                                       <i className="border border-gray-300 p-1 rounded">
                                                            <FaRegPenToSquare className="text-xl text-gray-500 cursor-pointer" />
                                                       </i>
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
