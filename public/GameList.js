import { socket } from "./socket.js";
import { joinGameRoom, joinGame } from "./RoomManagement.js";

class GameList extends HTMLElement {
  connectedCallback() {
    this.setInnerHTML("No Active Games", []);
    socket.on("list of games", (games) =>
      this.setInnerHTML("Ongoing Games", games)
    );
  }
  handleClick;
  setInnerHTML(title, games) {
    this.innerHTML = "";
    const $title = this.appendChild(document.createElement("h3"));
    $title.textContent = title;

    let gameList = `<h3>${title}</h3>`;
    if (games.length > 0) {
      const $gameList = this.appendChild(
        document.createElement("div") // needs class of "list-of-games")
      );
      for (const game of games) {
        const $game = $gameList.appendChild(document.createElement("div"));
        $game.textContent = `#${game.id} - ${game.status}`;
        const $button = $game.appendChild(document.createElement("button"));
        $button.setAttribute("data-id", game.id);
        $button.classList.add("join-game-button");
        $button.textContent = `Join`;
        $button.classList.add = "joinGame";

        $button.addEventListener("click", () => {
          console.log("joining game ---", game.id);
          joinGameRoom(game.id);
          joinGame(game.id);
        });
      }
    }
  }
}

customElements.define("game-list", GameList);
