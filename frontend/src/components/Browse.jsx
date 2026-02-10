import React, { useEffect, useState } from "react";
import { LatesJobCards } from "./LatesJobCards";
import { JobSkeleton } from './JobSkeleton';
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import lockGif from "@/assets/lock.gif";
import LazyImage from './shared/LazyImage';
import { Search } from "lucide-react";

export const Browse = () => {
  useGetAllJobs();
  const [input, setInput] = useState("");
  const { allJobs, loading, searchedQuery } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Force scroll to top on page load
    return () => {
      dispatch(setSearchedQuery(""));
    }
  }, [])

  useEffect(() => {
    setInput(searchedQuery);
  }, []);

  const setQueryHandler = (query) => {
    setInput(query);
    dispatch(setSearchedQuery(query));
  }

  if (!user) {
    // ... (keep existing login check code) gets skipped by replacement range if I am careful
    // wait, I need to target the return block if I want to insert UI.
    // The previous range was 14-19. I need to be careful.
    // Let me rewrite the component beginning to include state and imports.
    // But I must not delete the `if (!user)` block.
    // I'll replace lines 14-18 with the new state and logic.
  }

  // Refined Strategy:
  // 1. Update imports (if needed, but Search is in lucide-react which might need import).
  // 2. Insert state and logic.
  // 3. Insert UI.

  // Let's do imports first separately if needed.
  // Search is NOT imported in Browse.jsx.


  useEffect(() => {
    window.scrollTo(0, 0); // Force scroll to top on page load
    return () => {
      dispatch(setSearchedQuery(""));
    }
  }, [])

  if (!user) {
    return (
      <div className="flex items-center justify-center w-full min-h-[50vh] py-10">
        <div className="flex flex-col items-center justify-center w-[90%] md:w-[550px] min-h-[400px] p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">

          {/* Icon */}
          <div className="mb-6 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <img src={lockGif} alt="lock-animation" className="w-12 h-12" />
          </div>

          {/* Text */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Sign in to view jobs</h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm px-4 leading-relaxed">
            Join thousands of other job seekers and find your dream job today. It's free and takes less than a minute.
          </p>

          {/* Button */}
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
    <div className="max-w-7xl mx-auto mt-5 px-4 md:px-0 pb-20">
      <div className="flex flex-col gap-4 my-10">
        <h1 className="font-bold text-xl">Search Results ({allJobs.length})</h1>
        <div className="flex w-full md:w-[60%] shadow-lg border border-gray-200 dark:border-gray-800 pl-3 rounded-full items-center gap-4 mx-auto bg-white dark:bg-neutral-900 transition-all focus-within:ring-2 ring-purple-500/20">
          <input
            type="text"
            placeholder="Search for jobs..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              dispatch(setSearchedQuery(e.target.value));
            }}
            className="outline-none border-none w-full text-lg text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent py-3"
          />
          <Button onClick={() => dispatch(setSearchedQuery(input))} className="rounded-r-full bg-[#6A38C2] hover:bg-[#5b30a6] h-full py-6 px-6">
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          loading ? (
            Array(6).fill("").map((_, index) => <JobSkeleton key={index} />)
          ) : allJobs.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 animate-fadeIn">
              <div className="w-48 h-48 mb-6 opacity-60 grayscale">
                <LazyImage src="https://illustrations.popsy.co/gray/crashed-error.svg" alt="No jobs found" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">No Jobs Found</h2>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">We couldn't find any jobs matching your search "{allJobs.searchedQuery || 'criteria'}". Try adjusting your filters or check back later.</p>
            </div>
          ) : (
            allJobs.map((job, index) => <LatesJobCards key={job._id} job={job} index={index} />)
          )
        }
      </div>
    </div>
  );
};
