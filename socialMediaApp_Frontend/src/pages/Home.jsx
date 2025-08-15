import { useClerk, useUser } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearUser } from "@/features/user/userSlice";

function Home() {
  const { signOut } = useClerk();
  const { isSignedIn, isLoaded } = useUser();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    signOut();
    console.log("you are out");
  };
  return isLoaded ? (
    isSignedIn ? (
      <div>
        <div>
          <h1>new app</h1>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AlignJustify />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={"/profile"}>
                  <DropdownMenuItem>profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={handleLogout}>
                  logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <h1>Get Started</h1>
        <Link to={"/login"}>Login</Link>
        <Link to={"/signup"}>SignUp</Link>
      </div>
    )
  ) : (
    <div>LOADING.....</div>
  );
}

export default Home;
