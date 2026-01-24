import React from 'react'
import { Badge } from './ui/badge'
import { Ghost } from 'lucide-react'

export const LatesJobCards = ({ job }) => {

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">

      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>


      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray">{job?.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-4 ">
        <Badge className="text-blue-700 font-bold border border-gray-400"> {job?.positions} Positions</Badge>
        <Badge className="text-[#F83002] font-bold border-gray-400">{job?.jobType}</Badge>
        <Badge className="text-[#7209B7] font-bold border-gray-400"> {job?.salary}</Badge>
      </div>

    </div>
  )
}
