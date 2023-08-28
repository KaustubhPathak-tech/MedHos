import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "../../../../node_modules/bootstrap/dist/css/bootstrap-grid.css";
import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import jwt_decode from "jwt-decode"
import useAuth from "../../../hooks/useAuth";
import login_img from "../../../Assets/login_img.webp";
import "./UserLogin.css";
import { signup, login,glogin } from "../../../actions/auth";




const UserLogin = () => {
  const { setAuth } = useAuth();
  const { loginWithRedirect } = useAuth0();
  const [Switch, setSwitch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userType = "user";
  useEffect(() => {
    if (localStorage.getItem("Profile")) {
      navigate("/user/dash");
    }
  }, [navigate]);


  function handleCallbackResponse(res) {
    var googleuser = jwt_decode(res.credential);
    let name = googleuser?.name;
    let email = googleuser?.email;
    let pic = googleuser?.picture;
    let password = googleuser?.sub;

    dispatch(glogin({ name, email, pic, password }, navigate));
  }

  

  useEffect(() => {
    /* global google */
  google.accounts.id.initialize({
    client_id:
      "347055010781-0e81d5agrtrdgsscfcgvjqaqnjlsgvlf.apps.googleusercontent.com",
    callback: handleCallbackResponse,
  });
  google.accounts.id.renderButton(document.getElementById("GoogleLogin"), {
    scope: "profile email",
    width: 240,
    height: 50,
    longtitle: true,
    theme: "default",
  });
    
  }, []);
  

  const handleLogin = (e) => {
    e.preventDefault();
    setAuth({ email, password });
    dispatch(login({ email, password, userType }, navigate));
  };
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(signup({ name, email, password, userType }, navigate));
  };
  return (
    <div style={{ width: "96%" }}>
      <div className="row">
        <Typography id="modal-modal-title" variant="h7" component="h2">
          Please Login to continue
        </Typography>
      </div>
      <br />
      <div className="row">
        <div id="login/signup">
          <Button variant="outlined" onClick={() => setSwitch(false)}>
            Log in
          </Button>
          &nbsp;
          <Button variant="outlined" onClick={() => setSwitch(true)}>
            Sign up
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
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                      sx={{
                        width: "100%",
                        marginBottom: (theme) => theme.spacing(2),
                      }}
                      variant="outlined"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      autoComplete="off"
                    />
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
                <br />
                <br />
                <span style={{ textAlign: "center" }}>or</span>
                <br />
                <br />
                <div id="GoogleLogin">

                </div>
                
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
