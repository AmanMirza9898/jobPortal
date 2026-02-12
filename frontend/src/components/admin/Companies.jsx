import React, { useEffect } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { CompaniesTable } from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

export const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);
    return (
        <div className="max-w-7xl mx-auto pt-4 md:pt-20 px-4 md:px-0">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Input
                        className="w-full md:w-80 rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-white/5 text-gray-800 dark:text-white shadow-sm focus:ring-[#6A38C2] focus:border-[#6A38C2] dark:focus:border-[#6A38C2] transition-all duration-300"
                        placeholder="Filter by name..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <Button
                    onClick={() => navigate("/admin/companies/create")}
                    className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white rounded-xl px-6 py-2 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 w-full md:w-auto"
                >
                    New Company
                </Button>
            </div>

            <div>
                <CompaniesTable />
            </div>
        </div>
    )
}
