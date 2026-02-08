import React, { useEffect, useState } from "react";
import { LatesJobCards } from "./LatesJobCards";
import { FilterCard } from "./filterCard";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Lock } from "lucide-react";
import lockGif from "@/assets/lock.gif";
import { motion } from "framer-motion";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

export const Jobs = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          (job.title || "").toLowerCase().includes(searchedQuery.toLowerCase()) ||
          (job.description || "").toLowerCase().includes(searchedQuery.toLowerCase()) ||
          (job.location || "").toLowerCase().includes(searchedQuery.toLowerCase()) ||
          (job.salary || "").toString().toLowerCase().includes(searchedQuery.toLowerCase())
        );
      })
      setFilterJobs(filteredJobs)
    } else {
      setFilterJobs(allJobs)
    }

  }, [allJobs, searchedQuery])
  const [filteJobs, setFilterJobs] = useState([]);
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex flex-col items-center justify-center w-[550px] min-h-[400px] p-8 bg-white rounded-2xl shadow-xl border border-gray-100">

          {/* Icon */}
          <div className="mb-6 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
            <img src={lockGif} alt="lock-animation" className="w-12 h-12" />
          </div>

          {/* Text */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in to view jobs</h1>
          <p className="text-center text-gray-500 mb-8 text-sm px-4 leading-relaxed">
            Join thousands of other job seekers and find your dream job today. It's free and takes less than a minute.
          </p>

          {/* Button */}
          <Button
            className="w-full h-12 bg-[#1A1A1A] hover:bg-[#2C2C2C] text-white rounded-xl font-medium transition-all duration-200"
            onClick={() => navigate("/login", { state: { from: location.pathname } })}
          >
            Get Started
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <div className="w-full md:w-[20%]">
            <FilterCard />
          </div>

          <div className="flex-1 h-[88vh] overflow-y-auto pb-5 custom-scrollbar">
            {
              allJobs?.length <= 0 || filteJobs?.length <= 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white rounded-lg shadow-sm border border-gray-100">
                  <img src="https://illustrations.popsy.co/gray/crashed-error.svg" alt="No jobs found" className="w-48 h-48 mb-4 opacity-50 grayscale" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">No Jobs Found</h2>
                  <p className="text-gray-500">We couldn't find any jobs matching your search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {
                    filteJobs?.map((job, index) => (
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        key={job?._id}>
                        <LatesJobCards job={job} index={index} />
                      </motion.div>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};
