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
    <div className="bg-white dark:bg-[#020817] p-8 rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 group">
        <div className="flex justify-between items-start mb-6">
            <div className={`w-12 h-12 rounded-full border border-gray-100 dark:border-white/10 flex items-center justify-center bg-gray-50/50 dark:bg-white/5 group-hover:bg-white dark:group-hover:bg-white/10 transition-colors`}>
                {React.cloneElement(icon, { 
                    size: 20, 
                    className: color.replace('bg-', 'text-'),
                    strokeWidth: 2
                })}
            </div>
            <div className="flex items-center gap-1 text-green-500 font-semibold text-[10px] bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full border border-green-100 dark:border-green-900/10">
                <TrendingUp size={12} strokeWidth={2.5} />
                <span>+12%</span>
            </div>
        </div>
        <div>
            <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-1 tracking-tight">{value}</h3>
            <p className="text-gray-400 dark:text-gray-500 text-[11px] font-semibold uppercase tracking-widest mb-1">{label}</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-600 font-medium italic">
                {description}
            </p>
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
            color: "text-purple-600",
            description: "Positions currently live"
        },
        {
            label: "Companies",
            value: totalCompanies,
            icon: <Building2 />,
            color: "text-blue-600",
            description: "Registered organizations"
        },
        {
            label: "Total Applicants",
            value: totalApplications,
            icon: <Users />,
            color: "text-orange-600",
            description: "Candidates applied so far"
        }
    ];

    const firstName = user?.fullname ? user.fullname.split(' ')[0] : 'Recruiter';

    return (
        <div className="space-y-10 animate-in fade-in duration-500 max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
                <div>
                    <h1 className="text-4xl font-semibold text-gray-900 dark:text-white tracking-tight">
                        Welcome, <span className="text-[#6A38C2] font-bold">{firstName}</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-base mt-1">
                        Here is the latest summary of your recruitment pipeline.
                    </p>
                </div>
                <div className="bg-white dark:bg-[#020817] px-4 py-3 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-purple-600 border border-gray-100 dark:border-white/10">
                        <Clock size={14} />
                    </div>
                    <div>
                        <p className="text-[11px] font-semibold text-gray-900 dark:text-white">Live Data</p>
                        <p className="text-[10px] text-gray-400 font-medium">Updated just now</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} color={stat.color.replace('text-', 'bg-')} />
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white dark:bg-[#020817] p-8 rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-sm">
                <div className="flex justify-between items-center mb-8 border-b border-gray-50 dark:border-white/5 pb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">Recent Job Listings</h2>
                        <p className="text-sm text-gray-400 font-medium mt-1">Manage your most recently posted opportunities</p>
                    </div>
                    <button className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors uppercase tracking-wider text-[11px] px-4 py-2 bg-purple-50 dark:bg-purple-900/10 rounded-xl">
                        View All
                    </button>
                </div>
                
                <div className="space-y-3">
                    {allAdminJobs?.length > 0 ? (
                        allAdminJobs.slice(0, 5).map((job, index) => (
                            <div key={index} className="flex items-center justify-between p-5 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group border border-gray-50 dark:border-white/5 hover:border-purple-100 dark:hover:border-purple-900/20">
                                <div className="flex items-center gap-6">
                                    <div className="w-11 h-11 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 font-semibold text-lg border border-gray-200 dark:border-white/10 group-hover:border-purple-200 dark:group-hover:border-purple-900/30 group-hover:text-purple-600 transition-all">
                                        {job.title.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white text-base group-hover:text-purple-600 transition-colors">{job.title}</h4>
                                        <div className="flex items-center gap-3 mt-1 text-gray-400 font-medium uppercase text-[10px] tracking-wider">
                                            <span>{job.jobType}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span>{job.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">{job.applications?.length || 0}</p>
                                        <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-widest">Applicants</p>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 bg-gray-50 dark:bg-white/5 rounded-2xl">
                            <p className="text-gray-400 font-medium italic">No jobs posted yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
