import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

export const Job = ({ job }) => {
  const navigate = useNavigate();
  const jobId = job?._id;

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  }

  return (
    <div className="p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-gray-800 cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400 font-medium">
          {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Avatar className="h-12 w-12 border border-gray-100 dark:border-gray-700">
          <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
        </Avatar>
        <div>
          <h1 className="font-semibold text-lg text-gray-900 dark:text-gray-100 group-hover:text-[#6A38C2] transition-colors">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{job?.location}</p>
        </div>
      </div>

      <div className="mb-4">
        <h1 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-2 leading-tight">{job?.title}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {job?.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Badge className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-bold border border-blue-100 dark:border-blue-800 px-3 py-1 rounded-md">
          {job?.positions} Positions
        </Badge>
        <Badge className="bg-red-50 dark:bg-red-900/20 text-[#F83002] dark:text-[#ff4b2b] font-bold border border-red-100 dark:border-red-800 px-3 py-1 rounded-md">
          {job?.jobType}
        </Badge>
        <Badge className="bg-purple-50 dark:bg-purple-900/20 text-[#7209B7] dark:text-[#a04ee0] font-bold border border-purple-100 dark:border-purple-800 px-3 py-1 rounded-md">
          {job?.salary} LPA
        </Badge>
      </div>

      <div>
        <Button
          onClick={() => navigate(`/description/${jobId}`)}
          className="w-full bg-white dark:bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#6A38C2] hover:text-white hover:border-[#6A38C2] transition-colors font-medium rounded-lg h-10"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};
