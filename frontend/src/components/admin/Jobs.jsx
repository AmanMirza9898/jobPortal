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
        <>

            <div>
                <div className='  max-w-6xl mx-auto my-10'>
                    <div className='flex items-center justify-between my-5'>
                        <Input
                            className='w-fit'
                            placeholder='Filter by name'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />

                        <Button onClick={() => navigate("/admin/jobs/create")} className='border bg-black text-white cursor-pointer hover:bg-black/80'>
                            New Jobs
                        </Button>
                    </div>
                    <AdminJobsTable />

                </div>
            </div>

        </>
    )
}
