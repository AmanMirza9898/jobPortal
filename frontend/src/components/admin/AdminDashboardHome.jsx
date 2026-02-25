import React from 'react';
import { useSelector } from 'react-redux';
import { 
    Briefcase, 
    Building2, 
    Users, 
    TrendingUp,
    ArrowUpRight,
    Clock
} from 'lucide-react';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';

const StatCard = ({ icon, label, value, color, description }) => (
    <div className="bg-white dark:bg-[#020817] p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500 group relative overflow-hidden">
        {/* Decorative background glow */}
        <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-[0.02] rounded-full blur-3xl translate-x-10 -translate-y-10 group-hover:opacity-[0.05] transition-opacity`}></div>
        
        <div className="flex justify-between items-start mb-6 relative z-10">
            <div className={`p-4 rounded-full ${color} bg-opacity-10 shadow-inner group-hover:scale-110 transition-all duration-500`}>
                {React.cloneElement(icon, { 
                    size: 24,
                    className: color.replace('bg-', 'text-'),
                    strokeWidth: 2
                })}
            </div>
            <div className="flex items-center gap-1 text-green-500 font-semibold text-[10px] bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full border border-green-100 dark:border-green-900/10">
                <TrendingUp size={12} />
                <span>+12%</span>
            </div>
        </div>
        
        <div className="relative z-10">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">{value}</h3>
            <p className="text-gray-400 dark:text-gray-500 text-[10px] font-semibold uppercase tracking-widest mb-3">{label}</p>
            <div className="text-[11px] text-gray-400 dark:text-gray-600 font-medium">
                {description}
            </div>
        </div>
    </div>
);

const AdminDashboardHome = () => {
    useGetAllAdminJobs();
    useGetAllCompanies();

    const { allAdminJobs } = useSelector(store => store.job);
    const { companies } = useSelector(store => store.company);
    const { user } = useSelector(store => store.auth);

    // Dynamic stats calculation
    const totalApplications = allAdminJobs?.reduce((acc, job) => acc + (job.applications?.length || 0), 0) || 0;
    const activeJobs = allAdminJobs?.length || 0;
    const totalCompanies = companies?.length || 0;

    const stats = [
        {
            label: "Active Jobs",
            value: activeJobs,
            icon: <Briefcase />,
            color: "bg-purple-600",
            description: "Live positions"
        },
        {
            label: "Companies",
            value: totalCompanies,
            icon: <Building2 />,
            color: "bg-blue-600",
            description: "Registered organizations"
        },
        {
            label: "Total Applicants",
            value: totalApplications,
            icon: <Users />,
            color: "bg-orange-600",
            description: "Potential hires"
        }
    ];

    const firstName = user?.fullname ? user.fullname.split(' ')[0] : 'Recruiter';

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
                        Welcome, <span className="text-[#6A38C2]">{firstName}</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-300 font-medium text-base">
                        Here is a summary of your recruitment pipeline.
                    </p>
                </div>
                <div className="bg-white dark:bg-[#020817] p-4 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm flex items-center gap-3">
                    <div className="w-9 h-9 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center text-purple-600">
                        <Clock size={16} />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Status</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Updated now</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white dark:bg-[#020817] p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/10 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                            Recent Listings
                        </h2>
                        <p className="text-sm text-gray-400 font-medium mt-1">Review your latest job postings</p>
                    </div>
                    <button className="px-5 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-[11px] font-bold text-gray-900 dark:text-white hover:bg-purple-600 hover:text-white transition-all duration-300 uppercase tracking-widest">
                        View All
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {allAdminJobs?.length > 0 ? (
                        allAdminJobs.slice(0, 4).map((job, index) => (
                            <div key={index} className="flex items-center justify-between p-6 rounded-3xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group border border-transparent hover:border-gray-100 dark:hover:border-white/5 bg-gray-50/30 dark:bg-white/5">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-purple-600 font-bold text-lg shadow-sm border border-gray-100 dark:border-white/5 group-hover:scale-105 transition-transform">
                                        {job.title.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white text-base group-hover:text-[#6A38C2] transition-colors">{job.title}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{job.jobType}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{job.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{job.applications?.length || 0}</p>
                                    <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Applicants</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10">
                            <p className="text-gray-400 font-medium italic">No jobs posted yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
