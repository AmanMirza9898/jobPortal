import React, { useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);
    return (
        <div className="overflow-hidden rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-lg p-6">
            <Table className="border-separate border-spacing-y-2">
                <TableCaption className="text-gray-500 font-medium">A list of your recent Posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow className="border-none hover:bg-transparent">
                        <TableHead className="font-bold text-gray-700 dark:text-gray-300">Company Name</TableHead>
                        <TableHead className="font-bold text-gray-700 dark:text-gray-300">Role</TableHead>
                        <TableHead className="font-bold text-gray-700 dark:text-gray-300">Date</TableHead>
                        <TableHead className="font-bold text-gray-700 dark:text-gray-300">Location</TableHead>
                        <TableHead className="font-bold text-gray-700 dark:text-gray-300">Salary</TableHead>
                        <TableHead className='text-right font-bold text-gray-700 dark:text-gray-300'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <TableRow key={job._id} className="bg-white/60 dark:bg-neutral-900/60 hover:bg-white/80 dark:hover:bg-neutral-800 transition-colors rounded-xl shadow-sm border-none group">
                                <TableCell className="font-medium text-gray-800 dark:text-gray-200 py-4 first:rounded-l-xl">{job?.company?.name}</TableCell>
                                <TableCell className="font-medium text-gray-700 dark:text-gray-300">{job?.title}</TableCell>
                                <TableCell className="font-medium text-gray-500 dark:text-gray-400">{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="font-medium text-gray-500 dark:text-gray-400">{job?.location}</TableCell>
                                <TableCell className="font-medium text-gray-500 dark:text-gray-400">{job?.salary} LPA</TableCell>
                                <TableCell className='text-right last:rounded-r-xl'>
                                    <Popover>
                                        <PopoverTrigger className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full transition-colors"><MoreHorizontal className="text-gray-500 dark:text-gray-400" /></PopoverTrigger>
                                        <PopoverContent className="w-32 p-2 bg-white/90 dark:bg-black/90 backdrop-blur-md border border-gray-100 dark:border-gray-800 shadow-xl rounded-xl">
                                            <div className="flex flex-col gap-2">
                                                <div onClick={() => navigate(`/admin/jobs/${job._id}`)} className='flex items-center gap-2 w-full cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-200 transition-colors'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>

                                                <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-full gap-2 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-200 transition-colors'>
                                                    <Eye className='w-4' />
                                                    <span>Applicants</span>
                                                </div>
                                            </div>
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
