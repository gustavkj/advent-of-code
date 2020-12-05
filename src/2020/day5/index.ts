function findPlaceFactory(lowerIndicator: string, upperIndicator: string, startMax: number) {
  return function findPlace(instructions: string[]): number {
    return instructions.reduce(
      (rowRange, curInst) => {
        const [min, max] = rowRange;
        const change = Math.round((max - min) / 2);

        if (curInst === lowerIndicator) {
          const newMax = max - change;

          return [min, newMax];
        }
        if (curInst === upperIndicator) {
          const newMin = min + change;

          return [newMin, max];
        }

        throw new Error(`Unknown inst: ${curInst}`);
      },
      [0, startMax],
    )[0];
  };
}

const findRow = findPlaceFactory('F', 'B', 127);
const findCol = findPlaceFactory('L', 'R', 7);

export function getSeatID(boardingPass: string): number {
  const rowInst = boardingPass.slice(0, -3).split('');
  const colInst = boardingPass.slice(-3).split('');

  const row = findRow(rowInst);
  const col = findCol(colInst);

  return row * 8 + col; // 930
}

export function part1(input: string): number {
  return Math.max(...input.split('\n').map(getSeatID));
}

export function part2(input: string): number {
  const seatIDs = input.split('\n').map(getSeatID);

  const [mySeatID] = seatIDs
    .filter((seatID) => {
      return seatIDs.includes(seatID + 2) && !seatIDs.includes(seatID + 1);
    })
    .map((seatID) => seatID + 1);

  return mySeatID; // 515
}
