export class EasyGame {
  getMove(fields) {
    const emptyFields = Object.entries(fields)
      .filter((field) => field[1] === "")
      .map((field) => field[0]);

    const randomPosition = Math.trunc(Math.random() * emptyFields.length);

    return emptyFields[randomPosition];
  }
}
