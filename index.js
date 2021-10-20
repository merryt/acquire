import express from "express";
const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);
import { default as Chat } from "./EventHandlers/Chat.js";
import path from "path";
import { fileURLToPath } from "url";

// setting up normal patterns in esm
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  // check to see if player is logged in (for now we might not want to mess with that)
  res.sendFile(__dirname + "/client/index.html");
});

app.get("/login", (req, res) => {
  // check to see if player is logged in (for now we might not want to mess with that)
  res.sendFile(__dirname + "/client/login.html");
});


app.get("/game", (req, res) => {
  // check to see if player is logged in (for now we might not want to mess with that)
  res.sendFile(__dirname + "/client/game.html");
});

// exposes the static folder (second paramater) as /public (first paramater)
app.use('/public', express.static('public'))






io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // this organisation pattern is taken from https://stackoverflow.com/questions/20466129/how-to-organize-socket-handling-in-node-js-and-socket-io-app
  var eventHandlers = {
    chat: new Chat(io, app, socket),
  };

  for (var category in eventHandlers) {
    var handler = eventHandlers[category].handler;
    for (var event in handler) {
      socket.on(event, handler[event]);
    }
  }
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
