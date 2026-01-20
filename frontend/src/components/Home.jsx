import React from 'react'
import { HeroSection } from './HeroSection'
import {CategoryCarousel} from './CategoryCarousel'
import {LatestJobs} from "./LatestJobs"






const Home = () => {
  return (
    <>
    <HeroSection/>
    <CategoryCarousel/>
    <LatestJobs/>
   
    </>
  )
}

export default Home