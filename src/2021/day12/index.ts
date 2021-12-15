class Cave {
  #caveType: 'big' | 'small';

  #name: string;

  #adjacentCaves: Cave[] = [];

  constructor(name: string) {
    this.#name = name;

    this.#caveType = name === name.toLowerCase() ? 'small' : 'big';
  }

  get name() {
    return this.#name;
  }

  addAdjacentCave(adjacentCave: Cave) {
    this.#adjacentCaves.push(adjacentCave);
  }

  get adjacentCaves() {
    return this.#adjacentCaves;
  }

  isSmall() {
    return this.#caveType === 'small';
  }
}

function parseInput(input: string) {
  const tunnels = input.split('\n').map((row) => row.split('-') as [string, string]);

  const caves = new Map<string, Cave>();

  tunnels.forEach((tunnel) => {
    const [caveAlfa, caveBeta] = tunnel;

    let caveAlfaData = caves.get(caveAlfa);
    let caveBetaData = caves.get(caveBeta);

    if (!caveAlfaData) {
      caveAlfaData = new Cave(caveAlfa);
      caves.set(caveAlfa, caveAlfaData);
    }

    if (!caveBetaData) {
      caveBetaData = new Cave(caveBeta);
      caves.set(caveBeta, caveBetaData);
    }

    caveAlfaData.addAdjacentCave(caveBetaData);
    caveBetaData.addAdjacentCave(caveAlfaData);
  });

  return caves;
}

export function part1(input: string): number {
  const caves = parseInput(input);

  const startCave = caves.get('start') as Cave;

  const pathsToExplore: Cave[][] = [[startCave]];
  const finishedPaths: Cave[][] = [];

  let path: Cave[] | undefined;
  // eslint-disable-next-line no-cond-assign
  while ((path = pathsToExplore.pop()) !== undefined) {
    const currentCave = path.slice(-1)[0];
    const { adjacentCaves } = currentCave;

    const possibleNextCaves = adjacentCaves.filter(
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      (cave) => !((path as Cave[]).includes(cave) && cave.isSmall()),
    );

    // eslint-disable-next-line @typescript-eslint/no-loop-func
    possibleNextCaves.forEach((cave) => {
      const nextPath = [...(path as Cave[]), cave];

      if (cave.name === 'end') {
        finishedPaths.push(nextPath);
      } else {
        pathsToExplore.push(nextPath);
      }
    });
  }

  return finishedPaths.length;
}

export function part2(input: string): number {
  const caves = parseInput(input);

  const startCave = caves.get('start') as Cave;

  const pathsToExplore: Cave[][] = [[startCave]];
  const finishedPaths: Cave[][] = [];

  let path: Cave[] | undefined;
  // eslint-disable-next-line no-cond-assign
  while ((path = pathsToExplore.pop()) !== undefined) {
    const currentCave = path.slice(-1)[0];
    const { adjacentCaves } = currentCave;

    const hasVisitedASmallCaveTwice =
      path.filter((cave, index, array) => cave.isSmall() && array.indexOf(cave) !== index).length >
      0;

    const possibleNextCaves = adjacentCaves.filter(
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      (cave) =>
        !((path as Cave[]).includes(cave) && cave.isSmall() && hasVisitedASmallCaveTwice) &&
        cave.name !== 'start',
    );

    // eslint-disable-next-line @typescript-eslint/no-loop-func
    possibleNextCaves.forEach((cave) => {
      const nextPath = [...(path as Cave[]), cave];

      if (cave.name === 'end') {
        finishedPaths.push(nextPath);
      } else {
        pathsToExplore.push(nextPath);
      }
    });
  }

  return finishedPaths.length;
}
