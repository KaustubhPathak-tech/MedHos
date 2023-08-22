import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import "./UserLogin.css";
const UserLogin = () => {
  const [Switch, setSwitch] = useState(false);
  const handleLogin = () => {};
  return (
    <div id="userLogin">
      <Typography id="modal-modal-title" variant="h7" component="h2">
        Please Login to continue
      </Typography>
      <div id="login/signup">
        <Button variant="outlined" onClick={() => setSwitch(false)}>
          Log in
        </Button>
        <Button variant="outlined" onClick={() => setSwitch(true)}>
          Sign up
        </Button>
      </div>
      {Switch ? (
        <>
          <div className="usersignup">
            <TextField>

            </TextField>
          </div>
        </>
      ) : (
        <>
          <div
            className="userlogin"
            id="userlogin"
            style={{ textAlign: "center" }}
          >
            <br />
            <TextField
              id="outlined-basic"
              name="email"
              type="text"
              label="Phone or email"
              variant="outlined"
              autoComplete="off"
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              autoComplete="off"
            />
            <br /> <br />
            <Button variant="contained" onClick={handleLogin}>
              Sign in
            </Button>
            <br />
            <br />
          </div>
        </>
      )}
    </div>
  );
};

export default UserLogin;
