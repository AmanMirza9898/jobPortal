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
    <div className="bg-white dark:bg-[#020817] p-7 rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500 group relative overflow-hidden">
        {/* Decorative background glow */}
        <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-[0.03] rounded-full blur-3xl translate-x-10 -translate-y-10 group-hover:opacity-[0.08] transition-opacity`}></div>
        
        <div className="flex justify-between items-start mb-6 relative z-10">
            <div className={`p-4 rounded-2xl ${color} bg-opacity-10 shadow-inner group-hover:rotate-6 transition-all duration-500`}>
                {React.cloneElement(icon, { 
                    size: 28,
                    className: color.replace('bg-', 'text-'),
                    strokeWidth: 2.5
                })}
            </div>
            <div className="flex items-center gap-1 text-green-500 font-bold text-xs bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full border border-green-100 dark:border-green-900/30">
                <TrendingUp size={14} />
                <span>+12%</span>
            </div>
        </div>
        
        <div className="relative z-10">
            <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-1 tracking-tight">{value}</h3>
            <p className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">{label}</p>
            <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-600 font-semibold italic">
                <div className={`w-1 h-4 rounded-full ${color.replace('bg-', 'bg-opacity-40 bg-')}`}></div>
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
            description: "Live opportunities"
        },
        {
            label: "Companies",
            value: totalCompanies,
            icon: <Building2 />,
            color: "bg-blue-600",
            description: "Managed entities"
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
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">
                        Welcome, <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">{firstName}!</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-lg italic">
                        Real-time overview of your recruitment pipeline.
                    </p>
                </div>
                <div className="bg-white dark:bg-[#020817] p-4 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center text-purple-600">
                        <Clock size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Last Updated</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">Just now</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Jobs Overview - Takes 2 columns */}
                <div className="lg:col-span-2 bg-white dark:bg-[#020817] p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/10 shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                                <span className="w-2 h-8 bg-purple-600 rounded-full"></span>
                                Recent Listings
                            </h2>
                            <p className="text-sm text-gray-400 font-medium mt-1">Review your latest job postings</p>
                        </div>
                        <button className="px-6 py-3 rounded-xl bg-gray-50 dark:bg-white/5 text-sm font-black text-gray-900 dark:text-white hover:bg-purple-600 hover:text-white transition-all duration-300">
                            View More
                        </button>
                    </div>
                    
                    <div className="space-y-6">
                        {allAdminJobs?.length > 0 ? (
                            allAdminJobs.slice(0, 4).map((job, index) => (
                                <div key={index} className="flex items-center justify-between p-5 rounded-3xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group border border-transparent hover:border-gray-100 dark:hover:border-white/10">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 flex items-center justify-center text-purple-600 font-black text-2xl shadow-sm border border-white dark:border-white/5">
                                            {job.title.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-gray-900 dark:text-white text-lg group-hover:text-purple-600 transition-colors uppercase tracking-tight">{job.title}</h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[10px] bg-purple-100 dark:bg-purple-900/30 text-purple-600 px-2 py-0.5 rounded font-black uppercase tracking-tighter">{job.jobType}</span>
                                                <span className="text-xs text-gray-400 font-bold">{job.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl text-center min-w-[100px] border border-white dark:border-white/5">
                                        <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">{job.applications?.length || 0}</p>
                                        <p className="text-[8px] text-gray-400 uppercase font-black tracking-[0.2em]">Candidates</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-400 font-bold italic">No jobs posted yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Tips and Actions */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-[#6A38C2] to-[#5b30a6] p-10 rounded-[2.5rem] shadow-2xl shadow-purple-500/30 text-white relative overflow-hidden group h-full flex flex-col justify-between">
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/30 rotate-3 group-hover:rotate-12 transition-transform duration-500">
                                <TrendingUp size={28} className="text-white" />
                            </div>
                            <h2 className="text-3xl font-black mb-4 tracking-tighter">Recruiter Insights</h2>
                            <p className="text-purple-100/80 leading-relaxed font-bold text-sm italic">
                                "Responsive recruiters are 3x more likely to secure top talents. Don't let your candidates wait!"
                            </p>
                        </div>
                        <div className="mt-10 relative z-10">
                            <button className="w-full bg-white text-[#6A38C2] py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 active:scale-95">
                                Optimize Pipeline
                            </button>
                        </div>
                        {/* Abstract shapes */}
                        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-purple-400/10 rounded-full blur-2xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
