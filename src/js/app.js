import { Board } from "./model";

const fieldsElements = document.querySelectorAll(".board__item");
const panel = document.querySelector(".panel");
const btnReset = document.querySelector(".btn");
const modeSelect = document.querySelector(".mode");
const playingPlayer = document.querySelector(".player__playing");
const player = document.querySelector(".player");

class App {
  constructor() {
    this.board = new Board(this);
    this.bindEvents();
    this.getPlayingPlayers("X");
  }

  bindEvents() {
    modeSelect.addEventListener("change", (el) => {
      this.board.handleModeChange(el);
    });

    fieldsElements.forEach((field) => {
      field.addEventListener("click", (el) => this.board.handleClick(el));
    });

    btnReset.addEventListener("click", this.handleButtonResetClick.bind(this));
  }

  getPlayingPlayers(player) {
    playingPlayer.innerHTML = player;
  }

  getFieldForPosition(position) {
    return fieldsElements[position];
  }

  handleButtonResetClick() {
    this.resetBoard();
    this.board.handleReset();
  }

  displayWinner(activePlayer) {
    panel.innerHTML = `Congratulations ${activePlayer}! You won!`;
    panel.classList.add("panel__winner");
    player.classList.add("player__hidden");
  }

  displayDraw() {
    panel.innerHTML = "Draw!";
    panel.classList.add("panel__draw");
    player.classList.add("player__hidden");
  }

  displayLose() {
    panel.innerHTML = "You lose!";
    panel.classList.add("panel__lose");
    player.classList.add("player__hidden");
  }

  clearFieldsElements() {
    fieldsElements.forEach((el) => {
      el.classList.remove("board__item__filled--X", "board__item__filled--O");
    });
  }

  resetdisplayWinner() {
    panel.innerHTML = "";
    player.classList.remove("player__hidden");
    panel.classList.remove("panel__winner");
    panel.classList.remove("panel__draw");
    panel.classList.remove("panel__lose");
  }

  resetBoard() {
    this.clearFieldsElements();
    this.resetdisplayWinner();
  }
}

const app = new App();
