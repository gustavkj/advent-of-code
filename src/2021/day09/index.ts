function parseInput(input: string) {
  const rows = input.split('\n');

  return {
    heightMap: new Map(
      rows.flatMap((row, y) => row.split('').map((height, x) => [`${x},${y}`, Number(height)])),
    ),
    rowCount: rows.length,
    colCount: rows[0].length,
  };
}

function isLowPoint(heightMap: Map<string, number>, x: number, y: number) {
  const currentHeight = heightMap.get(`${x},${y}`);

  if (currentHeight === undefined) {
    throw new Error(`Expected to find height for ${x},${y}`);
  }

  return [`${x - 1},${y}`, `${x},${y - 1}`, `${x + 1},${y}`, `${x},${y + 1}`]
    .map((position) => heightMap.get(position))
    .filter(<T>(v: T | undefined): v is T => v !== undefined)
    .every((height) => currentHeight < height);
}

export function part1(input: string): number {
  const { heightMap, rowCount, colCount } = parseInput(input);

  const lowPoints: string[] = [];

  for (let y = 0; y < rowCount; y += 1) {
    for (let x = 0; x < colCount; x += 1) {
      if (isLowPoint(heightMap, x, y)) {
        lowPoints.push(`${x},${y}`);
      }
    }
  }

  return lowPoints.reduce(
    (riskSum, lowPointPosition) => riskSum + 1 + (heightMap.get(lowPointPosition) as number),
    0,
  );
}

function getNonNineNeighbors(
  heightMap: Map<string, number>,
  visitedPoints: Set<string>,
  x: number,
  y: number,
): string[] {
  const nonNineNeighbors = [
    `${x - 1},${y}`,
    `${x},${y - 1}`,
    `${x + 1},${y}`,
    `${x},${y + 1}`,
  ].filter((point) => {
    const height = heightMap.get(point);
    return !visitedPoints.has(point) && height !== undefined && height !== 9;
  });

  const neighborsNeighbors = nonNineNeighbors.flatMap((point) => {
    visitedPoints.add(point);
    const [pointX, pointY] = point.split(',').map(Number);

    return getNonNineNeighbors(heightMap, visitedPoints, pointX, pointY);
  });

  return nonNineNeighbors.concat(neighborsNeighbors);
}

export function part2(input: string): number {
  const { heightMap, rowCount, colCount } = parseInput(input);

  const visitedPoints = new Set<string>();

  const basinSizes: number[] = [];

  for (let y = 0; y < rowCount; y += 1) {
    for (let x = 0; x < colCount; x += 1) {
      const currentKey = `${x},${y}`;

      if (visitedPoints.has(currentKey)) {
        // eslint-disable-next-line no-continue
        continue;
      }

      visitedPoints.add(currentKey);

      const currentHeight = heightMap.get(currentKey);

      if (currentHeight === 9) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const basin = new Set(
        [currentKey].concat(getNonNineNeighbors(heightMap, visitedPoints, x, y)),
      );

      basinSizes.push(basin.size);
    }
  }

  return basinSizes
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((product, factor) => product * factor);
}
