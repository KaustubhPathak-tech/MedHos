import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
const app=express();
dotenv.config();

const io = new Server(process.env.ioPORT||8001, { cors: true });

const etoSockets = new Map();
const socketToEts = new Map();
io.listen(8003);
app.get("/",(req,res)=>{res.send("hello")});
app.listen(process.env.PORT||8002,()=>console.log("server started"));
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
      io.to(to).emit("incoming:call", { from:socket.id,offer });
    });
    socket.on("call:accepted", ({ to, ans }) => {
      io.to(to).emit("call:accepted", { from:socket.id,ans });
    });
  
    socket.on("peer:nego:needed", ({ to, offer }) => {
      console.log("peer:nego:needed",offer);
      io.to(to).emit("peer:nego:needed", { from:socket.id,offer });
    });
    socket.on("peer:nego:done", ({ to, ans }) => {
      console.log("peer:nego:done",ans);
      io.to(to).emit("peer:nego:final", { from:socket.id,ans });
    });
  
  });