import React, { useEffect, useState } from "react";
import { Job } from "./Job";
import { FilterCard } from "./filterCard";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Lock } from "lucide-react";


const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

export const Jobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-50">
        <div className="flex flex-col items-center justify-center w-[400px] p-8 bg-white rounded-2xl shadow-xl border border-gray-100">

          {/* Icon */}
          <div className="mb-6 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" x2="3" y1="12" y2="12" />
            </svg>
          </div>

          {/* Text */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in to view jobs</h1>
          <p className="text-center text-gray-500 mb-8 text-sm px-4 leading-relaxed">
            Join thousands of other job seekers and find your dream job today. It's free and takes less than a minute.
          </p>

          {/* Button */}
          <Button
            className="w-full h-12 bg-[#1A1A1A] hover:bg-[#2C2C2C] text-white rounded-xl font-medium transition-all duration-200"
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>



        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="max-w-7xl  mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {
            allJobs?.length <= 0 ? <span>Job Not Found</span> : (
              <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-3 gap-4">
                  {
                    allJobs?.map((job) => (
                      <div key={job?._id}>
                        <Job job={job} />
                      </div>
                    ))
                  }
                </div>

              </div>
            )

          }

        </div>
      </div>
    </div>
  );
};
