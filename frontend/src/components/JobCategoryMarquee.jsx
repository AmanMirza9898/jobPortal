import React from 'react';
import { motion } from 'framer-motion';
import {
    Code,
    Palette,
    Database,
    LineChart,
    Smartphone,
    Globe,
    Server,
    Cpu
} from 'lucide-react';

const categories = [
    { name: "Frontend Dev", icon: <Code size={24} />, open: "120+ Jobs" },
    { name: "Backend Dev", icon: <Server size={24} />, open: "80+ Jobs" },
    { name: "Data Science", icon: <Database size={24} />, open: "50+ Jobs" },
    { name: "App Dev", icon: <Smartphone size={24} />, open: "100+ Jobs" },
    { name: "UI/UX Design", icon: <Palette size={24} />, open: "200+ Jobs" },
    { name: "DevOps", icon: <Cpu size={24} />, open: "40+ Jobs" },
    { name: "Web3", icon: <Globe size={24} />, open: "30+ Jobs" },
    { name: "Analytics", icon: <LineChart size={24} />, open: "60+ Jobs" },
];

export const JobCategoryMarquee = () => {
    return (
        <div className="py-10 bg-white overflow-hidden relative">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold bg-linear-to-r from-[#6A38C2] to-[#F83002] text-transparent bg-clip-text">
                    Explore Top Dimensions
                </h2>
                <p className="text-gray-500 mt-2">Find your passion across diverse domains</p>
            </div>

            <div className="relative flex w-full">
                {/* Gradients for smooth fade effect at edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex space-x-8 whitespace-nowrap"
                    animate={{ x: ["0%", "-33.33%"] }} // Move by 1/3 since we have 3 sets
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 25, // Adjust speed here
                    }}
                >
                    {/* Double the list for seamless loop */}
                    {[...categories, ...categories, ...categories].map((cat, index) => (
                        <div
                            key={index}
                            className="inline-block w-48 p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#6A38C2] transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex flex-col items-center justify-center gap-3">
                                <div className="p-3 bg-white rounded-full text-[#6A38C2] group-hover:bg-[#6A38C2] group-hover:text-white transition-colors">
                                    {cat.icon}
                                </div>
                                <h3 className="font-semibold text-gray-800">{cat.name}</h3>
                                <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-200">
                                    {cat.open}
                                </span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
