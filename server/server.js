const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const { generateMessage } = require("./utils/message");

app.use(express.static(publicPath));

// Server listens to Client Connected
io.on("connection", socket => {
  console.log("New User Connected");

  //! Server emits to Client
  // socket.emit("newMessage", generateMessage('Admin', 'Welcome!!'));

  //! Server emits to Client
  socket.emit("welcome", generateMessage("Admin", "Welcome to the Chat App!!"));

  //! Server broadcast to Other Clients
  socket.broadcast.emit(
    "welcome",
    generateMessage("Admin", "New User Joined!!")
  );

  //! Server Listing to Client Event
  socket.on("createMessage", message => {
    console.log("createMessage", message);

    //! Emit to All Clients upon Server Listening
    io.emit("newMessage", generateMessage(message.from, message.text));

    //! Broadcast to All Clients (except emitter) upon Server Listening
    socket.broadcast.emit(
      "newMessage",
      generateMessage(message.from, message.text)
    );
  });

  //! Server listens to Client Disconnect
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
