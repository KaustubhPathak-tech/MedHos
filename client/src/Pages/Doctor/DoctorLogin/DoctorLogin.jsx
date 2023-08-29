import "./DoctorLogin.css";
import {
  Card,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  CardContent,
  Container,
  Grid,FormControl,InputLabel,Select,MenuItem
} from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

import { doctorlogin, doctorsignup } from "../../../actions/auth";

const DoctorLogin = () => {
  // stepper settings
  const steps = [
    "Personal Details",
    "Educational Details",
    "Professional Details",
  ];

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  //backdrop settings
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  //custom settings
  const [Switch, setSwitch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userType = "user";
  useEffect(() => {
    if (localStorage.getItem("Profile")) {
      navigate("/doctor/dash");
    }
  }, [navigate]);
  const handleLogin = (e) => {
    e.preventDefault();
    handleOpen();
    setTimeout(() => {
      handleClose();
    }, 5000);
    dispatch(doctorlogin({ email, password, userType }, navigate));
    message.success("Login Successfully as Doctor ! ");
  };

  //Doctor Registration
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    specialization: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(formData);
  };
  return (
    <div id="doctorloginPage">
      <div className="row">
        <Typography id="modal-modal-title" variant="h7" component="h2">
          Please Login to continue
        </Typography>
      </div>
      <br />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="row">
        <div id="login/signup">
          <Button variant="outlined" onClick={() => setSwitch(false)}>
            Log in
          </Button>
          &nbsp;
          <Button variant="outlined" onClick={() => setSwitch(true)}>
            Register
          </Button>
        </div>
      </div>
      <br />
      <div className="row" id="doctorRegister">
        {Switch ? (
          <div id="doctorsignup">
            <div>
              <Box sx={{ width: "100%" }}>
                <Stepper nonLinear activeStep={activeStep}>
                  {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                      <StepButton color="inherit" onClick={handleStep(index)}>
                        {label}
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
                <div>
                  {allStepsCompleted() ? (
                    <React.Fragment>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                      </Typography>
                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleReset}>Reset</Button>
                      </Box>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {activeStep === 0 ? (
                        <>
                          <Container maxWidth="md">
                            <Typography variant="h4" gutterBottom>
                              Doctor Registration Form
                            </Typography>
                            <form onSubmit={handleSubmit}>
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <TextField
                                    fullWidth
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <TextField
                                    fullWidth
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    type="email"
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <FormControl fullWidth>
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                      name="gender"
                                      value={formData.gender}
                                      onChange={handleInputChange}
                                      required
                                    >
                                      <MenuItem value="male">Male</MenuItem>
                                      <MenuItem value="female">Female</MenuItem>
                                      <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label="Specialization"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </Grid>
                              </Grid>
                              <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                              >
                                Register
                              </Button>
                            </form>
                          </Container>
                        </>
                      ) : (
                        <></>
                      )}
                      {activeStep === 1 ? <>Step 2</> : <></>}
                      {activeStep === 2 ? <>Step 3 </> : <></>}

                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                      >
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleNext} sx={{ mr: 1 }}>
                          Next
                        </Button>
                        {activeStep !== steps.length &&
                          (completed[activeStep] ? (
                            <Typography
                              variant="caption"
                              sx={{ display: "inline-block" }}
                            >
                              Step {activeStep + 1} already completed
                            </Typography>
                          ) : (
                            <Button onClick={handleComplete}>
                              {completedSteps() === totalSteps() - 1
                                ? "Finish"
                                : "Complete Step"}
                            </Button>
                          ))}
                      </Box>
                    </React.Fragment>
                  )}
                </div>
              </Box>
            </div>
          </div>
        ) : (
          <div id="doctorlogin">
            <div style={{ textAlign: "center" }}>
              <Card sx={{ width: "320px" }}>
                <CardContent>
                  <TextField
                    id="outlined-basic"
                    name="email"
                    type="text"
                    label="Mobile Number or Email ID"
                    variant="outlined"
                    autoComplete="off"
                    sx={{ width: "95%" }}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <br />
                  <br />
                  <TextField
                    id="outlined-basic-1"
                    name="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    autoComplete="off"
                    sx={{ width: "95%", height: "65px" }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <br />
                  <div>
                    <Link to="/user/forgotpassword" id="userForgot">
                      Forgot Password ?
                    </Link>
                  </div>
                  <br />
                  <Button
                    variant="contained"
                    onClick={handleLogin}
                    sx={{ width: "95%" }}
                  >
                    Login
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorLogin;
