import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';


const shortlistingStatus = ["Accepted", "Rejected"];


const ApplicantsTable = () => {
    const { applications } = useSelector((store) => store.application);
    console.log("ApplicantsTable applications:", applications);
    const statusHandler = async (id, status) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-lg p-6">
            <Table className="border-separate border-spacing-y-2">
                <TableCaption className="text-gray-500 font-medium mb-4">A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow className="border-none hover:bg-transparent">
                        <TableHead className="w-[200px] pl-6 font-bold text-gray-700 dark:text-gray-300">Full Name</TableHead>
                        <TableHead className="font-bold text-gray-700 dark:text-gray-300">Email</TableHead>
                        <TableHead className="font-bold text-gray-700 dark:text-gray-300">Contact</TableHead>
                        <TableHead className="font-bold text-gray-700 dark:text-gray-300">Resume</TableHead>
                        <TableHead className="font-bold text-gray-700 dark:text-gray-300">Date</TableHead>
                        <TableHead className="text-right pr-6 font-bold text-gray-700 dark:text-gray-300">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applications && applications.map((item) => (
                            <TableRow key={item._id} className="bg-white/60 dark:bg-neutral-900/60 hover:bg-white/80 dark:hover:bg-neutral-800 transition-colors rounded-xl shadow-sm border-none group">
                                <TableCell className="pl-6 py-4 first:rounded-l-xl font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#6A38C2] dark:group-hover:text-[#a04ee0] transition-colors">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="text-gray-600 dark:text-gray-400">{item?.applicant?.email}</TableCell>
                                <TableCell className="text-gray-600 dark:text-gray-400">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell className="text-blue-600 dark:text-blue-400">
                                    {
                                        item.applicant?.profile?.resume ? <a className="hover:underline cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span className="text-gray-500">NA</span>
                                    }
                                </TableCell>
                                <TableCell className="text-gray-500 dark:text-gray-500 text-sm">{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right pr-6 last:rounded-r-xl">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 cursor-pointer transition-colors" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 p-0 border-gray-100 dark:border-gray-700 shadow-xl rounded-xl mr-6 bg-white dark:bg-[#1A1A1A] overflow-hidden">
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(item._id, status)} key={index} className='flex w-full items-center px-4 py-3 cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-[#6A38C2] dark:hover:text-[#a04ee0] transition-colors text-sm font-medium text-gray-700 dark:text-gray-300'>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable;
