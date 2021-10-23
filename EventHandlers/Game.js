export default function (io, app, socket, games) {
  this.io = io;
  this.app = app;
  this.socket = socket;
  this.games = games;

  // Expose handler methods for events
  this.handler = {
    playerJoiningGame: playerJoiningGame.bind(this), // use the bind function to access this.app
  };
}

// Events

function playerJoiningGame(gameIdstr) {
  const gameId = Number.parseInt(gameIdstr);
  // Broadcast message to all sockets
  console.log("player is joining game: " + gameId);
  const playerID = this.socket.id;
  const activeGame = this.games.find((game) => game.id === gameId);
  if(activeGame.players){
    activeGame.players.push(playerID);
  }else{
    activeGame.players = [playerID}
  }
  console.log(this.games);
}
