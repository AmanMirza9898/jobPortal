import React, { useEffect } from 'react'
import axios from 'axios';
import { JOB_API_END_POINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { setAllAdminJobs, setAdminPagination } from '../redux/jobSlice';

const useGetAllAdminJobs = (page = 1) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs?page=${page}&limit=10`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                    dispatch(setAdminPagination({
                        totalJobs: res.data.totalJobs,
                        totalPages: res.data.totalPages,
                        currentPage: res.data.currentPage
                    }));
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchAllAdminJobs();
    }, []);
}

export default useGetAllAdminJobs;