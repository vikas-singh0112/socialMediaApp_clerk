import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import heroImage from "../assets/heroimg.svg";
import NavBar from "@/components/NavBar";

function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const { status } = useSelector((state) => state.user);

  if (!isLoaded || status === "loading") {
    return (
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-2 animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
        <div className="h-40 bg-gray-300 rounded animate-pulse"></div>
      </div>
    );
  }

  return isSignedIn ? (
    <div className="flex min-h-screen">
      <NavBar />
      <h2>home</h2>
    </div>
  ) : (
    <div className="flex">
      <div className="ml-32 mt-24 w-1/3">
        <h1 className="text-2xl mb-20">Get Started</h1>
        <p className="font-bold text-7xl mb-8">
          Connect <br />
          with friends..
        </p>
        <p className="font-light h2 text-2xl mb-10">
          start sharing your moments today
        </p>
        <div className="flex flex-col w-2/4 gap-6">
          <Link
            to={"/signup"}
            className="border border-amber-200 rounded-full py-3 px-10 text-2xl text-center text-white hover:bg-[#110f30]"
          >
            SignUp
          </Link>
          <Link
            to={"/login"}
            className="border border-amber-200 rounded-full py-3 px-10 text-2xl text-center text-white hover:bg-[#110f30]"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="w-2/3 min-h-screen flex  items-center">
        <img src={heroImage} className="" alt="" />
      </div>
    </div>
  );
}

export default Home;
