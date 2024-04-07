"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _socket = require("socket.io");

var _http = _interopRequireWildcard(require("http"));

var _cors = _interopRequireDefault(require("cors"));

var _harperSaveMessage = _interopRequireDefault(require("./Services/harper-save-message.js"));

var _harperGetMessages = _interopRequireDefault(require("./Services/harper-get-messages.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = 8001;
var app = (0, _express["default"])();

_dotenv["default"].config();

app.use((0, _cors["default"])());

var server = _http["default"].createServer(app);

var io = new _socket.Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
app.get("/", function (req, res) {
  res.send("<h1>Socket Server / Video Calling Server of medhos.com Start on Port : ".concat(PORT, "</h1>"));
});
var etoSockets = new Map();
var socketToEts = new Map();
var CHAT_BOT = 'ChatBot';
var chatRoom = ''; // E.g. javascript, node,...

var allUsers = []; // All users in current chat room

io.on("connection", function (socket) {
  console.log("socket connected", socket.id);
  socket.on("room:join", function (_ref) {
    var Email = _ref.Email,
        Room = _ref.Room;
    etoSockets.set(Email, socket.id);
    socketToEts.set(socket.id, Email);
    io.to(Room).emit("user:joined", {
      Email: Email,
      id: socket.id
    });
    socket.join(Room);
    io.to(socket.id).emit("room:join", {
      Email: Email,
      Room: Room
    });
    (0, _harperGetMessages["default"])(Room).then(function (last100Messages) {
      socket.emit('last_100_messages', last100Messages);
    })["catch"](function (err) {}); //updating chat rooms and users may be updated

    chatRoom = Room;
    allUsers.push({
      id: socket.id,
      Email: Email,
      Room: Room
    });
    var chatRoomUsers = allUsers.filter(function (user) {
      return user.Room === Room;
    });
    socket.to(Room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers); //messaging

    var __createdtime__ = Date.now();

    socket.to(Room).emit('receive_message', {
      message: "Someone other than you has joined the chat room",
      username: CHAT_BOT,
      __createdtime__: __createdtime__
    });
    socket.emit('receive_message', {
      message: "Welcome",
      username: CHAT_BOT,
      __createdtime__: __createdtime__
    });
    socket.on('send_message', function (data) {
      var message = data.message,
          Email = data.Email,
          Room = data.Room,
          __createdtime__ = data.__createdtime__;
      io["in"](Room).emit('receive_message', data); // Send to all users in room, including sender

      (0, _harperSaveMessage["default"])(message, Email, Room, __createdtime__) // Save message in db
      .then(function (response) {})["catch"](function (err) {});
    });
  });
  socket.on("disconnect", function () {
    console.log("socket disconnected");
  });
  socket.on("user:call", function (_ref2) {
    var to = _ref2.to,
        offer = _ref2.offer;
    io.to(to).emit("incoming:call", {
      from: socket.id,
      offer: offer
    });
  });
  socket.on("call:accepted", function (_ref3) {
    var to = _ref3.to,
        ans = _ref3.ans;
    io.to(to).emit("call:accepted", {
      from: socket.id,
      ans: ans
    });
  });
  socket.on("peer:nego:needed", function (_ref4) {
    var to = _ref4.to,
        offer = _ref4.offer;
    io.to(to).emit("peer:nego:needed", {
      from: socket.id,
      offer: offer
    });
  });
  socket.on("peer:nego:done", function (_ref5) {
    var to = _ref5.to,
        ans = _ref5.ans;
    io.to(to).emit("peer:nego:final", {
      from: socket.id,
      ans: ans
    });
  });
  socket.on("hangup", function (_ref6) {
    var to = _ref6.to;
    socket.to(to).emit("hangup");
  });
  socket.on("chat:message", function (_ref7) {
    var message = _ref7.message,
        recipient = _ref7.recipient;
    // Check if the recipient exists and is connected
    var recipientSocketId = etoSockets.get(recipient);

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("chat:message", {
        sender: socketToEts.get(socket.id),
        message: message
      });
    } else {
      console.log("Recipient ".concat(recipient, " not found or not connected"));
    }
  });
});
server.listen(PORT, function () {
  console.log("listening on *:".concat(PORT));
});