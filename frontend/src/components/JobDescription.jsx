import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function JobDescription() {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const applyJobHnadler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true
      });
      console.log(res.data);

      const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }

      if (res.data.success) {
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);
      }
    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  }

  const isApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
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
                {singleJob?.position} Positions
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
            onClick={isApplied ? null : applyJobHnadler}
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
              {singleJob?.title}
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
            <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel} Years</span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.applications?.length || 0}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt?.split("T")[0]}</span>
          </h1>
        </div>
      </div>
    </>
  );
}
