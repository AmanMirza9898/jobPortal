import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function JobDescription() {
  const isApplied = false;
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.jobs));
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchSingleJob();
  }, [jobId, dispatch, singleJob?._id]);
  return (
    <>
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl ">{singleJob?.title}</h1>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mt-4">
              <Badge className="text-blue-700 font-bold border border-gray-400">
                {" "}
                {singleJob?.positions} Positions
              </Badge>
              <Badge className="text-[#F83002] font-bold border-gray-400">
                {singleJob?.jobType}
              </Badge>
              <Badge className="text-[#7209B7] font-bold border-gray-400">
                {" "}
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            className={` text-white bg-black cursor-pointer ${isApplied ? "bg-gray-500 cursor-not-allowed" : ""
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
              {singleJob?.role}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location:{" "}
            <span className="pl-4  text-gray-800 font-normal">{singleJob?.location}</span>
          </h1>
          <h1 className="font-bold my-1">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-800">{singleJob?.experience}</span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">{singleJob?.salary}</span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applica tion:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.totalApplication}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt}</span>
          </h1>
        </div>
      </div>
    </>
  );
}
