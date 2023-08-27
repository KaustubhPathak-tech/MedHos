import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RequireAuth from "./Components/RequireAuth";
import LandingPage from "./Pages/Landing Page/LandingPage";
import UserLogin from "./Pages/User/UserLogin/UserLogin";
import UserDash from "./Pages/User/UserDash/UserDash";

const RouteConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        
        <Route path="/user/login" element={<UserLogin />} />
        
        <Route element={<RequireAuth />}>
          <Route path="/user/dash" element={<UserDash />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteConfig;
