import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2, ArrowLeft, Building2, ChevronDown } from 'lucide-react'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

const PostJob = () => {
    useGetAllCompanies();
    const [input, setInput] = useState({
        title: "",
        description: "",
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
    const [open, setOpen] = useState(false);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectCompanyHandler = (company) => {
        setInput({ ...input, companyId: company._id });
        setOpen(false);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
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
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    const selectedCompany = companies.find((c) => c._id === input.companyId);

    return (
        <div className='flex items-center justify-center min-h-[90vh] px-4 py-10'>
            <div className='max-w-4xl w-full bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8'>
                <div className='mb-10'>
                    <div className='flex items-center gap-4 mb-2'>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            onClick={() => navigate("/admin/jobs")}
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </Button>
                        <h1 className='font-bold text-2xl text-gray-900 dark:text-gray-100'>Post New Job</h1>
                    </div>
                    <p className='text-gray-500 dark:text-gray-400 text-sm ml-14'>Fill in the details below to create a new job opening.</p>
                </div>

                <form onSubmit={submitHandler}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 ml-0 sm:ml-14'>
                        <div className='space-y-2'>
                            <Label className="text-gray-700 dark:text-gray-300 font-medium">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                placeholder="Software Engineer, Product Manager etc."
                                value={input.title}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-black/50 text-gray-900 dark:text-gray-100 focus:ring-[#6A38C2] focus:border-[#6A38C2] transition-all"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className="text-gray-700 dark:text-gray-300 font-medium">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                placeholder="Describe the role and responsibilities"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-black/50 text-gray-900 dark:text-gray-100 focus:ring-[#6A38C2] focus:border-[#6A38C2] transition-all"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className="text-gray-700 dark:text-gray-300 font-medium">Salary (LPA)</Label>
                            <Input
                                type="number"
                                name="salary"
                                placeholder="e.g. 12"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-black/50 text-gray-900 dark:text-gray-100 focus:ring-[#6A38C2] focus:border-[#6A38C2] transition-all"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className="text-gray-700 dark:text-gray-300 font-medium">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                placeholder="City, Remote, etc."
                                value={input.location}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-black/50 text-gray-900 dark:text-gray-100 focus:ring-[#6A38C2] focus:border-[#6A38C2] transition-all"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className="text-gray-700 dark:text-gray-300 font-medium">Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                placeholder="Full-time, Part-time, Internship"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-black/50 text-gray-900 dark:text-gray-100 focus:ring-[#6A38C2] focus:border-[#6A38C2] transition-all"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className="text-gray-700 dark:text-gray-300 font-medium">Experience Level (Years)</Label>
                            <Input
                                type="number"
                                name="experience"
                                placeholder="e.g. 2"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-black/50 text-gray-900 dark:text-gray-100 focus:ring-[#6A38C2] focus:border-[#6A38C2] transition-all"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label className="text-gray-700 dark:text-gray-300 font-medium">No of Position</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="h-11 rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-black/50 text-gray-900 dark:text-gray-100 focus:ring-[#6A38C2] focus:border-[#6A38C2] transition-all"
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div className='md:col-span-2 space-y-2'>
                                    <Label className="text-gray-700 dark:text-gray-300 font-medium">Select Company</Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={`h-11 w-full justify-between rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black/50 px-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-normal ${!input.companyId ? 'text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Building2 size={16} className={`${input.companyId ? 'text-[#6A38C2]' : 'text-gray-400'}`} />
                                                    <span>{selectedCompany ? selectedCompany.name : "Select a Company"}</span>
                                                </div>
                                                <ChevronDown size={16} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-xl shadow-2xl">
                                            <div className="max-h-[250px] overflow-y-auto space-y-1 custom-scrollbar">
                                                {companies.map((company) => (
                                                    <div
                                                        key={company._id}
                                                        onClick={() => selectCompanyHandler(company)}
                                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${input.companyId === company._id
                                                            ? 'bg-purple-50 dark:bg-purple-900/20 text-[#6A38C2] dark:text-purple-300'
                                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                            }`}
                                                    >
                                                        <div className={`p-1.5 rounded-md ${input.companyId === company._id ? 'bg-[#6A38C2] text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
                                                            <Building2 size={14} />
                                                        </div>
                                                        <span className="font-medium text-sm">{company.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            )
                        }
                    </div>

                    <div className='mt-10 ml-0 sm:ml-14'>
                        {
                            loading ? (
                                <Button className="w-full h-11 rounded-xl bg-[#6A38C2] text-white flex items-center justify-center">
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="w-full h-11 rounded-xl bg-[#6A38C2] hover:bg-[#5b30a6] text-white shadow-lg hover:shadow-purple-500/20 font-medium transition-all"
                                >
                                    Post New Job
                                </Button>
                            )
                        }
                        {
                            companies.length === 0 && (
                                <p className='text-xs text-red-600 font-bold text-center mt-4'>
                                    *Please register a company first, before posting a job
                                </p>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostJob
