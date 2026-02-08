import React, { useEffect } from "react";
import { LatesJobCards } from "./LatesJobCards";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import lockGif from "@/assets/lock.gif";

export const Browse = () => {
  useGetAllJobs();
  const { allJobs, loading } = useSelector(store => store.job);
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
    <>
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">Search Results ({allJobs.length})</h1>
        <div className="grid grid-cols-3 gap-4">
          {
            loading ? <span>Loading...</span> : allJobs.map((job, index) => {
              return <LatesJobCards key={job._id} job={job} index={index} />;
            })
          }
        </div>
      </div>
    </>
  );
};
