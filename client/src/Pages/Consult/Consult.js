import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSocket } from "../../Components/Context/SocketProvider";

import "./Consult.css";
import { Button } from "antd";
import { TextField } from "@mui/material";

const Consult = () => {
  const navigate = useNavigate();
  var User = useSelector((state) => state.fetch_current_userReducer);
  console.log(User);
  const [Email, setEmail] = React.useState("");
  const [Room, setRoom] = React.useState("");
  const socket = useSocket();
  console.log(socket);
  const handleSubmit = useCallback(
    (e) => {
      // e.PreventDefault();
      socket.emit("room:join", { Email, Room });
    },
    [Email, Room, socket]
  );
  const handleJoinRoom = useCallback(
    ({ Email, Room }) => {
      console.log("room:join", { Email, Room });
      navigate(`/consult-room/${Room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", ({ Email, Room }) => {
      handleJoinRoom({ Email, Room });
    });

    return () => {
      socket.off("room:join");
    };
  }, [socket, handleJoinRoom]);
  return (
    <div id="consultMain">
      <h2>Consult with our experts</h2>
      <div id="login_id">
        <TextField
          autoComplete="off"
          required
          type="email"
          label="Email"
          name="email"
          variant="outlined"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <TextField
          autoComplete="off"
          required
          type="text"
          label="Room Id"
          name="room_id"
          variant="standard"
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
      </div>
      <br />
      <div id="join_btn">
        <Button type="primary" onClick={handleSubmit}>
          Join
        </Button>
      </div>
    </div>
  );
};

export default Consult;
