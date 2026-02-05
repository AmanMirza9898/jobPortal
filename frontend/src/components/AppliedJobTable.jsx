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

export default function AppliedJobTable() {
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
          {[1, 2].map((item, index) => (
            <TableRow key={index} className="bg-white/60 hover:bg-white/80 transition-colors rounded-xl shadow-sm border-none group">
              <TableCell className="font-medium text-gray-600 py-4 first:rounded-l-xl">10-01-2026</TableCell>
              <TableCell className="font-medium text-gray-800">Frontend Developer</TableCell>
              <TableCell className="font-medium text-gray-600">Google</TableCell>
              <TableCell className="text-right last:rounded-r-xl">
                <Badge className="bg-black hover:bg-gray-800 text-white transition-all transform group-hover:scale-105">Selected</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
