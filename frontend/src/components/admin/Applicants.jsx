import React, { useEffect } from 'react'
import ApplicantsTable from './ApplicantsTable'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplications } from '@/redux/applicationSlice'

export const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applications } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
        dispatch(setAllApplications(res.data.job.applications));
      } catch (error) {
        console.log(error);
      }
    }
    fetchApplicants();
  }, []);
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Applicants ({applications?.length})</h1>
        <p className="text-gray-500 font-medium mt-1">Review and manage candidates for this position.</p>
      </div>
      <ApplicantsTable />
    </div>
  )
}
