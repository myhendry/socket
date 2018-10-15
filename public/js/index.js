var socket = io();

// Client Connected to Server
socket.on("connect", function() {
  console.log("Connected to Server");

  // Client Emitting to Server
  socket.emit("createMessage", {
    from: "client@gmail.com",
    message: "Testing"
  });
});

// Client Listening to Server
socket.on("newMessage", function(data) {
  console.log("newMessage", data);
});

// Client Disconnected from Server
socket.on("disconnect", function() {
  console.log("Disconnected from Server");
});
