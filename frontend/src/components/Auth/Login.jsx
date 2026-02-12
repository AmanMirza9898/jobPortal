import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2, Eye, EyeOff } from "lucide-react";
import loginImage from "../../assets/login1.gif"; // Import image

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));

        // Redirect logic
        const from = location.state?.from || "/";
        navigate(from, { replace: true });

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="h-full">
      <div className="flex h-[calc(100vh-120px)] md:h-[calc(100vh-150px)] overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:flex w-1/2 h-full items-center justify-center relative">
          <img
            src={loginImage}
            alt="Login"
            className="h-[90%] w-auto object-contain"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 flex flex-col p-4 md:p-8 h-full items-center justify-center">
          <div className="w-full max-w-md bg-white dark:bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/20 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all">
            <form onSubmit={submitHandler} className="space-y-4">
              <div className="text-center mb-6">
                <h1 className="font-bold text-3xl mb-2 text-gray-900 dark:text-gray-100">Login</h1>
                <p className="text-gray-500 dark:text-gray-400">Welcome back! Please enter your details.</p>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</Label>
                  <Input
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-neutral-900 dark:text-gray-100 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={input.password}
                      name="password"
                      onChange={changeEventHandler}
                      placeholder="Enter your password"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-neutral-900 dark:text-gray-100 focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-all pr-10"
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

                <div className="pt-2">
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">I am a...</Label>
                  <RadioGroup defaultValue="student" className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 border border-gray-200 dark:border-gray-700 rounded-xl p-2 cursor-pointer hover:border-black dark:hover:border-white transition-colors">
                      <input
                        type="radio"
                        name="role"
                        value="student"
                        id="r1"
                        checked={input.role === 'student'}
                        onChange={changeEventHandler}
                        className="cursor-pointer dark:bg-neutral-900"
                      />
                      <Label htmlFor="r1" className="cursor-pointer flex-1 text-sm dark:text-gray-300">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2 border border-gray-200 dark:border-gray-700 rounded-xl p-2 cursor-pointer hover:border-black dark:hover:border-white transition-colors">
                      <input
                        type="radio"
                        name="role"
                        value="recruiter"
                        id="r2"
                        checked={input.role === 'recruiter'}
                        onChange={changeEventHandler}
                        className="cursor-pointer dark:bg-neutral-900"
                      />
                      <Label htmlFor="r2" className="cursor-pointer flex-1 text-sm dark:text-gray-300">Recruiter</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="pt-2">
                {loading ? (
                  <Button className="w-full py-3 rounded-xl text-lg font-medium"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait</Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Login
                  </Button>
                )}
              </div>

              <p className="text-center text-gray-600 mt-6">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
