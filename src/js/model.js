import { EasyGame } from "./easyGame";
import { MediumGame } from "./mediumGame";
import { winningFields } from "./config";

export class Board {
  fields;
  activePlayer;
  activeGame;
  currentMode = null; // null = pvp
  moveAI = false;

  constructor(app) {
    this.app = app;
    this.easyGame = new EasyGame();
    this.mediumGame = new MediumGame();

    this.resetGame();
  }

  handleModeChange(e) {
    this.currentMode = this.getModeClass(e.target.value);
    this.resetGame(false);
    this.app.resetBoard();
  }

  getModeClass(name) {
    if (name === "easy") return this.easyGame;
    if (name === "medium") return this.mediumGame;
    return null;
  }

  handleClick(el) {
    const { pos } = el.target.dataset;
    if (this.activeGame && this.fields[pos] === "") {
      this.makeMove(pos);
    }

    if (this.activeGame && this.currentMode !== null) {
      this.makeMoveAI();
    }
  }

  handleReset() {
    this.resetGame(!this.moveAI);
    this.firstMoveAI();
    this.app.getPlayingPlayers(this.activePlayer);
  }

  makeMove(position) {
    this.fields[position] = this.activePlayer;
    this.app
      .getFieldForPosition(position)
      .classList.add(`board__item__filled--${this.activePlayer}`);
    this.validateGame();
    this.activePlayer = this.activePlayer === "X" ? "O" : "X";
    this.app.getPlayingPlayers(this.activePlayer);
  }

  firstMoveAI() {
    if (this.moveAI && this.currentMode !== null) {
      this.makeMoveAI();
    }
  }

  makeMoveAI() {
    this.makeMove(this.currentMode.getMove(this.fields, this.activePlayer));
  }

  validateGame() {
    let gameWon = false;
    for (let i = 0; i <= 7; i++) {
      const [posA, posB, posC] = winningFields[i];
      const value1 = this.fields[posA];
      const value2 = this.fields[posB];
      const value3 = this.fields[posC];
      if (value1 !== "" && value1 === value2 && value1 === value3) {
        gameWon = true;
        break;
      }
    }

    if (gameWon) {
      this.activeGame = false;
      this.app.displayWinner(this.activePlayer);
    } else if (this.isBoardFull()) {
      this.activeGame = false;
      this.app.displayDraw();
    }
  }

  isBoardFull() {
    return this.fields.find((field) => field === "") === undefined;
  }

  resetGame(moveforAI) {
    this.fields = ["", "", "", "", "", "", "", "", ""];
    this.activePlayer = "X";
    this.activeGame = true;
    this.moveAI = moveforAI !== undefined ? moveforAI : false;
  }
}
