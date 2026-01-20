import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function JobDescription() {
  const isApplied = false;
  return (
    <>
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl ">Frontend Developer</h1>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mt-4">
              <Badge className="text-blue-700 font-bold border border-gray-400">
                {" "}
                12 Positions
              </Badge>
              <Badge className="text-[#F83002] font-bold border-gray-400">
                Part time
              </Badge>
              <Badge className="text-[#7209B7] font-bold border-gray-400">
                {" "}
                12 LPA
              </Badge>
            </div>
          </div>
          <Button
            className={` text-white bg-black cursor-pointer ${
              isApplied ? "bg-gray-500 cursor-not-allowed" : ""
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          Job Description
        </h1>
        <div className='my-4'>
          <h1 className="font-bold my-1">
            Role:{" "}
            <span className="pl-4 text-gray-800 font-normal">
              Frontend Developer
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location:{" "}
            <span className="pl-4  text-gray-800 font-normal">Hydrabad</span>
          </h1>
          <h1 className="font-bold my-1">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
              consequuntur!
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-800">2 yrs</span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">12LPA</span>
          </h1>
          <h1 className="font-bold my-1">
            Total Application:{" "}
            <span className="pl-4 font-normal text-gray-800">
              Frontend Developer
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">17-07-2026</span>
          </h1>
        </div>
      </div>
    </>
  );
}
