import express from "express";

import { Server } from "socket.io";
import http from 'http';

const PORT=8001;

const app=express();
const server=http.createServer(app);

const io = new Server(server,{cors:true});

app.get("/", (req, res) => {res.send(`<h1>Socket 10 Start on Port : ${PORT}</h1>`);});

const etoSockets = new Map();
const socketToEts = new Map();



io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on("room:join", ({ Email, Room }) => {
    etoSockets.set(Email, socket.id);
    socketToEts.set(socket.id, Email);
    io.to(Room).emit("user:joined", { Email, id: socket.id });
    socket.join(Room);
    io.to(socket.id).emit("room:join", { Email, Room });
  });
  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incoming:call", { from: socket.id, offer });
  });
  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });
  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});
server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
  });

