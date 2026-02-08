import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

export default function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);
  console.log("AppliedJobTable allAppliedJobs:", allAppliedJobs);
  console.log(allAppliedJobs);
  return (
    <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/40 backdrop-blur-md shadow-lg p-4">
      <Table className="border-separate border-spacing-y-2">
        <TableCaption className="text-gray-500 font-medium">A list of your applied Jobs</TableCaption>
        <TableHeader>
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="font-bold text-gray-700">Date</TableHead>
            <TableHead className="font-bold text-gray-700">Job role</TableHead>
            <TableHead className="font-bold text-gray-700">Company</TableHead>
            <TableHead className="text-right font-bold text-gray-700">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!allAppliedJobs || allAppliedJobs.length <= 0 ? <span>No jobs applied yet</span> : allAppliedJobs.length > 0 && allAppliedJobs.map((appliedJob) => (
            appliedJob.job ? (
              <TableRow key={appliedJob._id} className="bg-white/60 hover:bg-white/80 transition-colors rounded-xl shadow-sm border-none group">
                <TableCell className="font-medium text-gray-600 py-4 first:rounded-l-xl">{appliedJob.createdAt.split("T")[0]}</TableCell>
                <TableCell className="font-medium text-gray-800">{appliedJob.job?.title}</TableCell>
                <TableCell className="font-medium text-gray-600">{appliedJob.job?.company?.name}</TableCell>
                <TableCell className="text-right last:rounded-r-xl">
                  <Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-500 hover:bg-red-600' : appliedJob.status === 'accepted' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'} text-white transition-all transform group-hover:scale-105`}>{appliedJob.status.toUpperCase()}</Badge>
                </TableCell>
              </TableRow>
            ) : null
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
