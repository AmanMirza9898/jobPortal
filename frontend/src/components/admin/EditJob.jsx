import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2, ArrowLeft } from 'lucide-react'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

const EditJob = () => {
    useGetAllCompanies();
    const params = useParams();
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (e) => {
        setInput({ ...input, companyId: e.target.value });
    };

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${JOB_API_END_POINT}/get/${params.id}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    const job = res.data.job;
                    setInput({
                        title: job.title,
                        description: job.description,
                        requirements: job.requirements.join(","),
                        salary: job.salary,
                        location: job.location,
                        jobType: job.jobType,
                        experience: job.experienceLevel,
                        position: job.position,
                        companyId: job.company?._id || "" // Handle populated company object
                    });
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch job details.");
            } finally {
                setLoading(false);
            }
        }
        fetchJob();
    }, [params.id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen pt-20 px-4 flex justify-center'>
            <div className='max-w-4xl w-full'>
                <form onSubmit={submitHandler} className="bg-white dark:bg-[#1A1A1A] rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8">

                    <div className='flex items-center gap-4 mb-8'>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/admin/jobs")}
                            className='rounded-full w-10 h-10 p-0 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                        >
                            <ArrowLeft className='w-5 h-5 text-gray-600 dark:text-gray-300' />
                        </Button>
                        <h1 className='font-bold text-2xl text-gray-900 dark:text-white'>Edit Job</h1>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label className="text-gray-700 dark:text-gray-300 font-medium">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/40 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 dark:text-gray-300 font-medium">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/40 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 dark:text-gray-300 font-medium">Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/40 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 dark:text-gray-300 font-medium">Salary</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/40 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 dark:text-gray-300 font-medium">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/40 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 dark:text-gray-300 font-medium">Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/40 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 dark:text-gray-300 font-medium">Experience Level</Label>
                            <Input
                                type="number"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/40 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-700 dark:text-gray-300 font-medium">No of Position</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/40 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div className='col-span-2'>
                                    <Label className="text-gray-700 dark:text-gray-300 font-medium">Select Company</Label>
                                    <select
                                        onChange={selectChangeHandler}
                                        value={input.companyId}
                                        className='flex h-10 w-full items-center justify-between rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black/40 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#6A38C2] disabled:cursor-not-allowed disabled:opacity-50'
                                    >
                                        <option value="">Select a Company</option>
                                        {
                                            companies.map((company) => {
                                                return (
                                                    <option key={company._id} value={company?._id}>{company.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            )
                        }
                    </div>
                    {
                        loading ? <Button disabled className="w-full my-4 rounded-xl bg-[#6A38C2]/70 text-white"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-xl shadow-lg transition-all duration-300">Update Job</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default EditJob
