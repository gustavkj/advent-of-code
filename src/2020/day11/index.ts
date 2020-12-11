type SeatOrFloor = 'L' | '#' | '.';
type SeatMap = SeatOrFloor[][];

function parseInput(input: string): SeatMap {
  const seatMap = input.split('\n').map((row) => row.split(''));

  return seatMap as SeatMap;
}

function getOccupiedFactory(maxSteps = Infinity) {
  return function getOccupied(seats: SeatMap, y: number, x: number) {
    let direction = 0;
    let occupied = 0;

    while (direction < 8) {
      const deltaY = Math.round(Math.sin((Math.PI * direction) / 4));
      const deltaX = Math.round(Math.cos((Math.PI * direction) / 4));

      let step = 1;

      while (step <= maxSteps) {
        const seat = seats[y + step * deltaY]?.[x + step * deltaX];
        if (seat === '#') {
          occupied += 1;
          break;
        } else if (seat !== '.') {
          break;
        }

        step += 1;
      }

      direction += 1;
    }

    return occupied;
  };
}

function updateSeating(
  seats: SeatMap,
  maxOccupied = 4,
  getOccupied = getOccupiedFactory(1),
): { seats: SeatMap; updated: boolean } {
  let updated = false;

  const newSeats = seats.map((row, rowIndex) =>
    row.map((seat, seatIndex) => {
      if (seat === '.') {
        return seat;
      }

      const occupied = getOccupied(seats, rowIndex, seatIndex);

      if (seat === '#' && occupied >= maxOccupied) {
        updated = true;
        return 'L';
      }

      if (seat === 'L' && occupied === 0) {
        updated = true;
        return '#';
      }

      return seat;
    }),
  );

  return {
    seats: newSeats,
    updated,
  };
}

function getOccupiedSeats(seats: SeatMap) {
  return seats.reduce((sum, row) => sum + row.filter((seat) => seat === '#').length, 0);
}

export function part1(input: string): number {
  let seats = parseInput(input);

  let updated = false;

  do {
    ({ seats, updated } = updateSeating(seats));
  } while (updated);

  return getOccupiedSeats(seats); // 2183
}

export function part2(input: string): number {
  let seats = parseInput(input);

  let updated = false;

  do {
    ({ seats, updated } = updateSeating(seats, 5, getOccupiedFactory()));
  } while (updated);

  return getOccupiedSeats(seats); // 1990
}
