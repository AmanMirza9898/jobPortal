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
    <div>
      <div className='max-w-7xl mx-auto px-4'>
        <h1 className='font-bold text-xl my-5'>Applicants ({applications?.length})</h1>
        <ApplicantsTable />
      </div>
    </div>
  )
}
