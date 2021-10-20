var socket = io();

class GameList extends HTMLElement {
  connectedCallback() {
    this.setInnerHTML("No Active Games", []);
    socket.on("list of games", (gamesStr) =>
      this.setInnerHTML("Ongoing Games", gamesStr)
    );
  }

  setInnerHTML(title, games) {
    let gameList = `<h3>${title}</h3>`;
    if (games.length > 0) {
      gameList += `<div class="list-of-games">`;
      for (const game of games) {
        gameList += `<span><a href="#" data-id="${game.id}">Game #${game.id}</a> - ${game.status}</span>`;
      }
      gameList += "</div>";
    }
    this.innerHTML = gameList;
  }
}

customElements.define("game-list", GameList);
