var socket = io();

//! Client Connected to Server
socket.on("connect", function() {
  console.log("Connected to Server");

  // Client Emitting to Server
  //   socket.emit("createMessage", {
  //     from: "client@gmail.com",
  //     message: "Testing"
  //   });
});

//! Client Listening to Server
socket.on("newMessage", function(message) {
  console.log("newMessage", message);
});

//! Client Listening to Server
socket.on("welcome", function(message) {
  console.log("welcome", message);
});

//! Client Emitting to Server with Acknowledgement
socket.emit(
  "createMessageWithAcknowledgement",
  {
    from: "Frank",
    text: "Hi"
  },
  function(data) {
    console.log(`Got It! ${data.role}`);
  }
);

//! Client Disconnected from Server
socket.on("disconnect", function() {
  console.log("Disconnected from Server");
});
