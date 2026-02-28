import React, { useEffect } from 'react'
import axios from 'axios';
import { JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs, setLoading } from '../redux/jobSlice';

const POLL_INTERVAL_MS = 30000; // 30 seconds

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        // Initial fetch — shows loading skeleton
        const fetchAllJobs = async (showLoader = true) => {
            try {
                if (showLoader) dispatch(setLoading(true));
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (err) {
                console.log(err);
            } finally {
                if (showLoader) dispatch(setLoading(false));
            }
        }

        // Fetch immediately on mount / query change (with loader)
        fetchAllJobs(true);

        // Background polling every 30s — silent, no loading spinner
        const intervalId = setInterval(() => fetchAllJobs(false), POLL_INTERVAL_MS);

        // Cleanup on unmount or before next effect run
        return () => clearInterval(intervalId);
    }, [searchedQuery, dispatch]);
}

export default useGetAllJobs;