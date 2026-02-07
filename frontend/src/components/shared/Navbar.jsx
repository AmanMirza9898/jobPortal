import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Home, Briefcase, Compass } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // For mobile active state
  const isActive = (path) => location.pathname === path;

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      {/* DESKTOP NAVBAR (Floating Pill) */}
      <div className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-full md:px-4 lg:px-6 py-3 flex items-center md:gap-4 lg:gap-8">
          <div className="mr-4">
            <Link to="/">
              <img src={logo} alt="JobSync" className="h-10 w-auto shrink-0" />
            </Link>
          </div>

          <ul className="flex font-medium items-center md:gap-4 lg:gap-6 text-gray-600">
            {
              user && user.role === 'recruiter' ? (
                <>
                  <li><Link to="/admin/companies">Companies</Link></li>
                  <li><Link to="/admin/jobs">Jobs</Link></li>
                </>
              ) : (

                <>
                  <Link to="/" className={`hover:text-[#6A38C2] transition-colors ${isActive('/') ? 'text-[#6A38C2] font-semibold' : ''}`}>Home</Link>
                  <Link to="/jobs" className={`hover:text-[#6A38C2] transition-colors ${isActive('/jobs') ? 'text-[#6A38C2] font-semibold' : ''}`}>Jobs</Link>
                  <Link to="/browse" className={`hover:text-[#6A38C2] transition-colors ${isActive('/browse') ? 'text-[#6A38C2] font-semibold' : ''}`}>Browse</Link>
                </>
              )
            }

          </ul>

          <div className="flex items-center gap-4">
            <div className="md:pl-2 lg:pl-4 border-l border-gray-200">
              {!user ? (
                <div className="flex items-center gap-3">
                  <Link to="/login">
                    <Button
                      variant={isActive('/login') ? "default" : "ghost"}
                      className={`rounded-full transition-all ${isActive('/login') ? 'bg-[#6A38C2] hover:bg-[#5b30a6] text-white shadow-md' : 'hover:text-[#6A38C2] hover:bg-purple-100'}`}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      variant={isActive('/signup') || !isActive('/login') ? "default" : "ghost"}
                      className={`rounded-full transition-all ${isActive('/signup') || !isActive('/login') ? 'bg-[#6A38C2] hover:bg-[#5b30a6] text-white shadow-md hover:shadow-lg' : 'hover:text-[#6A38C2] hover:bg-purple-100'}`}
                    >
                      Signup
                    </Button>
                  </Link>
                </div>
              ) : (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Avatar className="w-10 h-10 cursor-pointer border-2 border-transparent hover:border-purple-500 transition-all">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 border-none shadow-2xl bg-white/90 backdrop-blur-xl rounded-2xl p-4">
                    <div className="flex gap-4 items-center mb-4">
                      <Avatar className="w-12 h-12 border-2 border-gray-100">
                        <AvatarImage src={user?.profile?.profilePhoto} />
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-gray-900">{user.fullname}</h4>
                        {user.role === 'student' && <p className="text-sm text-gray-500 line-clamp-1">{user?.profile?.bio || "No bio available"}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">

                      {
                        user && user.role === 'student' && (
                          <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-700 outline-none focus:outline-none border-none">
                            <div className="bg-gray-100 p-2 rounded-full"><User2 size={18} /></div>
                            <span className="font-medium">View Profile</span>
                          </Link>
                        )
                      }


                      <button onClick={logoutHandler} className="w-full flex items-center gap-3 p-2 hover:bg-purple-50 rounded-xl transition-colors text-red-600 outline-none focus:outline-none border-none">
                        <div className="bg-red-100 p-2 rounded-full"><LogOut size={18} /></div>
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE NAVBAR (Bottom Navigation) */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
        <div className="bg-white/90 backdrop-blur-2xl text-gray-500 rounded-3xl shadow-[0_8px_32px_rgba(106,56,194,0.2)] flex justify-between items-center px-6 py-4 border border-purple-100">
          <Link to="/" className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive('/') ? 'text-[#6A38C2] scale-110' : 'hover:text-[#6A38C2]'}`}>
            <Home size={24} strokeWidth={isActive('/') ? 3 : 2} />
            {isActive('/') && <span className="w-1 h-1 bg-[#6A38C2] rounded-full mt-1 animate-pulse"></span>}
          </Link>

          <Link to={user && user.role === 'recruiter' ? "/admin/jobs" : "/jobs"} className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive('/jobs') || isActive('/admin/jobs') ? 'text-[#6A38C2] scale-110' : 'hover:text-[#6A38C2]'}`}>
            <Briefcase size={24} strokeWidth={isActive('/jobs') || isActive('/admin/jobs') ? 3 : 2} />
            {isActive('/jobs') || isActive('/admin/jobs') && <span className="w-1 h-1 bg-[#6A38C2] rounded-full mt-1 animate-pulse"></span>}
          </Link>

          {/* Central Floating Action Button */}
          <div className="relative -top-8">
            <Link to="/browse">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 hover:shadow-purple-500/30 ${isActive('/browse') ? 'bg-[#6A38C2] text-white ring-4 ring-purple-100' : 'bg-[#6A38C2] text-white border-4 border-white'}`}>
                <Compass size={28} />
              </div>
            </Link>
          </div>

          <Link to={user ? "/profile" : "/login"} className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive('/profile') || isActive('/login') ? 'text-[#6A38C2] scale-110' : 'hover:text-[#6A38C2]'}`}>
            <User2 size={24} strokeWidth={isActive('/profile') ? 3 : 2} />
            {isActive('/profile') && <span className="w-1 h-1 bg-[#6A38C2] rounded-full mt-1 animate-pulse"></span>}
          </Link>

          <button onClick={user ? logoutHandler : () => navigate('/login')} className="flex flex-col items-center gap-1 hover:text-purple-500 transition-colors duration-300">
            <LogOut size={24} />
          </button>
        </div>
      </div>

      {/* LOGO For Mobile Top */}
      <div className="md:hidden fixed top-0 left-0 w-full p-4 bg-white/80 backdrop-blur-md z-40 flex justify-between items-center shadow-sm border-b border-purple-50">
        <img src={logo} alt="JobPortal" className="h-8 w-auto" />
        {!user && (
          <Link to="/login">
            <Button size="sm" className="rounded-full text-white bg-[#6A38C2] hover:bg-[#5b30a6]">Login</Button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
