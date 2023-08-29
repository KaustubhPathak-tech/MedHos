import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../../../node_modules/bootstrap/dist/css/bootstrap-grid.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import useAuth from "../../../hooks/useAuth";
import login_img from "../../../Assets/login_img.webp";
import "./UserLogin.css";
import { signup, login, glogin } from "../../../actions/auth";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
const UserLogin = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const { setAuth } = useAuth();

  const [Switch, setSwitch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const userType = "user";
  useEffect(() => {
    if (localStorage.getItem("Profile")) {
      navigate("/user/dash");
    }
  }, [navigate]);

  function handleCallbackResponse(res) {
    // var googleuser = jwt_decode(res.credential);
    let name = res?.name;
    let email = res?.email;
    let pic = res?.picture;
    let password = res?.sub;
    handleOpen();
    setTimeout(() => {
      handleClose();
    }, 5000);
    dispatch(glogin({ name, email, pic, password, userType }, navigate));
    message.success("Login Successfully");
  }

  // google.accounts.id.initialize({
  //   client_id:
  //     "347055010781-0e81d5agrtrdgsscfcgvjqaqnjlsgvlf.apps.googleusercontent.com",
  //   callback: handleCallbackResponse,
  // });
  // google.accounts.id.renderButton(document.getElementById("GoogleLogin"), {
  //   scope: "profile email",
  //   width: 290,
  //   height: 50,
  //   longtitle: true,
  //   theme: "default",
  // });
  const handleLogin = (e) => {
    e.preventDefault();
    handleOpen();
    setTimeout(() => {
      handleClose();
    }, 5000);
    setAuth({ email, password });
    dispatch(login({ email, password, userType }, navigate));
    message.success("Login Successfully");
  };
  const handleRegister = (e) => {
    e.preventDefault();
    handleOpen();
    setTimeout(() => {
      handleClose();
    }, 5000);
    dispatch(signup({ name, email, password, userType }, navigate));
    message.success("Registered Successfully");
  };
  return (
    <div id="userloginPage">
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
      <div className="row">
        <div className="col-lg-6">
          <img src={login_img} alt="login_image" id="loginImg" />
        </div>
        <div className="col-lg-6" style={{ paddingLeft: "25px" }}>
          {Switch ? (
            <>
              <div className="usersignup" id="usersignup">
                <Card
                  sx={{
                    maxWidth: 400,
                    margin: "auto",
                    marginTop: (theme) => theme.spacing(5),
                    padding: (theme) => theme.spacing(2),
                    textAlign: "center",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" id="signuphead">
                      Join MedHos
                    </Typography>
                    <hr />
                    <br />
                    <TextField
                      label="Full Name"
                      name="name"
                      sx={{
                        width: "100%",
                        marginBottom: (theme) => theme.spacing(2),
                      }}
                      variant="outlined"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <TextField
                      label="Email"
                      name="email"
                      sx={{
                        width: "100%",
                        marginBottom: (theme) => theme.spacing(2),
                      }}
                      variant="outlined"
                      autoComplete="off"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />

                    <FormControl
                      sx={{ m: 1, width: "36ch" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        sx={{ width: "100%" }}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>

                    <div id="signuppromodiv">
                      <span>
                        <Checkbox defaultChecked />
                      </span>

                      <span id="signuppromo">
                        Receive relavant offers and promotional communication
                        from MedHos{" "}
                      </span>
                    </div>
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        width: "100%",
                      }}
                      onClick={handleRegister}
                    >
                      Register
                    </Button>
                    <br />
                  </CardContent>
                </Card>
                <br />
              </div>
            </>
          ) : (
            <>
              <div
                className="userlogin"
                id="userlogin"
                style={{ textAlign: "center" }}
              >
                <LoginSocialGoogle
                  // isOnlyGetToken
                  client_id={
                    "347055010781-0e81d5agrtrdgsscfcgvjqaqnjlsgvlf.apps.googleusercontent.com"
                  }
                  // onLoginStart={onLoginStart}
                  onResolve={({ provider, data }) => {
                    handleCallbackResponse(data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <GoogleLoginButton />
                </LoginSocialGoogle>
                <br />
                <div>Or</div>
                <br />
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
                <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    sx={{ width: "100%" }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
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
              </div>
              <br />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
