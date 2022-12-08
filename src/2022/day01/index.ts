function sum(numArray: number[]): number {
  return numArray.reduce((acc, val) => acc + val);
}

export function part1(input: string): number {
  const elves = input.split('\n\n').map((elfRows) => elfRows.split('\n').map(Number));

  return Math.max(...elves.map(sum));
}

export function part2(input: string): number {
  const elves = input.split('\n\n').map((elfRows) => elfRows.split('\n').map(Number));

  return sum(
    elves
      .map(sum)
      .sort((a, b) => b - a)
      .slice(0, 3),
  );
}
