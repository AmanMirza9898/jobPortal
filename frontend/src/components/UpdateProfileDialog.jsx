import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from '@/redux/authSlice';
import axios from "axios";
import { toast } from "sonner";

export default function UpdateProfileDialog({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
    file: null
  });

  // Sync state with User data whenever the modal opens or user data changes
  useEffect(() => {
    if (user) {
      setInput({
        fullname: user.fullname || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.profile?.bio || "",
        // Convert array to comma-separated string for editing (e.g., "HTML, CSS")
        skills: user.profile?.skills?.map(skill => skill).join(", ") || "",
        file: null // Always reset file input on open
      });
    }
  }, [user, open]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills); // Backend should handle the splitting of this string
    
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          // Allow Axios to set content-type with boundary automatically for FormData
          "Content-Type": "multipart/form-data", 
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false); // Only close on success
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="bg-white sm:max-w-[425px] border-none"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  name="fullname"
                  onChange={changeEventHandler}
                  value={input.fullname}
                  type="text"
                  placeholder="Full Name"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={changeEventHandler}
                  value={input.email}
                  placeholder="example@example.com"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">Number</Label>
                <Input
                  id="number"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  name="phoneNumber"
                  placeholder="981126XXXX"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">Bio</Label>
                <Input
                  id="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  name="bio"
                  placeholder="Bio"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">Skills</Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  placeholder="React, Node.js, Express"
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">Resume</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="col-span-3"
                  // Removed value={input.file} -> This is critical
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="py-5 w-full my-4 border cursor-pointer text-white bg-black hover:bg-[#262626]"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}