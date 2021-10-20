export default function (io, app, socket) {
  this.io = io;
  this.app = app;
  this.socket = socket;

  // Expose handler methods for events
  this.handler = {
    getListOfGames: getListOfGames.bind(this), // use the bind function to access this.app
  };
}

// Events

function getListOfGames(text) {
  // Broadcast message to all sockets
  console.log("someone is requesting a list of games");
  this.io.emit(
    "list of games",
    `{"games": [{"name": "buzzy-dwarf", "id": 123, "status": "open"}]}`
  );
}
