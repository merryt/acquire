import "./GameList.js";
var socket = io();
import { joinLobby, joinGame } from "./RoomManagement.js";
var messages = document.getElementById("messages");
var form = document.getElementById("form");
var input = document.getElementById("input");

// get list of games

socket.emit("getListOfGames");

// chat tools
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chatMessage", input.value);
    input.value = "";
  }
});

document
  .querySelector("#createNewGame")
  .addEventListener("click", () => socket.emit("createNewGame"));

document
  .querySelector("#leaveGame")
  .addEventListener("click", () => joinLobby());

document.querySelector("#joinGame").addEventListener("click", () => {
  const gameId = document.querySelector("#activeGame").dataset.gameId;
  joinGame(gameId);
});

socket.on("your new game", (roomID) => {
  console.log("moving you into the room you just created", roomID);
  // move user into their own room
});

socket.on("chat message", function (msg) {
  var item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("log", (msg) => console.log(msg));
