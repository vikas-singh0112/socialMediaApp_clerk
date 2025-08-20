import { clearUser } from "@/features/user/userSlice";
import { useClerk } from "@clerk/clerk-react";
import { Bell, Compass, House, LogOut, MessageCircleMore, Search, Settings, User } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NavBar() {
  const dispatch = useDispatch();
  const { signOut } = useClerk();
  const { fullName, username } = useSelector((state) => state.user);
  const name = fullName?.split(" ")[0]

  const handleLogout = () => {
    dispatch(clearUser());
    signOut();
    console.log("you are out");
  };

  return (
    <div className="w-1/6 min-h-screen border-r-1 border-[#58576a] flex justify-center">
      <div className="flex flex-col justify-between pt-12 pb-24">
        <h2 className="text-2xl italic underline underline-offset-4">{username ? username : name}</h2>
        <div className="flex flex-col gap-6 text-xl">
          <Link to={"/"} className="flex gap-1.5">
            <House />
            Home
          </Link>
          <Link className="flex gap-1.5">
            <Search />
            Search
          </Link>
          <Link to={"/explore"} className="flex gap-1.5">
            <Compass />
            Explore
          </Link>
          <Link to={"/inbox"} className="flex gap-1.5">
            <MessageCircleMore />
            Message
          </Link>
          <Link to={"/explore"} className="flex gap-1.5">
            <Bell />
            Notification
          </Link>
          <Link to={"/settings"} className="flex gap-1.5">
            <Settings />
            Settings
          </Link>
          <Link to={"/profile"} className="flex gap-1.5">
            <User />
            Profile
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="flex cursor-pointer text-xl border-2 border-red-500  items-center justify-center py-1 rounded-3xl text-red-500 hover:bg-red-600 hover:text-[#05031F] "
        >
          <LogOut className="scale-x-[-1]" />
        </button>
      </div>
    </div>
  );
}

export default NavBar;
