import RequireAuth from "./auth/RequireAuth";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import PageNotFound404 from "./pages/PageNotFound404";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import UpdateProfile from "./pages/profile/UpdateProfile";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/user/userSlice.js";

function App() {
  const dispatch = useDispatch();
  const { getToken, isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    const loadUser = async () => {
      if (!isLoaded || !isSignedIn) return;

      const token = await getToken();
      dispatch(fetchUser(token));
    };
    loadUser();
  }, [isLoaded, isSignedIn]);

  return (
    <>
      <Routes>
        //public routes
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        //protected routes
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />}>
            <Route path="/profile/update-info" element={<UpdateProfile />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
        </Route>
        //catch all routes
        <Route path="*" element={<PageNotFound404 />} />
      </Routes>
    </>
  );
}

export default App;
