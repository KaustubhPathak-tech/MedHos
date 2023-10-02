import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/Landing Page/LandingPage";
import UserLogin from "./Pages/User/UserLogin/UserLogin";
import UserDash from "./Pages/User/UserDash/UserDash";
import DoctorLogin from "./Pages/Doctor/DoctorLogin/DoctorLogin";
import DoctorDash from "./Pages/Doctor/DoctorDash/DoctorDash";
import Missing from "./Pages/Missing/Missing";
import Payment from "./Pages/Payment";

import Room from "./Components/Screen/Room";

const RouteConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />

        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/dash" element={<UserDash />} />

        <Route path="/doctor/login" element={<DoctorLogin />} />

        <Route path="/doctor/dash" element={<DoctorDash />} />
        <Route path="/payment" element={<Payment />} />
        

        <Route path="/consult-room/:roomid" element={<Room />} />

        <Route path="*" element={<Missing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteConfig;
