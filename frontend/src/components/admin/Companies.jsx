import React, { useEffect } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { CompaniesTable } from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const Companies = () => {
    const [page, setPage] = useState(1);
    useGetAllCompanies(page);
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pagination } = useSelector(store => store.company);

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Registered Companies</h1>
                    <p className="text-gray-500 font-medium mt-1">Manage and track your organizations.</p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <Input
                        className="w-full md:w-64 rounded-2xl border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm focus:ring-2 focus:ring-[#6A38C2] transition-all"
                        placeholder="Search current page..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        onClick={() => navigate("/admin/companies/create")}
                        className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-2xl px-6 py-6 shadow-lg shadow-purple-500/20 font-bold transition-all hover:-translate-y-1 active:scale-95 whitespace-nowrap"
                    >
                        + New Company
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                <CompaniesTable />

                {/* Pagination Controls */}
                <div className="flex items-center justify-between bg-white dark:bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                    <div className="text-sm text-gray-500 font-medium">
                        Showing <span className="text-gray-900 dark:text-white">{(page - 1) * 10 + 1}</span> to <span className="text-gray-900 dark:text-white">{Math.min(page * 10, pagination?.totalCompanies || 0)}</span> of <span className="text-gray-900 dark:text-white">{pagination?.totalCompanies || 0}</span> companies
                    </div>
                    <div className="flex items-center gap-2">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="rounded-xl border-gray-200 dark:border-white/10"
                        >
                            <ChevronLeft size={16} className="mr-1" /> Previous
                        </Button>
                        <div className="flex items-center gap-1">
                            {[...Array(pagination?.totalPages || 0)].map((_, i) => (
                                <Button
                                    key={i}
                                    variant={page === i + 1 ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setPage(i + 1)}
                                    className={`w-10 h-10 rounded-xl font-bold ${page === i + 1 ? 'bg-[#6A38C2] hover:bg-[#5a2fb0] text-white' : ''}`}
                                >
                                    {i + 1}
                                </Button>
                            ))}
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setPage(prev => Math.min(prev + 1, pagination?.totalPages || 1))}
                            disabled={page === pagination?.totalPages || pagination?.totalPages === 0}
                            className="rounded-xl border-gray-200 dark:border-white/10"
                        >
                            Next <ChevronRight size={16} className="ml-1" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
