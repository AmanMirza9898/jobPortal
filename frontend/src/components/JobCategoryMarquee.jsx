import React from 'react';
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

// Add keyframes to tailwind config or global css if needed, but for now we can use inline styles or standard CSS
// However, to keep it clean, we'll use a standard div with inline style using CSS variables for animation
// Or just use the 'animate-marquee' class if defined, but since I can't see index.css fully, I'll use a style tag approach or just standard React style

export const JobCategoryMarquee = () => {
    return (
        <div className="py-10 bg-white dark:bg-[#0b0b0b] overflow-hidden relative">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold bg-linear-to-r from-[#6A38C2] to-[#F83002] text-transparent bg-clip-text">
                    Explore Top Dimensions
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Find your passion across diverse domains</p>
            </div>

            <div className="relative flex w-full group">
                {/* Gradients for smooth fade effect at edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white dark:from-[#0b0b0b] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white dark:from-[#0b0b0b] to-transparent z-10 pointer-events-none" />

                <div
                    className="flex space-x-8 whitespace-nowrap pause-on-hover"
                    style={{ animation: 'marquee 25s linear infinite' }}
                >
                    {/* Double the list for seamless loop */}
                    {[...categories, ...categories, ...categories].map((cat, index) => (
                        <div
                            key={index}
                            className="inline-block w-48 p-6 bg-white dark:bg-white/5 backdrop-blur-md rounded-xl border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-2xl hover:z-10 bg-white/80 dark:bg-white/10"
                        >
                            <div className="flex flex-col items-center justify-center gap-3">
                                <div className="p-3 bg-gray-50/50 dark:bg-white/5 rounded-full text-[#6A38C2] dark:text-white transition-colors">
                                    {cat.icon}
                                </div>
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200">{cat.name}</h3>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-full border border-gray-200 dark:border-white/10">
                                    {cat.open}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .pause-on-hover:hover {
                    animation-play-state: paused !important;
                }
            `}</style>
        </div>
    );
};
