import React, { useEffect } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '@/redux/jobSlice'
import { AdminJobsTable } from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

export const Jobs = () => {
    useGetAllAdminJobs();

    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input]);
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Job Listings</h1>
                    <p className="text-gray-500 font-medium mt-1">Track and manage your posted opportunities.</p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <Input
                        className="w-full md:w-64 rounded-2xl border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm focus:ring-2 focus:ring-[#6A38C2] transition-all"
                        placeholder="Filter by role or name..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        onClick={() => navigate("/admin/jobs/create")}
                        className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-2xl px-6 py-6 shadow-lg shadow-purple-500/20 font-bold transition-all hover:-translate-y-1 active:scale-95 whitespace-nowrap"
                    >
                        + Post New Job
                    </Button>
                </div>
            </div>

            <AdminJobsTable />
        </div>
    )
}
