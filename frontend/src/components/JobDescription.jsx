import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { ArrowLeft, MapPin, DollarSign, Users, Calendar, Clock, Briefcase, User } from "lucide-react";

export default function JobDescription() {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyJobHnadler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true
      });

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
        window.scrollTo(0, 0); // Scroll to top when job details load
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
    <div className="max-w-4xl mx-auto my-10">

      {/* Back Button */}
      <Button variant="ghost" className="mb-6 -ml-4 text-gray-600 hover:text-[#6A38C2]" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-5 h-5 mr-2" /> Back
      </Button>

      {/* Main Card */}
      {/* Main Card Wrapper (Transparent) */}
      <div className="">
        {/* Header */}
        {/* Header Card */}
        {/* Header Card */}
        <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          <div className="flex gap-4 items-center">
            {/* Company Logo */}
            <div className="h-16 w-16 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center p-1">
              {singleJob?.company?.logo ? (
                <img src={singleJob?.company?.logo} alt="logo" className="w-full h-full object-cover rounded-full" />
              ) : (
                <User className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">{singleJob?.title}</h1>
              <div className="flex items-center gap-3 mt-2 text-gray-600">
                <span className="font-bold text-[#6A38C2] text-lg">{singleJob?.company?.name}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-500 font-medium flex items-center gap-1"><MapPin size={14} /> {singleJob?.location}</span>
              </div>
            </div>
          </div>
          {/* Apply Button */}
          <Button
            onClick={isApplied ? null : applyJobHnadler}
            disabled={isApplied}
            className={`rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 shadow-md ${isApplied
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-[#6A38C2] hover:bg-[#5b30a6] text-white hover:shadow-lg hover:-translate-y-0.5'
              }`}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </Button>
        </div>

        {/* Body */}
        {/* Body Card */}
        {/* Body Card */}
        <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
          {/* Highlights Badges */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-bold text-sm border border-blue-100">
              <Briefcase size={16} /> {singleJob?.position} Positions
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-[#F83002] rounded-full font-bold text-sm border border-red-100">
              <DollarSign size={16} /> {singleJob?.salary} LPA
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-[#7209B7] rounded-full font-bold text-sm border border-purple-100">
              <Clock size={16} /> {singleJob?.jobType}
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-3 mb-4">Job Description</h2>
              <div className="prose max-w-none text-gray-600 leading-relaxed text-base">
                <p className="whitespace-pre-wrap">{singleJob?.description}</p>
              </div>
            </div>

            {/* Additional Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-2 opacity-70">Experience</h3>
                <p className="text-gray-800 font-bold flex items-center gap-2 text-lg"><Briefcase className="text-[#6A38C2]" size={20} /> {singleJob?.experienceLevel} Years</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-2 opacity-70">Applicants</h3>
                <p className="text-gray-800 font-bold flex items-center gap-2 text-lg"><Users className="text-[#6A38C2]" size={20} /> {singleJob?.applications?.length || 0}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-2 opacity-70">Posted On</h3>
                <p className="text-gray-800 font-bold flex items-center gap-2 text-lg"><Calendar className="text-[#6A38C2]" size={20} /> {singleJob?.createdAt?.split("T")[0]}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div >
  );
}
