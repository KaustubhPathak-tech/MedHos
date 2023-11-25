import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http, { get } from "http";
import cors from "cors";
import harperSaveMessage from './Services/harper-save-message.js'; 
import harperGetMessages from "./Services/harper-get-messages.js";
const PORT = 8001;

const app = express();
dotenv.config();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.get("/", (req, res) => {
  res.send(`<h1>Socket Server / Video Calling Server of medhos.com Start on Port : ${PORT}</h1>`);
});

const etoSockets = new Map();
const socketToEts = new Map();
const CHAT_BOT = 'ChatBot';
let chatRoom = ''; // E.g. javascript, node,...
let allUsers = []; // All users in current chat room
io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on("room:join", ({ Email, Room }) => {
    etoSockets.set(Email, socket.id);
    socketToEts.set(socket.id, Email);
    io.to(Room).emit("user:joined", { Email, id: socket.id });
    socket.join(Room);
    io.to(socket.id).emit("room:join", { Email, Room });
    harperGetMessages(Room)
      .then((last100Messages) => {
        // console.log('latest messages', last100Messages);
        socket.emit('last_100_messages', last100Messages);
      })
      .catch((err) => {});

    //updating chat rooms and users may be updated
    chatRoom = Room;
    allUsers.push({ id: socket.id, Email, Room });
    const chatRoomUsers = allUsers.filter((user) => user.Room === Room);
    socket.to(Room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);

    //messaging
    let __createdtime__ = Date.now();
    socket.to(Room).emit('receive_message', {
      message: `${Email} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });

    socket.emit('receive_message', {
      message: `Welcome ${Email}`,
      username: CHAT_BOT,
      __createdtime__,
    });

    socket.on('send_message', (data) => {
      const { message, Email, Room, __createdtime__ } = data;
      io.in(Room).emit('receive_message', data); // Send to all users in room, including sender
      harperSaveMessage(message, Email, Room,__createdtime__) // Save message in db
        .then((response) => {})
        .catch((err) => {});
    });

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
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });
  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
  socket.on("hangup", ({ to }) => {
    socket.to(to).emit("hangup");
  });
  socket.on("chat:message", ({ message, recipient }) => {
    // Check if the recipient exists and is connected
    const recipientSocketId = etoSockets.get(recipient);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("chat:message", {
        sender: socketToEts.get(socket.id),
        message,
      });
    } else {
      // Handle the case where the recipient is not found or not connected
      // You can emit an error or handle it as per your application's logic
      console.log(`Recipient ${recipient} not found or not connected`);
    }
  });
});
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
