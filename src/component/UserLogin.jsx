import { RiBox3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
function UserLogin() {
        const navigate = useNavigate();
        const handleSignIn = () =>{
             navigate('/Inventory');
    }
    return (
        <>
            <div className="flex justify-between items-center w-full h-screen bg-blue-50 text-gray-600">
                <div className="flex w-screen flex-col items-center">
                    <RiBox3Fill className="text-5xl mb-4 bg-blue-200 rounded" />
                    <h4 className="text-3xl pb-1">Inventory Management</h4>
                    <p className="text-gray-500 text-xl pb-6">Admin Portal</p>
                    <div className="w-[120] h-[75%] bg-white p-10 rounded-xl">
                        <h4 className=" text-center text-3xl">Admin Login</h4>
                        <p className="text-gray-400 p-5">Enter your credentials to access the inventory system</p>
                        <form className="flex flex-col justify-center items-center w-full gap-5">
                            <div className="w-full">
                                <p className=" font-semibold">Usename</p>
                                <input
                                    className="w-full py-3 p-3 border-2 border-gray-100 rounded"
                                    type="text"
                                    placeholder="Enter Username"
                                />
                            </div>
                            <div className="w-full">
                                <p className=" font-semibold">Password</p>
                                <input
                                    className="w-full py-3 p-3 border-2 border-gray-200 rounded"
                                    type="text"
                                    placeholder="Enter Password"
                                />
                            </div>
                            <button type="button" className="w-full h-12 bg-blue-600 text-gray-100" onClick={handleSignIn}>
                                Sign In
                            </button>
                        </form>
                        <div className="bg-blue-50 mt-5 p-2 rounded text-center">
                            <h4 className="text-blue-500 text-xl">Demo Credentials</h4>
                            <p>Username: admin</p>
                            <p>Password: admin123</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
export default UserLogin;