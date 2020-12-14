function parseInput(input: string) {
  const [arrivalTimeString, busLinesString] = input.split('\n');
  const arrivalTime = Number(arrivalTimeString);
  const busLines = busLinesString.split(',').map(Number);
  const offset = busLines.reduce((o, busID, index) => {
    if (Number.isFinite(busID)) {
      return [...o, index];
    }
    return o;
  }, [] as number[]);

  const busLinesFiltered = busLines.filter(Number.isFinite);

  return {
    arrivalTime,
    busLines: busLinesFiltered,
    offset,
    remainders: busLinesFiltered.map((bus, index) => (bus - offset[index]) % bus),
  };
}

export function part1(input: string): number {
  const { arrivalTime, busLines } = parseInput(input);

  const intervalToSearch = Math.min(...busLines);
  let index = 1;

  while (index <= intervalToSearch) {
    const time = arrivalTime + index;
    let busIndex = 0;

    while (busIndex < busLines.length) {
      const busLine = busLines[busIndex];

      if (time % busLine === 0) {
        // 174
        return busLine * index;
      }

      busIndex += 1;
    }

    index += 1;
  }

  throw new Error(`Could not fund a bus within ${intervalToSearch} minutes of arival`);
}

export function part2(input: string): bigint {
  const { busLines, remainders } = parseInput(input);

  let time = 0n;
  let index = 0;

  // Solving using Chinese remainder theorem
  const N = busLines.map(BigInt).reduce((product, busID) => product * busID);

  while (index < busLines.length) {
    const n = BigInt(busLines[index]);
    const p = N / n;
    const a = BigInt(remainders[index]);

    const tmp = p % n;
    let j = 0n;
    while ((tmp * j) % n !== 1n) {
      j += 1n;
    }

    time += a * p * j;

    index += 1;
  }

  // Right answer: 780601154795940
  return time % N;
}
