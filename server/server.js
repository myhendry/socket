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

  //! Server emits to Client
  //   socket.emit("newMessage", {
  //     from: "hendry@gmail.com",
  //     message: "hi there",
  //     createdAt: 123123
  //   });

  //! Server emits to Client
  socket.emit("welcome", {
    from: "Admin",
    message: "Welcome to the Chat App",
    createdAt: new Date().getTime()
  });

  //! Server broadcast to Other Clients
  socket.broadcast.emit("welcome", {
    from: "Admin",
    message: "New User Joined",
    createdAt: new Date().getTime()
  });

  //! Server Listing to Client Event
  socket.on("createMessage", message => {
    console.log("createMessage", message);

    //! Emit to All Clients upon Server Listening
    // io.emit("newMessage", {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

    //! Broadcast to All Clients (except emitter) upon Server Listening
    socket.broadcast.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  //! Server listens to Client Disconnect
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
