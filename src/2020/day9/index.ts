function parseInput(input: string) {
  return input.split('\n').map(Number);
}

function isValid(value: number, data: number[]): boolean {
  return data.some((num) => data.includes(value - num));
}

export function part1(input: string, preambleSize = 25): number {
  const data = parseInput(input);

  let index = preambleSize;

  while (isValid(data[index], data.slice(index - preambleSize, index))) {
    index += 1;
  }

  return data[index]; // 14144619
}

export function part2(input: string, preambleSize = 25): number {
  const data = parseInput(input);

  let index = preambleSize;

  while (isValid(data[index], data.slice(index - preambleSize, index))) {
    index += 1;
  }

  const sumToSeek = data[index];

  let startIndex = 0;
  let sum = 0;
  let currentIndex = 0;

  while (sum !== sumToSeek && startIndex < index) {
    currentIndex = startIndex;
    sum = 0;

    while (sum < sumToSeek && currentIndex < index) {
      sum += data[currentIndex];
      currentIndex += 1;
    }

    startIndex += 1;
  }

  startIndex -= 1;
  currentIndex -= 1;

  if (sum !== sumToSeek) {
    throw new Error(`Did not find the sum ${sumToSeek} found ${sum} instead.`);
  }

  const range = data.slice(startIndex, currentIndex + 1);

  const smallest = Math.min(...range);
  const largest = Math.max(...range);

  return smallest + largest; // 1766397
}
