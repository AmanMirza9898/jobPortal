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
        <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/40 backdrop-blur-md shadow-lg p-6">
            <Table className="border-separate border-spacing-y-2">
                <TableCaption className="text-gray-500 font-medium">A list of your recent Posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow className="border-none hover:bg-transparent">
                        <TableHead className="font-bold text-gray-700">Company Name</TableHead>
                        <TableHead className="font-bold text-gray-700">Role</TableHead>
                        <TableHead className="font-bold text-gray-700">Date</TableHead>
                        <TableHead className='text-right font-bold text-gray-700'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <TableRow key={job._id} className="bg-white/60 hover:bg-white/80 transition-colors rounded-xl shadow-sm border-none group">
                                <TableCell className="font-medium text-gray-800 py-4 first:rounded-l-xl">{job?.company?.name}</TableCell>
                                <TableCell className="font-medium text-gray-700">{job?.title}</TableCell>
                                <TableCell className="font-medium text-gray-500">{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className='text-right last:rounded-r-xl'>
                                    <Popover>
                                        <PopoverTrigger className="hover:bg-gray-200 p-2 rounded-full transition-colors"><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32 bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl rounded-xl">
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}`)} className='flex items-center gap-2 w-full cursor-pointer p-2 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>

                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-full gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors mt-1'>
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
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
