const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const cors = require("cors");
var usernames = [];
var currentVideoUrl = "";

const app = express();

app.use(cors()); // This is for your Express routes
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/login", (req, res) => {
  console.log("GET: /login");
  const { username } = req.body;
  console.log(req.method, username, usernames);
  if (usernames.indexOf(username) != -1) {
    console.log("username found!");
    res
      .status(400)
      .send({ message: "Username taken. Choose a different username..." });
  } else {
    console.log("username not found!");
    usernames.push(username);
    res.send({ message: "ok!" });
  }
});

var server = app.listen(8000, () => {
  console.log("App listening on port  8000!");
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust this to match your React app's origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
  socket.on("video update", (videoUrl) => {
    console.log("video update: " + videoUrl);
    currentVideoUrl = videoUrl;
    io.emit("video update", videoUrl); // Broadcast the update to all users
  });
  socket.on("video_play", ({ currentTime }) => {
    console.log(`Server: Played at ${currentTime}`);
    io.emit("video_play", currentTime);
  });
  socket.on("video_pause", ({ currentTime }) => {
    console.log(`Server: Paused at ${currentTime}`);
    io.emit("video_pause", currentTime);
  });
  io.to(socket.id).emit("video update", currentVideoUrl);
});
