function sumNumberAndBelow(num: number) {
  return Array<number>(num)
    .fill(0)
    .reduce((sum, _, i) => sum + num - i, 0);
}

function calculateConstantFuelConsumption(crabPositions: number[], targetPosition: number) {
  return crabPositions.reduce(
    (sum, crabPosition) => sum + Math.abs(crabPosition - targetPosition),
    0,
  );
}

function calculateIncrementalFuelConsumption(crabPositions: number[], targetPosition: number) {
  return crabPositions.reduce(
    (sum, crabPosition) => sum + sumNumberAndBelow(Math.abs(crabPosition - targetPosition)),
    0,
  );
}

function parseInput(input: string) {
  return input.split(',').map(Number);
}

export function part1(input: string): number {
  const crabPositions = parseInput(input);

  const min = Math.min(...crabPositions);
  const max = Math.max(...crabPositions);

  return Math.min(
    ...Array(max - min)
      .fill(0)
      .map((_, i) => calculateConstantFuelConsumption(crabPositions, min + i)),
  );
}

export function part2(input: string): number {
  const crabPositions = parseInput(input);

  const min = Math.min(...crabPositions);
  const max = Math.max(...crabPositions);

  return Math.min(
    ...Array(max - min)
      .fill(0)
      .map((_, i) => calculateIncrementalFuelConsumption(crabPositions, min + i)),
  );
}
