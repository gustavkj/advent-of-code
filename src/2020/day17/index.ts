function getCoords(...coordNums: number[]) {
  return coordNums.join(',');
}

function parseInput(input: string, dimensions = 3) {
  const pocketDimension = new Map<string, string>();

  const filler = Array.from<number>({ length: dimensions - 2 }).fill(0);
  input.split('\n').forEach((row, y) => {
    row.split('').forEach((cube, x) => {
      pocketDimension.set(getCoords(...[x, y, ...filler]), cube);
    });
  });

  return pocketDimension;
}

function isActive(cube: string | undefined) {
  return cube === '#';
}

function getNeighborsCoordinates(coordinates: string) {
  const focus = coordinates.split(',').map(Number);
  const delta = [-1, 0, 1];
  const neighborsCoordinates: string[] = [];

  let index = 0;
  while (index < 3 ** focus.length) {
    const deltaCoords = focus.map(
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      (_, dimIndex) => delta[Math.floor((index / 3 ** dimIndex) % 3)],
    );

    if (!deltaCoords.every((coord) => coord === 0)) {
      const coords = deltaCoords.map((dCoord, i) => focus[i] + dCoord);
      neighborsCoordinates.push(getCoords(...coords));
    }

    index += 1;
  }

  return neighborsCoordinates;
}

function getActiveNeighbors(coordinates: string, currentState: Map<string, string>) {
  return getNeighborsCoordinates(coordinates)
    .map((dCoord) => isActive(currentState.get(dCoord)))
    .filter(Boolean).length;
}

function getActiveCubesAfterIterations(pocketDimension: Map<string, string>): number {
  const maxIterations = 6;
  let i = 1;

  while (i <= maxIterations) {
    const currentState = new Map(pocketDimension);
    const coordinatesToCheck = new Set(
      [...pocketDimension.keys()].flatMap(getNeighborsCoordinates),
    );

    coordinatesToCheck.forEach((coordinates) => {
      const cube = pocketDimension.get(coordinates);
      const activeNeighbors = getActiveNeighbors(coordinates, currentState);

      if (isActive(cube)) {
        if (!(activeNeighbors === 2 || activeNeighbors === 3)) {
          pocketDimension.set(coordinates, '.');
        }
      } else if (activeNeighbors === 3) {
        pocketDimension.set(coordinates, '#');
      } else if (activeNeighbors === 0) {
        pocketDimension.delete(coordinates);
      }
    });

    i += 1;
  }

  return [...pocketDimension.values()].filter(isActive).length;
}

export function part1(input: string): number {
  const pocketDimension = parseInput(input);
  return getActiveCubesAfterIterations(pocketDimension); // 386
}

export function part2(input: string): number {
  const pocketDimension = parseInput(input, 4);
  return getActiveCubesAfterIterations(pocketDimension); // 2276
}
