import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Building2, 
    Briefcase, 
    Users,
    UserCircle, 
    LogOut,
    ChevronRight,
    Menu,
    X,
    CalendarCheck
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import logo from '../../assets/logo.png';

const AdminSidebar = () => {
    const { user } = useSelector((store) => store.auth);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/admin/dashboard" },
        { icon: <Building2 size={20} />, label: "Companies", path: "/admin/companies" },
        { icon: <Briefcase size={20} />, label: "Jobs", path: "/admin/jobs" },
        { icon: <CalendarCheck size={20} />, label: "Scheduler", path: "/admin/scheduler" },
        { icon: <Users size={20} />, label: "Applicants", path: "/admin/applicants" },
        { icon: <UserCircle size={20} />, label: "Profile", path: "/admin/profile" },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-6 left-6 z-[60] p-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/10 rounded-xl shadow-lg"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Backdrop for mobile */}
            {isOpen && (
                <div 
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                />
            )}

            <aside className={`fixed left-0 top-0 h-screen w-64 bg-white dark:bg-[#020817] border-r border-gray-100 dark:border-white/10 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Logo Section */}
                <div className="p-6 border-b border-gray-50 dark:border-white/5 flex items-center justify-between">
                    <NavLink to="/" onClick={() => setIsOpen(false)}>
                        <img src={logo} alt="JobSyncc" className="h-10 w-auto" />
                    </NavLink>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400">
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-grow p-4 space-y-2 mt-4 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) => 
                                `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                                    isActive 
                                    ? 'bg-purple-50 dark:bg-purple-900/20 text-[#6A38C2] shadow-sm shadow-purple-100/50' 
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                                }`
                            }
                        >
                            <div className="flex items-center gap-3">
                                <span className="transition-transform group-hover:scale-110">{item.icon}</span>
                                <span className="font-semibold text-sm">{item.label}</span>
                            </div>
                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                        </NavLink>
                    ))}
                </nav>

                {/* User Profile & Logout Section */}
                <div className="p-4 border-t border-gray-50 dark:border-white/5 space-y-4">
                    <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-white/5 rounded-2xl">
                        <img 
                            src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} 
                            alt="Profile" 
                            className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 object-cover" 
                        />
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.fullname}</p>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{user?.role}</p>
                        </div>
                    </div>

                    <button 
                        onClick={logoutHandler}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-semibold text-sm group"
                    >
                        <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
