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
          className="bg-white dark:bg-neutral-900 sm:max-w-[600px] rounded-3xl p-8 border-none shadow-2xl"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-6">

              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname" className="text-gray-600 dark:text-gray-400 font-medium">Name</Label>
                  <Input
                    id="fullname"
                    name="fullname"
                    onChange={changeEventHandler}
                    value={input.fullname}
                    type="text"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-neutral-800 dark:text-gray-100 focus:border-[#6A38C2] focus:ring-1 focus:ring-[#6A38C2]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-600 dark:text-gray-400 font-medium">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    onChange={changeEventHandler}
                    value={input.email}
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-neutral-800 dark:text-gray-100 focus:border-[#6A38C2] focus:ring-1 focus:ring-[#6A38C2]"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Bio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-gray-600 dark:text-gray-400 font-medium">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={input.phoneNumber}
                    onChange={changeEventHandler}
                    name="phoneNumber"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-neutral-800 dark:text-gray-100 focus:border-[#6A38C2] focus:ring-1 focus:ring-[#6A38C2]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-gray-600 dark:text-gray-400 font-medium">Bio</Label>
                  <Input
                    id="bio"
                    value={input.bio}
                    onChange={changeEventHandler}
                    name="bio"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-neutral-800 dark:text-gray-100 focus:border-[#6A38C2] focus:ring-1 focus:ring-[#6A38C2]"
                  />
                </div>
              </div>

              {/* Row 3: Skills (Full Width) */}
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-gray-600 dark:text-gray-400 font-medium">Skills</Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-neutral-800 dark:text-gray-100 focus:border-[#6A38C2] focus:ring-1 focus:ring-[#6A38C2]"
                />
              </div>

              {/* Row 4: Resume (Styled Input) */}
              <div className="space-y-2">
                <Label htmlFor="file" className="text-gray-600 dark:text-gray-400 font-medium">Resume</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="h-11 p-2 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-neutral-800 dark:text-gray-100 file:bg-[#6A38C2] file:text-white file:border-none file:rounded-lg file:mr-4 file:px-4 file:py-1 hover:file:bg-[#5b30a6] cursor-pointer"
                />
              </div>

            </div>

            <DialogFooter className="mt-8">
              {loading ? (
                <Button className="w-full h-12 rounded-xl bg-[#6A38C2]" disabled>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Updating...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-semibold shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  Save Changes
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}