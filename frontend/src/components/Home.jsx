import React from 'react'
import { HeroSection } from './HeroSection'
import { CategoryCarousel } from './CategoryCarousel'
import { LatestJobs } from "./LatestJobs"
import useGetAllJobs from '@/hooks/useGetAllJobs'






const Home = () => {
  useGetAllJobs();
  return (
    <>
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />

    </>
  )
}

export default Home