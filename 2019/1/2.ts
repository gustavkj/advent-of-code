import getInput from 'aoc-loader';
import config from '../../config';

export function calculateFuelRequirement(mass: number): number {
  const fuel = Math.floor(mass / 3) - 2;

  if (fuel < 0) {
    return 0;
  }

  return fuel + calculateFuelRequirement(fuel);
}

function parseInput(input: string): number[] {
  return input.split('\n').map(Number);
}

async function solveDay1Part2(): Promise<void> {
  const input = await getInput(2019, 1, config.aocSessionCookie);

  if (!input) {
    throw new Error('Failed to fetch input data');
  }

  const totalFuelRequirement = parseInput(input).reduce(
    (accFuel, moduleMass) => accFuel + calculateFuelRequirement(moduleMass),
    0,
  );

  console.log(totalFuelRequirement); // 5105597
}

if (require.main === module) {
  solveDay1Part2().catch(() => {
    console.log('Failed');
  });
}
