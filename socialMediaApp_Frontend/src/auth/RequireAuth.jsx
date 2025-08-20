import NavBar from "@/components/NavBar";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>; // show spinner or loading UI here
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default RequireAuth;
