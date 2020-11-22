import aocLoader from 'aoc-loader';
import config from '../../config';

export function calculateFuelRequirement(mass: number): number {
  return Math.floor(mass / 3) - 2;
}

function parseInput(input: string): number[] {
  return input.split('\n').map(Number);
}

async function solveDay1Part1(): Promise<void> {
  const input = await aocLoader(2019, 1, config.aocSessionCookie);

  const totalFuelRequirement = parseInput(input).reduce(
    (accFuel, moduleMass) => accFuel + calculateFuelRequirement(moduleMass),
    0,
  );

  console.log(totalFuelRequirement); // 3405637
}

if (require.main === module) {
  solveDay1Part1().catch(() => {
    console.log('Failed');
  });
}
