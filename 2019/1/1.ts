export function calculateFuelRequirement(mass: number): number {
  return Math.floor(mass / 3) - 2;
}

function parseInput(input: string): number[] {
  return input.split('\n').map(Number);
}

export function part1(input: string): number {
  const totalFuelRequirement = parseInput(input).reduce(
    (accFuel, moduleMass) => accFuel + calculateFuelRequirement(moduleMass),
    0,
  );

  return totalFuelRequirement; // 3405637
}
