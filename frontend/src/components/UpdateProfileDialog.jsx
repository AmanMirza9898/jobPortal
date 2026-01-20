import React, { use, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
// Add this line at the top with other imports
import { setUser } from '@/redux/authSlice';
import store from "@/redux/store";
import { Form } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

export default function UpdateProfileDialog({ open, setOpen }) {
  const [loading , setLoading] = useState(false);
  const {user} = useSelector(store => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio:user?.profile?.bio || '',
    skills:user?.profile?.skills?.map(skill=>skill) || '', 
    file:user?.profile?.resume
  });


  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
     setInput({ ...input, [e.target.name]: e.target.value})
  }

  const fileChangeHandler = (e) => {
   const file = e.target.files?.[0];
   setInput({ ...input, file });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('bio', input.bio);
    formData.append('skills', input.skills);  
    if(input.file){
      formData.append('file', input.file);
    }

    try{
       const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData ,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true,
        }
      ); 
      if(res.data.success){
      dispatch(setUser(res.data.user));
      toast.success(res.data.message);
      setOpen(false);
    };
  } catch(err){
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
      
    }

    finally{
      setLoading(false);
    }
    
    setOpen(false);
    console.log(input)
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='bg-white sm:max-w-[425px] border-none' onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
                <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="Name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name='fullname'
                onChange={changeEventHandler}
                value={input.fullname}
                type="text"
                placeholder="Full Name"
                className="col-span-3 "
              />

                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="email" className="text-right">
                email
              </Label>
              <Input
                id="email"
                name='email'
                type="email"
                onChange={changeEventHandler}
                value={input.email}
                placeholder="example@example.com"
                className="col-span-3 "
              />

                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="Number" className="text-right">
                Number
              </Label>
              <Input
                id="number"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                name='phoneNumber'
                placeholder="981126XXXX"
                className="col-span-3 "
              />

                </div>

                <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                id="bio"
                value={input.bio}
                onChange={changeEventHandler}
                name='bio'
                placeholder="Bio"
                className="col-span-3 "
              />

                </div>

                 <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                name='skills'
                value={input.skills}
                placeholder="Skills"
                onChange={changeEventHandler}
                className="col-span-3 "
              />

                </div>
                 <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <Input
                id="file"
                name='file'
                type='file'
                accept='application/pdf'
                onChange={fileChangeHandler}
                placeholder="Resume"
                className="col-span-3 "
              />
               
                </div>
            </div>
               <DialogFooter>
               
          {
            loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button> : <Button
            type="submit"
            className="py-5 w-full my-4 border cursor-pointer text-white bg-black hover:bg-[#262626]"
          >
            Update
          </Button>
          }
               </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
