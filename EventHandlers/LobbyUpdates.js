export default function (io, app, socket, games) {
  this.io = io;
  this.app = app;
  this.socket = socket;
  this.games = games;

  // Expose handler methods for events
  this.handler = {
    getListOfGames: getListOfGames.bind(this),
    createNewGame: createNewGame.bind(this),
  };
}

function getListOfGames(text) {
  // Broadcast message to all sockets
  console.log("someone is requesting a list of games");
  broadcastAllGames(this.io, this.games);
}

function createNewGame(text) {
  const newGameId = Math.ceil(Math.random() * 1000);
  this.games.unshift({ id: newGameId, status: "open" });
  this.io.to(this.socket.id).emit("your new game", newGameId);
  broadcastAllGames(this.io, this.games);
}

const broadcastAllGames = (io, games) => {
  io.emit("list of games", games);
};
