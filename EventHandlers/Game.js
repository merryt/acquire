export default function (io, app, socket, games) {
  this.io = io;
  this.app = app;
  this.socket = socket;
  this.games = games;

  // Expose handler methods for events
  this.handler = {
    playerJoiningGame: playerJoiningGame.bind(this), // use the bind function to access this.app
    playerStartsGame: playerStartsGame.bind(this), // use the bind function to access this.app
  };
}

// Events

function playerJoiningGame(gameIdstr) {
  const gameId = Number.parseInt(gameIdstr);
  // Broadcast message to all sockets
  console.log("player is joining game: " + gameId);
  const playerID = this.socket.id;
  const activeGame = this.games.find((game) => game.id === gameId);
  if (activeGame.players) {
    activeGame.players.push(playerID);
  } else {
    activeGame.players = [playerID];
  }
  console.log(this.games);
}

function rowLabel(row) {
  return "ABCDEFGHI".charAt(row - 1);
}

function playerStartsGame(gameIdstr) {
  console.log("someone is starting this game");

  //Tiles is a 11 rows by 14 columns character array
  //Rows 0 and 10 are edges, Columns 0 and 13 are edges
  //Each tile is one of the following:
  //E - edge
  //B - bag
  //X - non-chain tile on board
  //#n - tile in player n's tray
  //A,C,F,I,L,T,W - chain letter designation (as chains are formed)

  const gameId = Number.parseInt(gameIdstr);
  const activeGame = this.games.find((game) => game.id === gameId);
  const playerID = this.socket.id;
  console.log("Number of players ... " + activeGame.players.length);

  var tiles = Array(11);
  for (var i = 0; i <= 10; i++) {
    tiles[i] = new Array(14);
  }
  //clear the board 'B' : Empty board piece
  for (let i = 1; i <= 10; i++)
    for (let j = 1; j <= 12; j++) {
      tiles[i][j] = "B";
    }
  //assign top/bottom edge tiles labeled 'E'
  for (let i = 0; i <= 13; i++) {
    tiles[0][i] = "E";
    tiles[10][i] = "E";
  }
  //assign left/right edge tiles labeled 'E'
  for (let i = 0; i <= 10; i++) {
    tiles[i][0] = "E";
    tiles[i][13] = "E";
  }

  var numberOfPlayers = activeGame.players.length;

  //Draw tiles for players
  for (let playerNumber = 1; playerNumber <= numberOfPlayers; playerNumber++) {
    {
      var tilesForPlayer = 0;
      while (tilesForPlayer < 7) {
        var randomRow = Math.floor(Math.random() * 9) + 1;
        var randomColumn = Math.floor(Math.random() * 12) + 1;
        if (tiles[randomRow][randomColumn] == "B") {
          if (tilesForPlayer == 0) tiles[randomRow][randomColumn] = "X";
          else tiles[randomRow][randomColumn] = playerNumber + "";
          tilesForPlayer++;
        }
      }
    }
  }
  //store the tiles in the games object
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 13; j++) {
      activeGame.tiles.push(tiles[i][j]);
    }
  }
  //send tiles to each player
  for (let playerNumber = 1; playerNumber <= numberOfPlayers; playerNumber++) {
    // Use socket to communicate with this particular client only, sending it it's own id
    var tray = "";
    for (var i = 1; i <= 9; i++)
      for (var j = 1; j <= 12; j++) {
        //activeGame.tiles.push(tiles[i][j]);
        if (tiles[i][j] == playerNumber.toString()) tray += rowLabel(i) + j;
      }
    this.socket.emit("log", {
      message: "Here are your tiles player" + playerNumber + " " + tray,
      id: this.socket.id,
    });
  }
  console.log(this.games);
}
