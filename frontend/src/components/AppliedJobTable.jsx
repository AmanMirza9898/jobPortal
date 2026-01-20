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
    <div>
     <Table className="mt-8 border-separate border-spacing-y-3"> 
  <TableCaption>A list of your applied Jobs</TableCaption>
  <TableHeader>
    <TableRow className="border-none text-gray-500"> {/* Header lines hatane ke liye */}
      <TableHead>Date</TableHead>
      <TableHead>Job role</TableHead>
      <TableHead>Company</TableHead>
      <TableHead className="text-right">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {[1, 2].map((item, index) => (
      <TableRow key={index} className="bg-slate-50 shadow-sm"> {/* Row ko background dene se gap saaf dikhega */}
        <TableCell>10-01-2026</TableCell>
        <TableCell>Frontend Developer</TableCell>
        <TableCell>Google</TableCell>
        <TableCell className="text-right">
          <Badge className="bg-black text-white">Selected</Badge>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
    </div>
  );
}
