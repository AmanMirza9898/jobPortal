import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, FileText } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAllAppliedJobs from "../hooks/useGetAllAppliedJobs";

// const skills = ["Html", "Css", " JavaScript", "ReactJS"];


export default function Profile() {
  useGetAllAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const isResume = user?.profile?.resume ? true : false;
  return (
    <>
      <div className="max-w-4xl mx-auto mt-5 px-4 md:px-0">

        {/* Profile Card */}
        <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-4 md:p-8 shadow-xl mb-5 relative overflow-hidden">
          {/* Decorative Gradient Background (Top) */}
          <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 z-0"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start pt-12 px-2">

            {/* User Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">
              {/* Avatar */}
              <Avatar className="h-32 w-32 border-4 border-white dark:border-neutral-800 shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt="profile"
                  className="object-cover"
                />
              </Avatar>

              {/* Text Info */}
              <div className="mt-2 text-center md:text-left flex-1">
                <h1 className="font-extrabold text-3xl text-gray-900 dark:text-gray-100 mb-1">{user?.fullname}</h1>
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-4 max-w-lg">{user?.profile?.bio || "No bio added yet."}</p>

                {/* Contact Details */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-neutral-800 px-3 py-1.5 rounded-full border border-gray-100 dark:border-gray-700">
                    <Mail className="w-4 h-4 text-[#6A38C2] dark:text-[#a04ee0]" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-neutral-800 px-3 py-1.5 rounded-full border border-gray-100 dark:border-gray-700">
                    <Contact className="w-4 h-4 text-[#6A38C2] dark:text-[#a04ee0]" />
                    <span>{user?.phoneNumber}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="mt-4 md:mt-0 md:self-start bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:shadow-md rounded-full w-10 h-10 p-0 flex items-center justify-center"
            >
              <Pen className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </Button>
          </div>

          {/* Skills & Resume Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 border-t border-gray-100 dark:border-gray-800 pt-8">

            {/* Skills */}
            <div>
              <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                Skills
              </h1>
              <div className="flex flex-wrap gap-2">
                {user?.profile?.skills.length !== 0 ? (
                  user?.profile?.skills.map((item, index) => (
                    <Badge
                      key={index}
                      className="bg-black dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 text-white dark:text-gray-100 px-4 py-1.5 rounded-full text-sm font-medium transition-colors shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-400 italic">No skills added yet.</span>
                )}
              </div>
            </div>

            {/* Resume */}
            <div>
              <Label className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                Resume
              </Label>
              {isResume ? (
                <a
                  target="_blank"
                  href={user?.profile?.resume}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-neutral-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-100 dark:hover:border-purple-800 transition-all group cursor-pointer"
                >
                  <div className="h-12 w-12 bg-white dark:bg-neutral-700 rounded-lg flex items-center justify-center shadow-sm text-gray-500 dark:text-gray-300 group-hover:text-[#6A38C2] dark:group-hover:text-[#a04ee0]">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-[#6A38C2] dark:group-hover:text-[#a04ee0] transition-colors">{user?.profile?.resumeOriginalName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Click to view/download</p>
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 rounded-xl opacity-60">
                  <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center shadow-sm text-gray-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-gray-400 italic">No resume uploaded.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-4 md:p-8 shadow-xl">
          <h1 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-6">Applied Jobs</h1>
          <AppliedJobTable />
        </div>

      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </>
  );
}
