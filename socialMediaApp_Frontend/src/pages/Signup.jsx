import { SignedIn, SignedOut, SignUp } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router-dom";

function Signup() {
  return (
    <>
      <SignedOut>
        <SignUp signInUrl="/login" />
      </SignedOut>
      <SignedIn>
        <Navigate to={"/"} />
      </SignedIn>
    </>
  );
}

export default Signup;
