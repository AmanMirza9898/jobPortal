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
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto h-[80vh]">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-100 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl mb-5">Forgot Password</h1>
                    <div className="my-2">
                        <Label>Email Address</Label>
                        <Input
                            type="email"
                            value={email}
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email to receive reset link"
                        />
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait </Button> : <Button type="submit" className="w-full my-4">Send Reset Link</Button>
                    }
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
