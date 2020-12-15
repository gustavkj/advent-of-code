function parseInput(input: string) {
  return input.split(',').map(Number);
}

function whatsTheNthNumber(startingNumbers: number[], n: number): number {
  const numberStore: Record<number, number> = {};

  startingNumbers.forEach((startNum, index) => {
    numberStore[startNum] = index + 1;
  });

  let [numberLastSpoken] = startingNumbers.slice(-1);
  let index = startingNumbers.length + 1;

  while (index <= n) {
    let spokenNumber: number;
    if (!numberStore[numberLastSpoken]) {
      spokenNumber = 0;
    } else {
      spokenNumber = index - 1 - numberStore[numberLastSpoken];
    }

    numberStore[numberLastSpoken] = index - 1;
    numberLastSpoken = spokenNumber;
    index += 1;
  }

  return numberLastSpoken;
}

export function part1(input: string): number {
  const startingNumbers = parseInput(input);

  return whatsTheNthNumber(startingNumbers, 2020); // 496
}

export function part2(input: string): number {
  const startingNumbers = parseInput(input);

  // Although it took 393 seconds, the answer is 883
  return whatsTheNthNumber(startingNumbers, 30000000);
}
