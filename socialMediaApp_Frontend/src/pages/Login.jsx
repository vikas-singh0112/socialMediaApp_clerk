import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import React from "react";
import Home from "./Home";
import { Navigate } from "react-router-dom";

function Login() {
  return (
    <div>
      <SignedOut>
        <SignIn signUpUrl="/signup"/>
      </SignedOut>
      <SignedIn>
         <Navigate to="/" replace />
      </SignedIn>
    </div>
  );
}

export default Login;
