import React, { useEffect } from "react";
import "./LandingPage.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid, Tooltip, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faUser,
  faUserDoctor,
  faUserNurse,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const navigate = useNavigate();
  var User = useSelector((state) => state.fetch_current_userReducer);
  useEffect(() => {
    if (Date.now() < User?.time + 3.6e6) {
      navigate(`/${User?.user?.userType}/dash`);
    }
  }, [navigate, User]);
  return (
    <div className="App-header">
      <div id="header">
        <Typography variant="h5">Choose Your Role</Typography>
      </div>
      <div className="">
        <Grid container spacing={2} className="options">
          <Box component="span" sx={{ p: 2, border: "0px dashed grey" }}>
            <NavLink to="/user/login">
              <Button
                variant="outlined"
                sx={{ width: 200, padding: 5, margin: 0 }}
              >
                <FontAwesomeIcon icon={faUser} size="4x" />
              </Button>
            </NavLink>
            <Typography variant="h6" id="tagline">
              User
            </Typography>
          </Box>

          <Box component="span" sx={{ p: 2, border: "0px dashed grey" }}>
            <NavLink to="/doctor/login">
              <Button
                variant="outlined"
                sx={{ width: 200, padding: 5, margin: 0 }}
              >
                <FontAwesomeIcon icon={faUserDoctor} size="4x" />
              </Button>
            </NavLink>
            <Typography variant="h6" id="tagline">
              Doctor
            </Typography>
          </Box>
        </Grid>
      </div>
    </div>
  );
};

export default LandingPage;
