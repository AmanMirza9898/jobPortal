import React from 'react'
import { Badge } from './ui/badge'
import { Ghost, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import LazyImage from './shared/LazyImage'

export const LatesJobCards = ({ job, index = 0 }) => {
  const navigate = useNavigate();

  const bgColors = [
    "bg-purple-50",
    "bg-orange-50",
    "bg-blue-50",
    "bg-green-50",
    "bg-pink-50",
    "bg-yellow-50"
  ];
  const color = bgColors[index % bgColors.length]; // Cycle through colors

  return (
    <div onClick={() => navigate(`/description/${job._id}`)} className={`p-6 rounded-3xl shadow-sm md:hover:shadow-xl transition-all duration-300 ${color} dark:bg-none dark:bg-[#0b0b0b] border border-transparent dark:border-white/10 md:hover:border-gray-200 dark:hover:border-[#6A38C2]/50 cursor-pointer flex flex-col justify-between min-h-[280px] group relative overflow-hidden dark:hover:shadow-[0_0_30px_-5px_rgba(106,56,194,0.3)]`}>

      {/* Top Section */}
      <div className="flex items-start justify-between mb-4 z-10">
        <Badge className="bg-white/80 dark:bg-white/10 backdrop-blur-sm text-gray-700 dark:text-gray-300 font-bold border-none px-3 py-1 rounded-full shadow-sm">
          {job?.salary} LPA
        </Badge>
        <div className="p-2 bg-white dark:bg-black/40 rounded-full shadow-sm md:group-hover:scale-110 transition-transform border border-transparent dark:border-white/10">
          {job?.company?.logo ? (
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <LazyImage src={job?.company?.logo} alt="logo" className="w-full h-full object-cover" />
            </div>

          ) : (
            <div className="w-8 h-8 flex items-center justify-center text-gray-400">
              <User size={20} />
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="mb-6 z-10">
        <h1 className="font-extrabold text-2xl text-gray-800 dark:text-white mb-2 leading-tight md:group-hover:text-[#6A38C2] dark:group-hover:text-[#a04ee0] transition-colors">{job?.title}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed font-medium">
          {job?.description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto z-10">
        <div className="flex flex-col">
          <h2 className="font-bold text-gray-900 dark:text-gray-200">{job?.company?.name}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">India</p>
        </div>

        <div className="h-10 w-10 bg-white dark:bg-black/40 border border-transparent dark:border-white/10 rounded-full flex items-center justify-center shadow-md md:group-hover:bg-black dark:group-hover:bg-white md:group-hover:text-white dark:group-hover:text-black transition-all duration-500 transform md:group-hover:rotate-360">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </div>
      </div>

      {/* Decorative Blob */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/30 dark:bg-[#6A38C2]/10 rounded-full blur-2xl md:group-hover:scale-150 transition-transform duration-500"></div>
    </div>
  )
}
