import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import React from "react";
import Home from "./Home";
import { Navigate } from "react-router-dom";
import mainImg from "../assets/treeswing.svg";

function Login() {
  return (
    <div>
      <SignedOut>
        <div className="flex w-full">
          <div className="w-1/2 my-auto">
            <img src={mainImg} className=" ml-[10%]" alt="" />
          </div>
          <div className="min-h-screen w-1/2 flex justify-center items-center ">
            <SignIn
              signUpUrl="/signup"
              appearance={{
                variables: {
                  colorBackground: "#050226cb",
                  colorText: "#a6a5c0",
                },
                elements: {
                  socialButtons: {
                    backgroundColor: "whitesmoke",
                    borderRadius: "5px",
                  },
                  dividerLine: {
                    backgroundColor: "whitesmoke",
                  },
                  formFieldInput: {
                    color: "black",
                  },
                  footerActionLink: {
                    color: "white",
                  },
                },
              }}
            />
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <Navigate to="/" replace />
      </SignedIn>
    </div>
  );
}

export default Login;
