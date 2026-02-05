import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

export const Job = ({ job }) => {
  const navigate = useNavigate();
  const jobId = job?._id;
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{job?.createdAt?.split("T")[0]}</p>
        <Button
          variant="outline"
          className="rounded-full hover:bg-gray-100 border border-gray-300"
          size="icon"
        >
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2 ">
        {/* <Button className=""> */}
        <Avatar className="">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        {/* </Button> */}

        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
          {job?.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4 ">
        <Badge className="text-blue-700 font-bold border border-gray-400"> {job?.positions} Positions</Badge>
        <Badge className="text-[#F83002] font-bold border-gray-400">{job?.jobType}</Badge>
        <Badge className="text-[#7209B7] font-bold border-gray-400"> {job?.salary} LPA</Badge>
      </div>

      <div className="mt-4 gap-4 flex item-center">
        <Button onClick={() => navigate(`/description/${jobId}`)} className="border border-gray-400 rounded-full cursor-pointer">Details</Button>
        <Button className="border border-gray-400 rounded-full cursor-pointer bg-[#7209B7] hover:bg-[#60099a] text-white">Save For Later</Button>
      </div>
    </div>
  );
};
