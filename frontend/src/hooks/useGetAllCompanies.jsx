import React, { useEffect } from 'react'
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { setCompanies, setCompanyPagination } from '@/redux/companySlice';

const useGetAllCompanies = (page = 1) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get?page=${page}&limit=10`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setCompanies(res.data.company));
                    dispatch(setCompanyPagination({
                        totalCompanies: res.data.totalCompanies,
                        totalPages: res.data.totalPages,
                        currentPage: res.data.currentPage
                    }));
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