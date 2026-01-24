import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";

const navbar = () => {
  const { user } = useSelector(store => store.auth);
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
    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data.message || "Something went wrong");
    }

  }

  return (
    <div className="bg-white">
      <div className="flex item-center justify-between mx-auto max-w-7xl h-16 mt-4">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium item-center gap-5">
            <Link to="/" className="cursor-pointer">Home</Link>
            <Link to="/jobs" className="cursor-pointer">Jobs</Link>
            <Link to="/Browse" className="cursor-pointer">Browse</Link>
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="cursor-pointer">Login</Button>
              </Link>
              <Link to="/signup">
                <Button

                  variant="outline"
                  className="bg-[#6A38C2] hover:bg-[#43119a] text-white cursor-pointer"
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-10 h-10 cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 ">
                <div className="flex gap-4 items-center">
                  <Avatar className="w-10 h-10 cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>

                  <div>
                    <h4 className="font-medium">{user.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="ml-2">
                  <div className="flex items-center">
                    <User2 />
                    <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                  </div>

                  <div className="flex items-center">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link" className="text-red-500">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default navbar;
