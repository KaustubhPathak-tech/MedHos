import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// var fs = require("fs");

import "./DoctorDash.css";
const DoctorDash = () => {
  var User = useSelector((state) => state.fetch_current_userReducer);
  const base64img = User?.user?.file;
  var imagefile=base64img;
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
      if(result==="image/jpeg"){
        link.download = "IDProof.png";
      }
      else{
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
  return (
    <div id="doctorDash">
      <br />
      {/* <img src={image.png} alt='image'/> */}
      <button onClick={handleDownload}>Download your Aadhaar</button>
    </div>
  );
};

export default DoctorDash;
