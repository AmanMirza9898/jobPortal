import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

const {loading }= useSelector(store=>store.auth);

const Navigate = useNavigate();
const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async(e)=>{
      e.preventDefault();
      try{
        dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true, 
        });
        if(res.data.success){
          dispatch(setUser(res.data.user));
          Navigate("/")
          toast.success(res.data.message);
        }
      }
  
      catch(error){
        console.log(error);
        const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
        
      }

      finally{
        dispatch(setLoading(false));
      }
      
    }

  return (
    <div>
     

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className=" w-1/2 border border-gray-200 rounded-md p-7 my-10 "
        >
          <h1 className="font-bold  text-xl mb-5">Login</h1>
          <div className="my-4">
            <Label>Email</Label>
            <Input
              className="mt-2 py-5"
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Example@gmail.com"
            />
          </div>
          <div className="my-4">
            <Label>Password</Label>
             <Input className="mt-2 py-5" type="Password" value={input.password} name="password" onChange={changeEventHandler}  placeholder="Password" />
          </div>
          <div className="flex justify-between items-center mt-4">
            <RadioGroup
              defaultValue="comfortable"
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <input 
                type="radio"
                name="role"
                value="student"
                checked={input.role === 'student'}
                onChange={changeEventHandler}
                className="cursor-pointer accent-black h-4 w-4"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
               <input 
                type="radio"
                name="role"
                value="recruiter"
                 checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
                className="cursor-pointer accent-black h-4 w-4"
                />
                <Label htmlFor="r2">recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {
            loading ?<Button className="w-full my-4"><Loader2 clasName="mr-2 h-4 w-4 animate-spin"/>Please wait</Button> : <Button
            type="submit"
            className="py-5 w-full my-4 border cursor-pointer text-white bg-black hover:bg-[#262626]"
          >
            Login
          </Button>
          }
          
          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/Signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
