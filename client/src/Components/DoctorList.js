import React from "react";
import { useNavigate } from "react-router-dom";
import "./Layout.css";
const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();

  const formatDate = (timestamp) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      
      hour12: true,
      
    };
  
    const date = new Date(timestamp);
  
    return date.toLocaleTimeString("en-IN", options);
  };
  
  return (
    <>
      <div
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/user/doctor/book-appointment/${doctor._id}`)}
        id="doctorCard"
      >
        <div className="card-header">Dr. {doctor.name}</div>
        <div className="card-body">
          <p>
            <b>Specialization</b> {doctor.specialization}
          </p>
          <p>
            <b>Experience</b> {doctor.doc_experience}
          </p>
          <p>
            <b>Fees Per Consultation</b> {doctor.doc_fee}
          </p>
          <p>
            <b>Timings</b> {formatDate(doctor.docSes1_start)} -{" "}
            {formatDate(doctor.docSes2_end)}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
