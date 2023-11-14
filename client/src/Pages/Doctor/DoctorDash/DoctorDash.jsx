import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import videoImg from "../../../Assets/video-consult.png";

import "./DoctorDash.css";
import { Button } from "antd";
import DoctorAppointments from "../DoctorAppointments";
const DoctorDash = () => {
  var User = useSelector((state) => state.fetch_current_userReducer);
  console.log(User?.user?._id);
  const base64img = User?.user?.file;
  var imagefile = base64img;
  function trimBetweenCharacters(imagefile, startChar, endChar) {
    const startIdx = imagefile?.indexOf(startChar);
    const endIdx = imagefile?.indexOf(endChar, startIdx + 1);
    if (startIdx !== -1 && endIdx !== -1) {
      const result = imagefile?.substring(startIdx + 1, endIdx);
      return result;
    } else {
      return "";
    }
  }
  const startChar = ":";
  const endChar = ";";
  const result = trimBetweenCharacters(imagefile, startChar, endChar);

  function base64decoder(base64img) {
    const http = new XMLHttpRequest();
    http.onload = () => {
      var url = window.URL.createObjectURL(http.response);
      var link = document.createElement("a");
      link.href = url;
      if (result === "image/jpeg") {
        link.download = "IDProof.png";
      } else {
        link.download = "ID_Proof.pdf";
      }

      link.click();
    };
    http.responseType = "blob";
    http.open("GET", base64img, true);
    http.send();
  }
  const handleDownload = (e) => {
    e.preventDefault();
    console.log("download initiated");
    base64decoder(base64img);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !localStorage.getItem("Profile") ||
      Date.now() > User?.time + 3.6e6 ||
      User?.user?.userType !== "doctor"
    ) {
      navigate("/");
    }
  }, [navigate, User]);
  const doctorId = User?.user?._id;
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
    <div id="doctorDash">
      <br />
      <div className="row" id="videoCon">
        <div style={containerStyle}>
          <div style={effectStyle}>
            <span id="headContent">Appoitment List</span>
          </div>
        </div>
      </div>

      <div className="row appointments" id="videoCon">
        <DoctorAppointments />
      </div>
      <br />
      <div className="row" id="videoCon">
        <div className="ConsultHead">Video Consult</div>
        <div className="row" id="videoCon">
          <div className="col-md-6">
            <img src={videoImg} width="350px" />
          </div>
          <div className="col-md-6" id="btncontainervideo">
            <Button className="mt-2" type="primary" id="videoBtn">
              <NavLink to={`/consultation-Room/${doctorId}`} id="links">
                Video Consult
              </NavLink>
            </Button>
          </div>
        </div>
      </div>
      <br />
      <Button onClick={handleDownload}>Download your Aadhaar</Button>
    </div>
  );
};

export default DoctorDash;
