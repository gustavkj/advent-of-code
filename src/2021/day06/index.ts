function getSpawnDays(fish: number, offsetDay: number, days: number) {
  const daysBetweenSpawns = 7;
  let k = 0;
  let day: number;
  const spawnDays: number[] = [];

  // eslint-disable-next-line no-cond-assign
  while ((day = offsetDay + fish + 1 + k * daysBetweenSpawns) <= days) {
    spawnDays.push(day);
    k += 1;
  }

  return spawnDays;
}

function getNumberOfLanterfishAfterDays(initialSchoolOfFish: number[], days: number) {
  const spawnsPerDay: Record<number, number> = {};
  let numberOfFish = initialSchoolOfFish.length;

  initialSchoolOfFish.forEach((fish) => {
    getSpawnDays(fish, 0, days).forEach((day) => {
      spawnsPerDay[day] = (spawnsPerDay[day] ?? 0) + 1;
    });
  });

  for (let day = 1; day <= days; day += 1) {
    const numberOfSpawns = spawnsPerDay[day];

    if (!numberOfSpawns) {
      // eslint-disable-next-line no-continue
      continue;
    }

    numberOfFish += numberOfSpawns;

    // Get spawn days for the school of fish which will spawn on the given day and add their number to each future spawn day of the school.
    getSpawnDays(8, day, days).forEach((spawnDay) => {
      spawnsPerDay[spawnDay] = (spawnsPerDay[spawnDay] ?? 0) + numberOfSpawns;
    });
  }

  return numberOfFish;
}

function parseInput(input: string) {
  return input.split(',').map(Number);
}

export function part1(input: string): number {
  const schoolOfFish = parseInput(input);

  return getNumberOfLanterfishAfterDays(schoolOfFish, 80); // 390923
}

export function part2(input: string): number {
  const schoolOfFish = parseInput(input);

  return getNumberOfLanterfishAfterDays(schoolOfFish, 256); // 1749945484935
}
