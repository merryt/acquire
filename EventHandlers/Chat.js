export default function (io, app, socket) {
  this.io = io;
  this.app = app;
  this.socket = socket;

  // Expose handler methods for events
  this.handler = {
    chatMessage: chatMessage.bind(this), // use the bind function to access this.app
  };
}

// Events

function chatMessage(text) {
  // Broadcast message to all sockets
  console.log("message: " + text);
  this.io.emit("chat message", text);
}
