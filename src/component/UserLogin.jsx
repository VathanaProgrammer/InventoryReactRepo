import { RiBox3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { API_BASE_URL } from "../Config/Api";
function UserLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleSignIn = async () => {
         if(!email.trim()){
                toast.error("Invalid email!");
                return;
            }
          if(!password.trim()){
                toast.error("Invalid password!");
                return;
            }
        try {
            const res = await axios.post(`${API_BASE_URL}/users/login`, {
                email,
                password,
            });
            if (res.data.success) {
                navigate("/Dashboard");
                localStorage.setItem("user", JSON.stringify(res.data.data));
                localStorage.setItem("token", res.data.token);
                toast.success("Login successful!");
            }
            else {
                toast.error("Invalid credentials");
                setError(res || "Login failed.");
            }
        }
        catch (err) {
        toast.error(err.response.data.message);
        setError("Server error or wrong credentials.");
    }
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
                                <p className=" font-semibold">Email</p>
                                <input
                                    className="w-full py-3 p-3 border-2 border-gray-100 rounded"
                                    type="text"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value) }
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <p className=" font-semibold">Password</p>
                                <input
                                    className="w-full py-3 p-3 border-2 border-gray-200 rounded"
                                    type="text"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e)=> setPassword(e.target.value)}
                                    required
                                />
                            </div>                       
                            <button type="button" className="w-full h-12 bg-blue-600 text-gray-100" onClick={handleSignIn}>
                                Sign In
                            </button>
                        </form>
                        <div className="bg-blue-50 mt-5 p-2 rounded text-center">
                            <h4 className="text-blue-500 text-xl">Demo Credentials</h4>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
export default UserLogin;