import React from 'react'
import { LatesJobCards } from './LatesJobCards'
import { useSelector } from 'react-redux'
import { JobSkeleton } from './JobSkeleton'


const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8]

export const LatestJobs = () => {
  const { allJobs, loading } = useSelector(store => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-5">
      <h1 className="text-4xl font-bold dark:text-gray-100"> <span className="text-[#6A38C2] dark:text-[#a04ee0]">Latest & Top </span>Job Openings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {
          loading ? Array(6).fill("").map((_, index) => <JobSkeleton key={index} />) :
            allJobs.length <= 0 ? <p className="dark:text-gray-400">No Jobs Found Please login first!</p> : allJobs?.slice(0, 6).map((job, index) => <LatesJobCards key={job._id} job={job} index={index} />)
        }
      </div>
    </div>
  )
}
