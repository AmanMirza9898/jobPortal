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
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto h-[80vh]">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-100 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl mb-5">Reset Password</h1>
                    <div className="my-2">
                        <Label>New Password</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your new password"
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className="my-2">
                        <Label>Confirm New Password</Label>
                        <Input
                            type="password"
                            value={confirmPassword}
                            name="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your new password"
                        />
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait </Button> : <Button type="submit" className="w-full my-4">Reset Password</Button>
                    }
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
