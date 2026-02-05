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

                        <Button onClick={()=> navigate("/admin/companies/create") } className='border bg-black text-white cursor-pointer hover:bg-black/80'>
                            New Company
                        </Button>
                    </div>
                    <CompaniesTable />

                </div>
            </div>

        </>
    )
}
