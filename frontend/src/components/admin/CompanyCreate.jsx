import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { ArrowLeft } from 'lucide-react'

export const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const RegisterNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }

        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='flex items-center justify-center min-h-[90vh] px-4'>
            <div className='max-w-4xl w-full bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8'>
                <div className='mb-10'>
                    <div className='flex items-center gap-4 mb-2'>
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => navigate("/admin/companies")}>
                            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </Button>
                        <h1 className='font-bold text-2xl text-gray-900 dark:text-gray-100'>Your Company Name</h1>
                    </div>
                    <p className='text-gray-500 dark:text-gray-400 text-sm ml-14'>What would you like to give your company name? You can change this later.</p>
                </div>

                <div className='space-y-2 ml-0 sm:ml-14'>
                    <Label className="text-gray-700 dark:text-gray-300 font-medium">Company Name</Label>
                    <Input
                        type='text'
                        className='h-12 rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-black/50 text-gray-900 dark:text-gray-100 focus:ring-[#6A38C2] focus:border-[#6A38C2] transition-all'
                        placeholder='JobSync, Google, Microsoft etc.'
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                <div className='flex flex-col sm:flex-row items-center gap-4 mt-8 ml-0 sm:ml-14 w-full sm:w-auto'>
                    <Button variant='outline' className='rounded-xl border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium w-full sm:w-auto hover:text-gray-900 dark:hover:text-white transition-colors h-11 order-2 sm:order-1' onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button className='rounded-xl bg-[#6A38C2] hover:bg-[#5b30a6] text-white shadow-lg hover:shadow-purple-500/20 font-medium w-full sm:w-auto transition-all h-11 order-1 sm:order-2' onClick={RegisterNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}
