import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { Loader2 } from "lucide-react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/password/forgot`, { email }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
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
                        <h1 className="font-bold text-3xl text-gray-900 mb-2">Forgot Password</h1>
                        <p className="text-gray-500">No worries! Enter your email to receive a secure reset link.</p>
                    </div>
                    
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-gray-700">Email Address</Label>
                            <Input
                                type="email"
                                value={email}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="h-12 border-gray-200 focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        
                        {loading ? (
                            <Button disabled className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all">
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                                Sending Link...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg shadow-purple-200 transition-all transform active:scale-[0.98]">
                                Send Reset Link
                            </Button>
                        )}
                        
                        <div className="text-center mt-6">
                            <a href="/login" className="text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors">
                                Back to Login
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
