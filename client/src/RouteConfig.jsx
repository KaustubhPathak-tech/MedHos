import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./Components/Protected/UserAuth";
import DoctorAuth from "./Components/Protected/DoctorAuth";
import LandingPage from "./Pages/Landing Page/LandingPage";
import UserLogin from "./Pages/User/UserLogin/UserLogin";
import UserDash from "./Pages/User/UserDash/UserDash";
import DoctorLogin from "./Pages/Doctor/DoctorLogin/DoctorLogin";
import DoctorDash from "./Pages/Doctor/DoctorDash/DoctorDash";

const RouteConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />

        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />

        <Route element={<RequireAuth />}>
          <Route path="/user/dash" element={<UserDash />} />
        </Route>

        <Route element={<DoctorAuth />}>
          <Route path="/doctor/dash" element={<DoctorDash />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteConfig;
