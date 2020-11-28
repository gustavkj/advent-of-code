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

export function part2(input: string): number {
  const totalFuelRequirement = parseInput(input).reduce(
    (accFuel, moduleMass) => accFuel + calculateFuelRequirement(moduleMass),
    0,
  );

  return totalFuelRequirement; // 5105597
}
