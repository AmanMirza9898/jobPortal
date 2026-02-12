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
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);
  console.log("AppliedJobTable allAppliedJobs:", allAppliedJobs);
  console.log(allAppliedJobs);
  return (
    <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
      <Table className="border-separate border-spacing-y-2">
        <TableCaption className="text-gray-500 dark:text-gray-400 font-medium">A list of your applied Jobs</TableCaption>
        <TableHeader>
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="font-bold text-gray-700 dark:text-gray-300">Date</TableHead>
            <TableHead className="font-bold text-gray-700 dark:text-gray-300">Job role</TableHead>
            <TableHead className="font-bold text-gray-700 dark:text-gray-300">Company</TableHead>
            <TableHead className="text-right font-bold text-gray-700 dark:text-gray-300">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!allAppliedJobs || allAppliedJobs.length <= 0 ? <span className="text-gray-500 dark:text-gray-400">No jobs applied yet</span> : allAppliedJobs.length > 0 && allAppliedJobs.map((appliedJob) => (
            appliedJob.job ? (
              <TableRow key={appliedJob._id} className="bg-white/60 dark:bg-gray-800/40 hover:bg-white/80 dark:hover:bg-gray-800/60 transition-colors rounded-xl shadow-sm border-none group">
                <TableCell className="font-medium text-gray-600 dark:text-gray-300 py-4 first:rounded-l-xl">{appliedJob.createdAt.split("T")[0]}</TableCell>
                <TableCell className="font-medium text-gray-800 dark:text-gray-100">{appliedJob.job?.title}</TableCell>
                <TableCell className="font-medium text-gray-600 dark:text-gray-300">{appliedJob.job?.company?.name}</TableCell>
                <TableCell className="text-right last:rounded-r-xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={appliedJob?.status}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge className={`${appliedJob?.status.toLowerCase() === "rejected" ? 'bg-red-500/10 text-red-600 border-red-200' : appliedJob?.status.toLowerCase() === 'pending' ? 'bg-gray-500/10 text-gray-600 border-gray-200' : 'bg-green-500/10 text-green-600 border-green-200'} font-bold px-3 py-1 rounded-full border backdrop-blur-sm shadow-xs flex items-center gap-1 w-fit ml-auto`}>
                        {appliedJob.status.toLowerCase() === "accepted" && <CheckCircle2 className="w-3 h-3" />}
                        {appliedJob.status.toLowerCase() === "rejected" && <XCircle className="w-3 h-3" />}
                        {appliedJob.status.toLowerCase() === "pending" && <Clock className="w-3 h-3" />}
                        <span>{appliedJob.status.toUpperCase()}</span>
                      </Badge>
                    </motion.div>
                  </AnimatePresence>
                </TableCell>
              </TableRow>
            ) : null
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
