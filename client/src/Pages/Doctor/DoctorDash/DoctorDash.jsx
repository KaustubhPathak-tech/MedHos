import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import videoImg from "../../../Assets/video-consult.png";

// var fs = require("fs");

import "./DoctorDash.css";
import { Button } from "antd";
import DoctorAppointments from "../DoctorAppointments";
const DoctorDash = () => {
  var User = useSelector((state) => state.fetch_current_userReducer);
  console.log(User?.user?._id);
  // const profile = JSON.parse(localStorage.getItem("Profile"));

  // const getNotification = async () => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:7000/user/get-all-notification",
  //       {
  //         userId: User?.user?._id,
  //         userType: User?.user?.userType,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${profile?.token}`,
  //         },
  //       }
  //     );
  //     // dispatch(hideLoading());

  //     if (res.data.success) {
  //       const notification = res?.data?.notification;
  //       const seennotification = res?.data?.seennotification;
  //       localStorage.setItem("Notification", JSON.stringify({ notification }));
  //       localStorage.setItem(
  //         "SeenNotification",
  //         JSON.stringify({ seennotification })
  //       );
  //     } else {
  //       console.log(res.data.message);
  //     }
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   getNotification();
  // }, [getNotification]);

  const base64img = User?.user?.file;
  var imagefile = base64img;
  function trimBetweenCharacters(imagefile, startChar, endChar) {
    const startIdx = imagefile?.indexOf(startChar);
    const endIdx = imagefile?.indexOf(endChar, startIdx + 1); // Start searching for endChar after startChar

    if (startIdx !== -1 && endIdx !== -1) {
      const result = imagefile?.substring(startIdx + 1, endIdx);
      return result;
    } else {
      return ""; // Return an empty string if startChar or endChar is not found
    }
  }

  // Example usage:

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
    <div id="doctorDash">
      <br />
      <div className="row" id="videoCon">
        <div
          style={containerStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <div style={effectStyle}>
            <span id="headContent">Appoitment List</span>
          </div>
        </div>
      </div>
      <div className="row" id="videoCon">
        <DoctorAppointments />
      </div>
      <div className="row" id="videoCon">
        <div className="ConsultHead">Video Consult</div>
        <div className="row" id="videoCon">
          <div className="col-md-6">
            <img src={videoImg} />
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
      {/* <img src={image.png} alt='image'/> */}
      <Button onClick={handleDownload}>Download your Aadhaar</Button>
    </div>
  );
};

export default DoctorDash;
