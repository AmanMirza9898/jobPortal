import React, { useEffect } from 'react'
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { setCompanies } from '@/redux/companySlice';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setCompanies(res.data.company));
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchCompany();
    }, []);
}

export default useGetAllCompanies;