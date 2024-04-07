import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import Layout from "../Components/Layout";
import { Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DoctorList from "../Components/DoctorList";
import { getAllDoctors } from "../actions/doctor";
import { getMedicines } from "../actions/medicines";
import { useSelector } from "react-redux";
import { getUserAppointments } from "../actions/appointmentuser";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import { Container } from "@mui/material";

import "./HomePage.css";

const HomePage = () => {
  var User = useSelector((state) => state.fetch_current_userReducer);
  const params = useLocation();
  const headerDecider = params.pathname;
  const navigate = useNavigate();
  useEffect(() => {
    if (User?.user?.isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [User]);

  useEffect(() => {}, [getMedicines]);
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
      rgba(88, 228, 228, 0.8),
      #1081eb 70.71%
    )`,
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
      <div style={containerStyle}>
        <div style={effectStyle}>
          <span id="headContent">
            {headerDecider === "/user/dash" ? (
              <>Available Doctors</>
            ) : (
              <>
                Online Doctors{" "}
                <svg
                  height="36"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 36 36"
                  width="36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* <path
                    class="fade-beat"
                    d="m18 11a7 7 0 1 1 -7 7 7 7 0 0 1 7-7"
                    fill="#1081eb"
                  />
                  <path
                    className="fade-beat-1"
                    d="m18 34a16 16 0 1 1 16-16 16 16 0 0 1 -16 16zm0-30a14 14 0 1 0 14 14 14 14 0 0 0 -14-14z"
                    fill="white"
                  />
                  <path d="m0 0h36v36h-36z" fill="none" /> */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r="0"
                    fill-opacity="0"
                    stroke="green"
                    stroke-width="2px"
                    stroke-opacity="1"
                  >
                    {" "}
                    <animate
                      attributeName="r"
                      from="0"
                      to="15"
                      dur="3s"
                      repeatCount="indefinite"
                    />{" "}
                    <animate
                      attributeName="stroke-opacity"
                      from="1"
                      to="0"
                      dur="3s"
                      repeatCount="indefinite"
                    ></animate>{" "}
                  </circle>{" "}
                  <circle
                    cx="50%"
                    cy="50%"
                    r="0"
                    fill-opacity="0"
                    stroke="green"
                    stroke-width="2px"
                    stroke-opacity="1"
                  >
                    {" "}
                    <animate
                      attributeName="r"
                      from="0"
                      to="15"
                      dur="3s"
                      repeatCount="indefinite"
                      begin="0.75s"
                    />{" "}
                    <animate
                      attributeName="stroke-opacity"
                      from="1"
                      to="0"
                      dur="3s"
                      repeatCount="indefinite"
                      begin="0.75s"
                    ></animate>{" "}
                  </circle>{" "}
                  <circle
                    cx="50%"
                    cy="50%"
                    r="0"
                    fill-opacity="0"
                    stroke="green"
                    stroke-width="2px"
                    stroke-opacity="1"
                  >
                    {" "}
                    <animate
                      attributeName="r"
                      from="0"
                      to="15"
                      dur="3s"
                      repeatCount="indefinite"
                      begin="1.5s"
                    />{" "}
                    <animate
                      attributeName="stroke-opacity"
                      from="1"
                      to="0"
                      dur="3s"
                      repeatCount="indefinite"
                      begin="1.5s"
                    ></animate>{" "}
                  </circle>{" "}
                  <circle
                    cx="50%"
                    cy="50%"
                    r="5"
                    fill="green"
                    stroke="white"
                  ></circle>
                </svg>
              </>
            )}
          </span>
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
