import React, { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import UpdateProfileDialog from "../UpdateProfileDialog";
import { useSelector } from "react-redux";

const AdminProfile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);

    return (
        <div className="max-w-4xl mx-auto mt-4 md:mt-20 px-4 md:px-0">
            {/* Admin Profile Card */}
            <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-4 md:p-8 shadow-xl relative overflow-hidden">
                {/* Decorative Gradient Background (Top) */}
                <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 z-0"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start pt-12 px-2">
                    {/* Admin Info */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">
                        <Avatar className="h-32 w-32 border-4 border-white dark:border-neutral-800 shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300">
                            <AvatarImage
                                src={user?.profile?.profilePhoto}
                                alt="profile"
                                className="object-cover"
                            />
                        </Avatar>

                        <div className="mt-2 text-center md:text-left flex-1">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                                <h1 className="font-extrabold text-3xl text-gray-900 dark:text-gray-100">{user?.fullname}</h1>
                                <span className="bg-[#6A38C2]/10 text-[#6A38C2] text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider w-fit mx-auto md:mx-0">
                                    {user?.role}
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 font-medium mb-4 max-w-lg">
                                {user?.profile?.bio || "Manage your recruitment activities and company profile."}
                            </p>

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
            </div>

            {/* Admin Stats or other related info can go here later */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/40 dark:bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/20 dark:border-white/10 shadow-lg">
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Companies</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Manage</h3>
                    <Button variant="link" className="p-0 text-[#6A38C2] h-auto mt-2" onClick={() => window.location.href = '/admin/companies'}>Go to Companies</Button>
                </div>
                <div className="bg-white/40 dark:bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/20 dark:border-white/10 shadow-lg">
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Active Jobs</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Post New</h3>
                    <Button variant="link" className="p-0 text-[#6A38C2] h-auto mt-2" onClick={() => window.location.href = '/admin/jobs'}>Go to Jobs</Button>
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default AdminProfile;
