function Inventory  (){
         return(
            <section className="h-screen flex flex-col p-20 w-screen">
                     <header className="flex justify-between w-full items-center">
                             <div className="">
                                   <h4>Inventory Management</h4>
                                   <p>Manage your stock efficiently</p>
                             </div>
                             <button className="bg-blue-600 p-2">
                               + Add Item
                             </button>
                     </header>
                     <div className="grid grid-cols-4">
                          <div className="border-2 border-gray-400 rounded relative">
                                
                          </div>

                     </div>
            </section>
         )
}
export default Inventory;