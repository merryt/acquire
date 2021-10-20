const joinGame = (gameId) => {
  console.log("joining game");
  const bodyClasslist = document.body.classList;
  bodyClasslist.add("game-view");
  bodyClasslist.remove("lobby-view");
  document.querySelector("#activeGame").dataset.gameId = gameId;
};

const joinLobby = () => {
  console.log("joining lobby");
  const bodyClasslist = document.body.classList;
  bodyClasslist.remove("game-view");
  bodyClasslist.add("lobby-view");
};

export { joinLobby, joinGame };
