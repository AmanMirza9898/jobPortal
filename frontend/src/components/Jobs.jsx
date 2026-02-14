import React, { useEffect, useState } from "react";
import { LatesJobCards } from "./LatesJobCards";
import { FilterCard } from "./FilterCard";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Lock, SlidersHorizontal, X } from "lucide-react";
import lockGif from "@/assets/lock.gif";
import { motion, AnimatePresence } from "framer-motion";
import { JobSkeleton } from "./JobSkeleton";
import LazyImage from './shared/LazyImage';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const Jobs = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery, loading } = useSelector(store => store.job);
  const [filteJobs, setFilterJobs] = useState([]);
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

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

  if (!user) {
    return (
      <div className="flex items-center justify-center w-full min-h-[50vh] py-10">
        <div className="flex flex-col items-center justify-center w-[90%] md:w-[550px] min-h-[400px] p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
          <div className="mb-6 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <img src={lockGif} alt="lock-animation" className="w-12 h-12" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Sign in to view jobs</h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm px-4 leading-relaxed">
            Join thousands of other job seekers and find your dream job today. It's free and takes less than a minute.
          </p>
          <Button
            className="w-full h-12 bg-[#1A1A1A] dark:bg-white hover:bg-[#2C2C2C] dark:hover:bg-gray-200 text-white dark:text-black rounded-xl font-medium transition-all duration-200"
            onClick={() => navigate("/login", { state: { from: location.pathname } })}
          >
            Get Started
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-8 pb-20 md:pb-10">
      {/* Mobile Filter Trigger */}
      <div className="md:hidden mb-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 rounded-xl border-purple-200 dark:border-purple-900/50 bg-white dark:bg-neutral-900 text-purple-600 dark:text-purple-400 font-bold shadow-sm">
              <SlidersHorizontal size={18} />
              Filter Jobs
              {searchedQuery && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-[10px] text-white">
                  1
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-0 border-none bg-transparent shadow-none">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 overflow-y-auto max-h-[80vh] border border-gray-100 dark:border-neutral-800 shadow-2xl">
              <DialogHeader className="flex flex-row items-center justify-between mb-2">
                <DialogTitle className="text-xl font-black dark:text-white">Applied Filters</DialogTitle>
                <button onClick={() => setOpen(false)} className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
                  <X size={20} className="text-gray-500" />
                </button>
              </DialogHeader>
              <div className="mt-4">
                <FilterCard />
              </div>
              <Button onClick={() => setOpen(false)} className="w-full mt-6 bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-bold rounded-xl py-6">
                Show {filteJobs.length} Results
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden md:block w-full md:w-[20%]">
          <FilterCard />
        </div>

        {/* Jobs Feed */}
        <div className="flex-1 h-auto md:h-[88vh] overflow-y-auto custom-scrollbar">
          {
            loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill("").map((_, index) => <JobSkeleton key={index} />)}
              </div>
            ) :
              allJobs?.length <= 0 || filteJobs?.length <= 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white dark:bg-neutral-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="w-48 h-48 mb-6 opacity-40 grayscale animate-pulse">
                    <LazyImage src="https://illustrations.popsy.co/gray/crashed-error.svg" alt="No jobs found" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-2 tracking-tight">No Matches Found</h2>
                  <p className="text-gray-500 dark:text-neutral-400 font-medium">Try adjusting your filters to find more opportunities.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {
                      filteJobs?.map((job, index) => (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          layout
                          key={job?._id}>
                          <LatesJobCards job={job} index={index} />
                        </motion.div>
                      ))
                    }
                  </AnimatePresence>
                </div>
              )
          }
        </div>
      </div>
    </div>
  );
};
