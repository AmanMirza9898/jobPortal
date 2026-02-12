import React, { useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setCompanies } from '@/redux/companySlice'
import { useDispatch } from 'react-redux'

export const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompanies, setFilterCompanies] = useState(companies);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteHandler = async (companyId) => {
        try {
            const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, {
                withCredentials: true
            });
            if (res.data.success) {
                const updatedCompanies = companies.filter((company) => company._id !== companyId);
                dispatch(setCompanies(updatedCompanies));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company.name.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });

        setFilterCompanies(filteredCompany);

    }, [companies, searchCompanyByText]);

    return (
        <div className="overflow-hidden rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-lg p-6">
            <Table className="border-separate border-spacing-y-2">
                <TableCaption className="text-gray-500 font-medium mb-4">A list of your registered companies</TableCaption>
                <TableHeader>
                    <TableRow className="border-none hover:bg-transparent">
                        <TableHead className="w-[100px] pl-6 font-bold text-gray-700 dark:text-gray-300">Logo</TableHead>
                        <TableHead className="font-bold text-gray-700 dark:text-gray-300"> Company Name</TableHead>
                        <TableHead className="font-bold text-gray-700 dark:text-gray-300">Website</TableHead>
                        <TableHead className="font-bold text-gray-700 dark:text-gray-300">Location</TableHead>
                        <TableHead className="font-bold text-gray-700 dark:text-gray-300">Date</TableHead>
                        <TableHead className="text-right pr-6 font-bold text-gray-700 dark:text-gray-300">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompanies?.map((company) => (
                            <TableRow key={company._id} className="bg-white/60 dark:bg-neutral-900/60 hover:bg-white/80 dark:hover:bg-neutral-800 transition-colors rounded-xl shadow-sm border-none group">
                                <TableCell className="pl-6 py-4 first:rounded-l-xl">
                                    <Avatar className="h-12 w-12 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm bg-white dark:bg-white/10 p-1">
                                        <AvatarImage src={company.logo} className="object-cover rounded-full" />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#6A38C2] dark:group-hover:text-[#a04ee0] transition-colors">{company.name}</TableCell>
                                <TableCell className="text-gray-600 dark:text-gray-400">{company.website || "N/A"}</TableCell>
                                <TableCell className="text-gray-600 dark:text-gray-400">{company.location || "N/A"}</TableCell>
                                <TableCell className="text-gray-500 dark:text-gray-500 text-sm">{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right pr-6 last:rounded-r-xl">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 cursor-pointer transition-colors" /></PopoverTrigger>
                                        <PopoverContent className="w-32 p-0 border-gray-100 dark:border-gray-700 shadow-xl rounded-xl mr-6 bg-white dark:bg-[#1A1A1A] overflow-hidden">
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-3 w-full cursor-pointer px-4 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-[#6A38C2] dark:hover:text-[#a04ee0] transition-colors text-sm font-medium text-gray-700 dark:text-gray-300'>
                                                <Edit2 className='w-4 h-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={() => deleteHandler(company._id)} className='flex items-center gap-3 w-full cursor-pointer px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300'>
                                                <Trash2 className='w-4 h-4' />
                                                <span>Delete</span>
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
