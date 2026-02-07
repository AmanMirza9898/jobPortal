import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const category = [
  "Frontend Developer",
  "Backend Devloper",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery, setLoading } from "@/redux/jobSlice";

export const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SearchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    dispatch(setLoading(true));
    navigate('/browse')
  }
  return (
    <>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg-basis-1/3">
              <Button onClick={() => SearchJobHandler(cat)} className="border border-gray-400 text-gray-800 rounded-full">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};
