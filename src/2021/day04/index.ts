import { Point } from '../../types';

class BingoBoard {
  #boardNumbers: number[][] = [];

  #numberMap = new Map<number, Point>();

  #markedPositions = new Map<string, boolean>();

  #bingo = false;

  #finalScore = 0;

  #rowLength = 0;

  #colLength = 0;

  constructor(boardInput: string) {
    const bingoRowPattern = /(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g;

    let matches: RegExpExecArray | null;
    let index = 0;
    // eslint-disable-next-line no-cond-assign
    while ((matches = bingoRowPattern.exec(boardInput)) !== null) {
      this.#boardNumbers[index] = matches.slice(1).map(Number);
      index += 1;
    }

    this.#rowLength = this.#boardNumbers.length;
    this.#colLength = this.#boardNumbers[0].length;

    this.#boardNumbers.forEach((row, y) => {
      row.forEach((num, x) => {
        const position: Point = { x, y };
        this.#numberMap.set(num, position);
        this.#markedPositions.set(`${x},${y}`, false);
      });
    });
  }

  markNumber(num: number): void {
    const position = this.#numberMap.get(num);

    if (position && !this.#bingo) {
      const { x, y } = position;

      this.#markedPositions.set(`${x},${y}`, true);

      // Check row
      const bingoOnRow = new Array(this.#colLength)
        .fill(0)
        .every((_, dx) => this.#markedPositions.get(`${dx},${y}`));

      // Check column
      const bingoOnCol = new Array(this.#rowLength)
        .fill(0)
        .every((_, dy) => this.#markedPositions.get(`${x},${dy}`));

      this.#bingo = bingoOnRow || bingoOnCol;

      if (this.#bingo) {
        this.#finalScore = this.#getSumOfUnmarked() * num;
      }
    }
  }

  hasBingo(): boolean {
    return this.#bingo;
  }

  getFinalScore(): number {
    return this.#finalScore;
  }

  #getSumOfUnmarked(): number {
    return [...this.#markedPositions.entries()].reduce((sum, [position, marked]) => {
      const [x, y] = position.split(',').map(Number);
      return sum + (marked ? 0 : this.#boardNumbers[y][x]);
    }, 0);
  }
}

function parseInput(input: string): { drawOrder: number[]; bingoBoards: BingoBoard[] } {
  const [drawOrderString, ...bingoBoardStrings] = input.split('\n\n');
  const drawOrder = drawOrderString.split(',').map(Number);

  const bingoBoards = bingoBoardStrings.map((boardString) => new BingoBoard(boardString));

  return { drawOrder, bingoBoards };
}

export function part1(input: string): number {
  const { drawOrder, bingoBoards } = parseInput(input);
  let finalScore = 0;

  // Step through draw order
  for (let index = 0; index < drawOrder.length; index += 1) {
    const drawNumber = drawOrder[index];

    const boardWithBingo = bingoBoards.find((bingoBoard) => {
      // Mark numbers on each board
      bingoBoard.markNumber(drawNumber);

      // Check if each board has bingo
      return bingoBoard.hasBingo();
    });

    // If a board has bingo, get unmarked numbers
    if (boardWithBingo) {
      // Sum unmarked numbers and multiply by last draw number
      finalScore = boardWithBingo.getFinalScore();
      break;
    }
  }

  return finalScore;
}

export function part2(input: string): number {
  const { drawOrder, bingoBoards } = parseInput(input);
  let finalScore = 0;
  let boardsOfInterest = [...bingoBoards];

  // Step through draw order
  for (let index = 0; index < drawOrder.length; index += 1) {
    const drawNumber = drawOrder[index];

    if (boardsOfInterest.length > 1) {
      // If a board has bingo, remove it from the deck
      boardsOfInterest = boardsOfInterest.filter((bingoBoard) => {
        // Mark numbers on each board
        bingoBoard.markNumber(drawNumber);

        // Check if each board has bingo
        return !bingoBoard.hasBingo();
      });
    } else {
      // If only one board remains see if it get bingo this turn and if so return its final score

      boardsOfInterest[0].markNumber(drawNumber);
      const hasBingo = boardsOfInterest[0].hasBingo();

      if (hasBingo) {
        finalScore = boardsOfInterest[0].getFinalScore();
        break;
      }
    }
  }

  return finalScore;
}
