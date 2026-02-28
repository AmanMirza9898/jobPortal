import React, { useEffect, useRef } from 'react'
import axios from 'axios';
import { JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs, setLoading } from '../redux/jobSlice';

const POLL_INTERVAL_MS = 15000; // 15 seconds

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    const isFirstFetch = useRef(true);

    useEffect(() => {
        const fetchAllJobs = async (showLoader = false) => {
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

        // First fetch shows the loading skeleton
        fetchAllJobs(true);
        isFirstFetch.current = false;

        // Background polling every 15s — silent refresh
        const intervalId = setInterval(() => fetchAllJobs(false), POLL_INTERVAL_MS);

        // Re-fetch instantly when user returns to this tab
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                fetchAllJobs(false);
            }
        };

        // Re-fetch when browser window gains focus
        const handleFocus = () => fetchAllJobs(false);

        // Re-fetch when internet comes back online
        const handleOnline = () => fetchAllJobs(false);

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', handleFocus);
        window.addEventListener('online', handleOnline);

        // Cleanup everything on unmount
        return () => {
            clearInterval(intervalId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('online', handleOnline);
        };
    }, [searchedQuery, dispatch]);
}

export default useGetAllJobs;