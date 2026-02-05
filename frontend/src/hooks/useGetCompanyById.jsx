import React, { useEffect } from 'react'
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';
import { setSingleCompany } from '@/redux/companySlice';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchSingleCompany();
    }, [companyId, dispatch]);
}

export default useGetCompanyById;