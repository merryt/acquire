var socket = io();

class GameList extends HTMLElement {
  connectedCallback() {
    this.setInnerHTML("No Active Games", []);
    socket.on("list of games", (gamesStr) => {
      const gamesObj = JSON.parse(gamesStr);
      const games = gamesObj["games"];
      this.setInnerHTML("Ongoing Games", games);
    });
  }

  setInnerHTML(title, games) {
    let gameList = `<h3>${title}</h3>`;
    if (games.length > 0) {
      gameList += "<div>";
      for (const game of games) {
        gameList += `<a href="#" data-id="${game.id}">${game.name}</a>`;
      }
      gameList += "</div>";
    }
    this.innerHTML = gameList;
  }
}

customElements.define("game-list", GameList);
