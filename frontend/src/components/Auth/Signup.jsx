import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner"; // Ensure this matches your main.jsx toaster
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Pehle check karlo ki role select kiya hai ya nahi
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
        // Success toast pehle dikhayein, phir navigate karein
        toast.success(res.data.message || "Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.log("Error details:", error);

      // SAFE ERROR HANDLING: Agar response nahi mila toh fallback message dikhayega
      const errorMsg =
        error.response?.data?.message ||
        "Internal Server Error or Network Issue";
      toast.error(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-7 my-10 shadow-sm "
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          <div className="my-4">
            <Label>Full Name</Label>
            <Input
              className="mt-2 py-5"
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="John Doe"
            />
          </div>

          <div className="my-4">
            <Label>Email</Label>
            <Input
              className="mt-2 py-5"
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
            />
          </div>

          <div className="my-4">
            <Label>Phone Number</Label>
            <Input
              className="mt-2 py-5"
              type="number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="807699XXXX"
            />
          </div>

          <div className="my-4">
            <Label>Password</Label>
            <Input
              className="mt-2 py-5"
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Password"
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <RadioGroup className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-black h-4 w-4"
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-black h-4 w-4"
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex  gap-2">
              <Label>Profile Picture</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer w-[200px]"
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-4 py-5">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 py-5 border cursor-pointer text-white bg-black hover:bg-[#262626]"
            >
              Signup
            </Button>
          )}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 ml-1">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
