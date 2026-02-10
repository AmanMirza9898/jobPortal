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
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-10 md:my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/3">
              <Button
                onClick={() => SearchJobHandler(cat)}
                variant="outline"
                className="rounded-full cursor-pointer bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-200 hover:bg-[#6A38C2] dark:hover:bg-[#6A38C2] hover:text-white dark:hover:text-white hover:border-[#6A38C2] dark:hover:border-[#6A38C2] transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg px-6 py-2 text-sm font-medium w-full"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12 hover:bg-[#6A38C2] hover:text-white border-gray-300" />
        <CarouselNext className="hidden md:flex -right-12 hover:bg-[#6A38C2] hover:text-white border-gray-300" />
      </Carousel>
    </div>
  );
};
