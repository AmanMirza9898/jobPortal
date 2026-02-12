import React from 'react'
import { Skeleton } from './ui/skeleton'

export const JobSkeleton = () => {
    return (
        <div className="p-5 rounded-md shadow-xl bg-white dark:bg-[#0b0b0b] border border-gray-100 dark:border-gray-800 cursor-pointer">
            <div className="flex items-center gap-2 justify-between">
                <p className="text-sm text-gray-500"><Skeleton className="h-4 w-24" /></p>
                <Skeleton className="h-6 w-6 rounded-full" />
            </div>

            <div className='my-2'>
                <h1 className='font-bold text-lg my-2'><Skeleton className="h-6 w-48" /></h1>
                <p className='text-sm text-gray-600'><Skeleton className="h-4 w-full" /></p>
                <p className='text-sm text-gray-600 mt-2'><Skeleton className="h-4 w-3/4" /></p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
            </div>
        </div>
    )
}
