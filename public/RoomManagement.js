import { socket } from "./socket.js";

const joinGameRoom = (gameId) => {
  console.log("joining game");
  const bodyClasslist = document.body.classList;
  bodyClasslist.add("game-view");
  bodyClasslist.remove("lobby-view");
  document.querySelector("#activeGame").dataset.gameId = gameId;

  // add users to game object
};

const joinLobby = () => {
  console.log("joining lobby");
  const bodyClasslist = document.body.classList;
  bodyClasslist.remove("game-view");
  bodyClasslist.add("lobby-view");
};

const joinGame = (gameId) => {
  console.log("player is trying to join ", gameId);
  socket.emit("playerJoiningGame", gameId);
};

export { joinLobby, joinGameRoom, joinGame };
