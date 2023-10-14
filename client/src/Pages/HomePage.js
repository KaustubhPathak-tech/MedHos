import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import Layout from "../Components/Layout";
import { Row } from "antd";

import DoctorList from "../Components/DoctorList";
import { getAllDoctors } from "../actions/doctor";
import { getMedicines } from "../actions/medicines";
import { useSelector } from "react-redux";
import { getUserAppointments } from "../actions/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

import "./HomePage.css";

const HomePage = () => {
  var User = useSelector((state) => state.fetch_current_userReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (User?.user?.isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [User]);

  useEffect(() => {
    getMedicines();
  }, [getMedicines]);
  useEffect(() => {
    if (
      !localStorage.getItem("Profile") ||
      Date.now() > User?.time + 3.6e6 ||
      User?.user?.userType === undefined
    ) {
      navigate("/");
    }
  }, [navigate, User]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDoctors());
    dispatch(getUserAppointments());
  }, [getAllDoctors, getUserAppointments]);

  // login user data

  const doctors = useSelector((state) => state.doctorReducer);

  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const handleMouseMove = (e) =>
    setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });

  const containerStyle = {
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    fontSize: "22px",
    position: "relative",
    minWidth: "100%",
    minHeight: "65px",
    background: `linear-gradient(
      217deg,
      rgba(88, 228, 197, 0.8),
      rgba(255, 0, 0, 0) 70.71%
    ),
    linear-gradient(127deg, rgba(0, 128, 255, 0.8), rgba(0, 255, 0, 0) 70.71%),
    linear-gradient(336deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 70.71%)`,
    overflow: "hidden",
  };

  const effectStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: hovered
      ? `radial-gradient(circle at ${position.x}px ${position.y}px, transparent 0%, rgba(255, 255, 255, 0.3) 70%)`
      : "rgba(255, 255, 255, 0)",
    transition: "background 0.3s ease",
  };

  return (
    <div id="userHome">
      <div
        style={containerStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <div style={effectStyle}>
          <span id="headContent">Available Doctors</span>
        </div>
      </div>
      <Container maxWidth="lg" id="seperator"></Container>
      <div id="doctorList">
        <Row>
          {doctors &&
            doctors?.data?.data.map((doctor) => (
              <DoctorList key={DoctorList} doctor={doctor} />
            ))}
        </Row>
      </div>
      <Container maxWidth="lg" id="seperator"></Container>

      <div className="row" id="lastRowUser">
        <div className="col-md-6" id="col1UserHome">
          <NavLink maxWidth="md" id="userLink" to="/user/doctor">
            Find More Doctors
          </NavLink>
        </div>
        <div className="col-md-6" id="col1UserHome">
          {" "}
          <NavLink maxWidth="md" id="userLink" to="/medicines">
            Buy Medicines
          </NavLink>
        </div>
      </div>
      <Container maxWidth="lg" id="seperator"></Container>
    </div>
  );
};

export default HomePage;
