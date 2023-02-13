import { winningFields } from "./config";

export class MediumGame {
  getMove(fields) {
    for (let i = 0; i <= 7; i++) {
      const [posA, posB, posC] = winningFields[i];
      const value1 = fields[posA];
      const value2 = fields[posB];
      const value3 = fields[posC];
      if (value1 === value2 && value1 !== "" && value3 === "") {
        return posC;
      } else if (value1 === value3 && value1 !== "" && value2 === "") {
        return posB;
      } else if (value2 === value3 && value2 !== "" && value1 === "") {
        return posA;
      }
    }

    const emptyFields = Object.entries(fields)
      .filter((field) => field[1] === "")
      .map((field) => field[0]);

    const randomPosition = Math.trunc(Math.random() * emptyFields.length);

    return emptyFields[randomPosition];
  }
}
