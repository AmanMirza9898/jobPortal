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
    <div className="bg-white dark:bg-[#020817] p-6 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 group">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-4 rounded-2xl ${color} bg-opacity-10 transition-transform group-hover:scale-110`}>
                {React.cloneElement(icon, { className: color.replace('bg-', 'text-') })}
            </div>
            <div className="flex items-center gap-1 text-green-500 font-bold text-xs bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                <TrendingUp size={12} />
                <span>+12%</span>
            </div>
        </div>
        <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">{label}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center gap-1">
                <ArrowUpRight size={10} />
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

    const totalApplications = allAdminJobs?.reduce((acc, job) => acc + (job.applications?.length || 0), 0) || 0;

    const stats = [
        {
            label: "Active Jobs",
            value: allAdminJobs?.length || 0,
            icon: <Briefcase size={24} />,
            color: "bg-purple-600",
            description: "Currently live positions"
        },
        {
            label: "Companies",
            value: companies?.length || 0,
            icon: <Building2 size={24} />,
            color: "bg-blue-600",
            description: "Registered organizations"
        },
        {
            label: "Total Applicants",
            value: totalApplications,
            icon: <Users size={24} />,
            color: "bg-orange-600",
            description: "Candidates applied so far"
        }
    ];

    return (
        <div className="space-y-10">
            {/* Header Section */}
            <div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                    Welcome back, <span className="text-[#6A38C2]">{user?.fullname.split(' ')[0]}!</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Here's what's happening with your recruitment process today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Recent Activity / Quick Actions Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Jobs Overview */}
                <div className="bg-white dark:bg-[#020817] p-8 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Clock className="text-purple-600" size={20} />
                            Recent Jobs Posted
                        </h2>
                        <button className="text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors">View All</button>
                    </div>
                    <div className="space-y-4">
                        {allAdminJobs?.slice(0, 5).map((job, index) => (
                            <div key={index} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group border border-transparent hover:border-gray-100 dark:hover:border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 font-bold text-lg">
                                        {job.title.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-purple-600 transition-colors">{job.title}</h4>
                                        <p className="text-xs text-gray-500">{job.location} • {job.jobType}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{job.applications?.length || 0}</p>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Applicants</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Tips / Dashboard Message */}
                <div className="bg-gradient-to-br from-[#6A38C2] to-[#5b30a6] p-10 rounded-3xl shadow-xl shadow-purple-500/20 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-black mb-4 tracking-tight">Recruitment Tip</h2>
                        <p className="text-purple-100 leading-relaxed font-medium">
                            Applications reviewed within 48 hours are 50% more likely to result in a successful hire. Keep the momentum going!
                        </p>
                    </div>
                    <div className="mt-8 relative z-10">
                        <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            Explore Talent Pool
                        </button>
                    </div>
                    {/* Decorative blurred circles */}
                    <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
