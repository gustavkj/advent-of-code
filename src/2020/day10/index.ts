function parseInput(input: string) {
  return input.split('\n').map(Number);
}

export function part1(input: string): number {
  const adapters = new Set(parseInput(input));

  const maxJoltage = Math.max(...adapters) + 3;
  let currentJoltage = 0;
  const differences: Record<number, number> = {
    1: 0,
    2: 0,
    3: 1, // The device's built-in adapter
  };

  while (currentJoltage < maxJoltage) {
    let joltageRating = 1;

    while (joltageRating <= 3) {
      if (adapters.has(currentJoltage + joltageRating)) {
        differences[joltageRating] += 1;
        adapters.delete(currentJoltage + joltageRating);
        break;
      } else {
        joltageRating += 1;
      }
    }

    currentJoltage += joltageRating;
  }

  return differences[1] * differences[3]; // 2312
}

export function part2(input: string): number {
  const adapters = parseInput(input).sort((a, b) => a - b);
  const maxJoltage = Math.max(...adapters) + 3;

  // For every adapter (by joltage) how many paths (upwards) is it part of.
  const adapterPaths: Record<number, number> = {
    [maxJoltage]: 1,
  };

  [0, ...adapters].reverse().forEach((currentJoltage) => {
    const numberOfPaths = [1, 2, 3]
      .map((joltageRating) => currentJoltage + joltageRating)
      .filter((adapterJoltage) => adapterPaths[adapterJoltage] !== undefined)
      .reduce((accAdapterCons, adapterJoltage) => accAdapterCons + adapterPaths[adapterJoltage], 0);
    adapterPaths[currentJoltage] = numberOfPaths;
  });

  return adapterPaths[0]; // 12089663946752
}
