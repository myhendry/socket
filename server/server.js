const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

// Server listens to Client Connected
io.on("connection", socket => {
  console.log("New User Connected");

  // Server listens to Client Disconnect
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
