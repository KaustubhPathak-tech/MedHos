import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { useSelector } from "react-redux";
// var fs = require("fs");
const DoctorDash = () => {
  var User = useSelector((state) => state.fetch_current_userReducer);
  const base64img = User?.user?.file;
  
  function base64decoder(base64img) {
    const http = new XMLHttpRequest();
    http.onload = () => {
      // convert blob to url and download
      var url = window.URL.createObjectURL(http.response);
      var link = document.createElement("a");
      link.href = url;
      link.download = "image-from-base64.png";
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
    if (!localStorage.getItem("Profile") || Date.now() > User?.time + 3.6e6||User?.user?.userType!=="doctor") {
      navigate("/");
    }
  }, [navigate, User]);
  return (
    <div id="doctorDash">
      handleDateChange <br />
      handleDateChange <br />
      handleDateChange <br />
      handleDateChange <br />
      handleDateChange <br />
      handleDateChange <br />
      handleDateChange <br />
      handleDateChange <br />
      handleDateChange <br />
      handleDateChange <br />
      handleDateChange <br />
      handleDateChange <br />
      handleDateChange <br />
      handleDateChange handleDateChange handleDateChange handleDateChange
      handleDateChange handleDateChange handleDateChange handleDateChange
      handleDateChange handleDateChange handleDateChange
      <br />
      {/* <img src={image.png} alt='image'/> */}
      <button onClick={handleDownload}>Download your Aadhaar</button>
    </div>
  );
};

export default DoctorDash;
