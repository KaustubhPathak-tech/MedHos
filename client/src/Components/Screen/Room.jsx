import React, { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSocket } from "../Context/SocketProvider";
import Peer from "./Services/Peer";

import "./Room.css";
import { Button } from "@mui/material";

const Room = () => {
  const socket = useSocket();
  const [remoteSocket, SetRemoteSocket] = useState(null);

  const [mystream, setMytream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const handleJoin = useCallback(
    ({ Email, id }) => {
      console.log(`Email ${Email} id ${id}} joined the room`);
      SetRemoteSocket(id);
    },
    [SetRemoteSocket]
  );
  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      SetRemoteSocket(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMytream(stream);
      console.log(`Incoming call from ${from}`);
      const ans = await Peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
      // Peer.handleIncomingCall(offer);
    },
    [socket, setMytream, SetRemoteSocket]
  );
  const sendStream = useCallback(() => {
    for (const track of mystream.getTracks()) {
      Peer.peer.addTrack(track, mystream);
    }
  },[mystream]);


  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      Peer.setLocalDescription(ans);
      console.log("call accepted");
    //   for (const track of mystream.getTracks()) {
    //     Peer.peer.addTrack(track, mystream);
    //   }
    },
    []
  );
  const handleNegotiationNeeded = useCallback(async () => {
    console.log("negotiation needed");
    const offer = await Peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocket });
  }, [remoteSocket, socket]);
  useEffect(() => {
    Peer.peer.addEventListener("negotiationneeded", handleNegotiationNeeded);
    return () => {
      Peer.peer.removeEventListener(
        "negotiationneeded",
        handleNegotiationNeeded
      );
    };
  }, [handleNegotiationNeeded]);

  useEffect(() => {
    Peer.peer.addEventListener("track", async (e) => {
      const remotStream = e.streams;
      console.log("track added!!!!");
      setRemoteStream(remotStream[0]);
    });
  }, [mystream]);
  const handleNegotiationIncoming = useCallback(
    async ({ from, offer }) => {
      const ans = await Peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoFinal = useCallback(
    async ({ ans }) => {
      await Peer.setLocalDescription(ans);
    },
    []
  );
  useEffect(() => {
    socket.on("user:joined", handleJoin);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegotiationIncoming);
    socket.on("peer:nego:final", handleNegoFinal);
    return () => {
      socket.off("user:joined", handleJoin);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegotiationIncoming);
      socket.off("peer:nego:final", handleNegoFinal);
    };
  }, [socket, handleJoin, handleIncomingCall,handleCallAccepted,handleNegotiationIncoming,handleNegoFinal]);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const offer = await Peer.getOffer();
    socket.emit("user:call", { to: remoteSocket, offer });
    setMytream(stream);
  }, [setMytream, remoteSocket, socket]);
  return (
    <div id="room">
      Room
      {remoteSocket ? (
        <>
          <h4> Connected</h4> <br />
          <Button variant="contained" color="info" onClick={handleCallUser}>
            Call
          </Button>
          {mystream && (
            <>
              <Button variant="contained" color="success" onClick={sendStream}>
                Send Stream
              </Button>
              <h4>My Stream</h4>
              <ReactPlayer
                playing
                muted
                url={mystream}
                controls={true}
                height="200px"
                width="100px"
              />
            </>
          )}
          <br />
          {remoteStream && (
            <>
              <h4>Remote Stream</h4>
              <ReactPlayer
                playing
                muted
                url={remoteStream}
                controls={true}
                height="200px"
                width="100px"
              />
            </>
          )}
        </>
      ) : (
        "No user in room"
      )}
    </div>
  );
};

export default Room;
