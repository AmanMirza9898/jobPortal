import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { HeroSection } from './HeroSection'
import { CategoryCarousel } from './CategoryCarousel'
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
  return (
    <>
      <HeroSection />
      {user ? (
        <LatestJobs />
      ) : (
        <div className="py-20 text-center">
          <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Explore Latest Jobs
            </h2>
            <p className="text-gray-500 mb-6">
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