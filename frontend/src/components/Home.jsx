import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { HeroSection } from './HeroSection'
import { CategoryCarousel } from './CategoryCarousel'
import { JobCategoryMarquee } from './JobCategoryMarquee'
import { LatestJobs } from "./LatestJobs"
import useGetAllJobs from '@/hooks/useGetAllJobs'
import FAQ from './FAQ'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies');
    }
  }, [user, navigate]);

  if (user?.role === 'recruiter') return null; // Prevent showing student home to recruiters
  return (
    <>
      <HeroSection />
      <CategoryCarousel />
      <JobCategoryMarquee />
      {user ? (
        <LatestJobs />
      ) : (
        <div className="py-20 text-center px-4 sm:px-0">
          <div className="max-w-xl mx-auto p-8 bg-linear-to-br from-purple-50 via-white to-purple-50 dark:bg-none dark:bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Explore Latest Jobs
            </h2>
            <p className="text-gray-500 dark:text-gray-300 mb-6">
              Please login to view the latest job openings tailored just for you.
            </p>
          </div>
        </div>
      )}
      <FAQ />
    </>
  )
}

export default Home