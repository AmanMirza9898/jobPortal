import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import signupImage from "../../assets/signup.avif";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit
        toast.error("File size must be less than 1MB");
        return;
      }
      setInput({ ...input, file });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
      return toast.error("Please select a role (Student or Recruiter)");
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.log("Error details:", error);
      const errorMsg =
        error.response?.data?.message ||
        "Internal Server Error or Network Issue";
      toast.error(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="h-full">
      <div className="flex flex-col md:flex-row h-auto md:h-[calc(100vh-150px)] overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:flex w-1/2 h-full items-center justify-center relative">
          <img
            src={signupImage}
            alt="Signup"
            className="h-[80%] w-auto object-contain"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 flex flex-col p-4 md:p-8 h-auto md:h-full md:overflow-y-auto items-center justify-center md:block">
          <div className="w-full max-w-md bg-white dark:bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/20 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all">
            <form onSubmit={submitHandler} className="space-y-4">
              <div className="text-center mb-4">
                <h1 className="font-bold text-3xl mb-2 text-gray-900 dark:text-gray-100">Create Account</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Join us to find your dream job</p>
              </div>

              <div>
                <Label className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1.5 ml-1">Full Name</Label>
                <Input
                  type="text"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-neutral-900 dark:text-gray-100 focus:border-black dark:focus:border-white focus:ring-0 outline-none transition-all shadow-sm"
                />
              </div>

              <div>
                <Label className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1.5 ml-1">Email</Label>
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-neutral-900 dark:text-gray-100 focus:border-black dark:focus:border-white focus:ring-0 outline-none transition-all shadow-sm"
                />
              </div>

              <div>
                <Label className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1.5 ml-1">Phone Number</Label>
                <Input
                  type="number"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-neutral-900 dark:text-gray-100 focus:border-black dark:focus:border-white focus:ring-0 outline-none transition-all shadow-sm"
                />
              </div>

              <div>
                <Label className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1.5 ml-1">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="Create a password"
                    className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-neutral-900 dark:text-gray-100 focus:border-black dark:focus:border-white focus:ring-0 outline-none transition-all shadow-sm pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <Label className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-2.5 ml-1">I am a...</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`flex items-center space-x-3 border ${input.role === 'student' ? 'border-black dark:border-white bg-white dark:bg-neutral-800' : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-neutral-900'} rounded-2xl p-3 cursor-pointer hover:border-black dark:hover:border-white transition-all shadow-sm`}>
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      id="r1"
                      checked={input.role === "student"}
                      onChange={changeEventHandler}
                      className="w-4 h-4 accent-black dark:accent-white cursor-pointer"
                    />
                    <Label htmlFor="r1" className="cursor-pointer font-medium text-gray-700 dark:text-gray-200 flex-1">Student</Label>
                  </div>
                  <div className={`flex items-center space-x-3 border ${input.role === 'recruiter' ? 'border-black dark:border-white bg-white dark:bg-neutral-800' : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-neutral-900'} rounded-2xl p-3 cursor-pointer hover:border-black dark:hover:border-white transition-all shadow-sm`}>
                    <input
                      type="radio"
                      name="role"
                      value="recruiter"
                      id="r2"
                      checked={input.role === "recruiter"}
                      onChange={changeEventHandler}
                      className="w-4 h-4 accent-black dark:accent-white cursor-pointer"
                    />
                    <Label htmlFor="r2" className="cursor-pointer font-medium text-gray-700 dark:text-gray-200 flex-1">Recruiter</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1.5 ml-1">Profile Picture</Label>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className="w-full px-3 py-1.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-neutral-900 cursor-pointer text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-black dark:file:bg-white file:text-white dark:file:text-black hover:file:bg-gray-800 dark:hover:file:bg-gray-200 transition-all shadow-sm dark:text-gray-300"
                />
              </div>

              <div className="pt-2 pb-4">
                {loading ? (
                  <Button className="w-full py-3 rounded-xl text-lg font-medium">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Create Account
                  </Button>
                )}
              </div>

              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
