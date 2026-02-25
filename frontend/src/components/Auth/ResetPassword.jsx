import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/password/reset/${token}`, { password }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <h1 className="font-bold text-3xl text-gray-900 mb-2">Reset Password</h1>
                        <p className="text-gray-500">Create a new secure password for your JobSyncc account.</p>
                    </div>
                    
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700">New Password</Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="h-12 border-gray-200 focus:ring-2 focus:ring-purple-500 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700">Confirm New Password</Label>
                            <Input
                                type="password"
                                value={confirmPassword}
                                name="confirmPassword"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="h-12 border-gray-200 focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        
                        {loading ? (
                            <Button disabled className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all">
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                                Updating Password...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg shadow-purple-200 transition-all transform active:scale-[0.98]">
                                Reset Password
                            </Button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
