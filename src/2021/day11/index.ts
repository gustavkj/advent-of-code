import { inputToNumberMap } from '../utils';

function energizeAndGetReadyNeighbors(map: Map<string, number>, x: number, y: number) {
  const neighbors = [
    `${x - 1},${y}`,
    `${x - 1},${y - 1}`,
    `${x},${y - 1}`,
    `${x + 1},${y - 1}`,
    `${x + 1},${y}`,
    `${x + 1},${y + 1}`,
    `${x},${y + 1}`,
    `${x - 1},${y + 1}`,
  ];

  return neighbors.filter((neighbor) => {
    const neighborOctopusEnergyLevel = map.get(neighbor);

    if (neighborOctopusEnergyLevel === undefined) {
      return false;
    }

    const newNeighborOctopusEnergyLevel = neighborOctopusEnergyLevel + 1;
    map.set(neighbor, newNeighborOctopusEnergyLevel);

    if (newNeighborOctopusEnergyLevel > 9) {
      // Neighbor octopus is also about flash (and hasn't flashed already)
      return true;
    }

    return false;
  });
}

export function part1(input: string): number {
  const { map, colCount, rowCount } = inputToNumberMap(input);

  let flashCounter = 0;

  for (let step = 0; step < 100; step += 1) {
    const octopusesReadyToFlash = new Set<string>();

    for (let y = 0; y < rowCount; y += 1) {
      for (let x = 0; x < colCount; x += 1) {
        const positionKey = `${x},${y}`;

        const octopusEnergyLevel = map.get(positionKey) as number;
        const newEnergyLevel = octopusEnergyLevel + 1;
        map.set(positionKey, newEnergyLevel);

        if (newEnergyLevel > 9) {
          octopusesReadyToFlash.add(positionKey);
        }
      }
    }

    const flashedOctopuses = new Set<string>();

    octopusesReadyToFlash.forEach((positionKey) => {
      const [x, y] = positionKey.split(',').map(Number);

      if (flashedOctopuses.has(positionKey)) {
        // The octopus has already flashed this step.
        return;
      }

      // Mark octopus as flashed
      flashedOctopuses.add(positionKey);

      const readyNeighbors = energizeAndGetReadyNeighbors(map, x, y);

      readyNeighbors.forEach((neighborPositionKey) => {
        octopusesReadyToFlash.add(neighborPositionKey);
      });
    });

    flashCounter += flashedOctopuses.size;

    flashedOctopuses.forEach((octopus) => {
      // Any octopus that flashed during this step has its energy level set to 0

      map.set(octopus, 0);
    });
  }

  return flashCounter;
}

export function part2(input: string): number {
  const { map, colCount, rowCount } = inputToNumberMap(input);

  const octopusCount = colCount * rowCount;
  let step = 1;

  while (true) {
    const octopusesReadyToFlash = new Set<string>();

    for (let y = 0; y < rowCount; y += 1) {
      for (let x = 0; x < colCount; x += 1) {
        const positionKey = `${x},${y}`;

        const octopusEnergyLevel = map.get(positionKey) as number;
        const newEnergyLevel = octopusEnergyLevel + 1;
        map.set(positionKey, newEnergyLevel);

        if (newEnergyLevel > 9) {
          octopusesReadyToFlash.add(positionKey);
        }
      }
    }

    const flashedOctopuses = new Set<string>();

    octopusesReadyToFlash.forEach((positionKey) => {
      const [x, y] = positionKey.split(',').map(Number);

      if (flashedOctopuses.has(positionKey)) {
        // The octopus has already flashed this step.
        return;
      }

      // Mark octopus as flashed
      flashedOctopuses.add(positionKey);

      const readyNeighbors = energizeAndGetReadyNeighbors(map, x, y);

      readyNeighbors.forEach((neighborPositionKey) => {
        octopusesReadyToFlash.add(neighborPositionKey);
      });
    });

    if (octopusCount === flashedOctopuses.size) {
      // All octopuses flashed this step
      break;
    }

    flashedOctopuses.forEach((octopus) => {
      // Any octopus that flashed during this step has its energy level set to 0

      map.set(octopus, 0);
    });

    step += 1;
  }

  return step;
}
