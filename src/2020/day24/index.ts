import { Point } from '../../types';
import { toKey, toPoint } from '../../utils';

const deltas: Record<string, Point> = {
  ne: { x: 0.5, y: 0.5 },
  e: { x: 1, y: 0 },
  se: { x: 0.5, y: -0.5 },
  sw: { x: -0.5, y: -0.5 },
  w: { x: -1, y: 0 },
  nw: { x: -0.5, y: 0.5 },
};

function getDelta(direction: string): Point {
  const delta = deltas[direction];

  if (!delta) {
    throw new Error(`Unknown direction: ${direction}`);
  }

  return delta;
}

function getStartingState(input: string) {
  const instructions = input.split('\n').map((line) => {
    const reg = /(se|ne|sw|nw|e|w)/g;
    let result: RegExpExecArray | null;
    const dir = [];

    // eslint-disable-next-line no-cond-assign
    while ((result = reg.exec(line)) !== null) {
      dir.push(result[1]);
    }

    return dir;
  });

  const flippedTiles = new Map<string, boolean>();
  const referencePoint: Point = { x: 0, y: 0 };

  instructions
    .map((instruction) => {
      const tile = { ...referencePoint };
      instruction.forEach((step) => {
        const { x: dx, y: dy } = getDelta(step);
        tile.x += dx;
        tile.y += dy;
      });
      return tile;
    })
    .forEach((tile) => {
      const key = toKey(tile);
      const currentState = flippedTiles.get(key) ?? false;
      flippedTiles.set(key, !currentState);
    });

  return { flippedTiles };
}

function getNumberOfFlippedTiles(flippedTiles: Map<string, boolean>) {
  return [...flippedTiles.values()].reduce((sum, isFlipped) => sum + (isFlipped ? 1 : 0), 0);
}

export function part1(input: string): number {
  const { flippedTiles } = getStartingState(input);

  return getNumberOfFlippedTiles(flippedTiles); // 373
}

function getNeighborsCoordinates(tile: Point) {
  return Object.values(deltas).map(
    ({ x: dx, y: dy }): Point => ({
      x: tile.x + dx,
      y: tile.y + dy,
    }),
  );
}

function getActiveNeighbors(tile: Point, flippedTiles: Map<string, boolean>) {
  return getNeighborsCoordinates(tile)
    .map((neighborTile) => flippedTiles.get(toKey(neighborTile)) ?? false)
    .filter(Boolean).length;
}

export function part2(input: string): number {
  const { flippedTiles } = getStartingState(input);

  let day = 1;
  while (day <= 100) {
    const coordsToGoThrough = new Set(
      [...flippedTiles.keys()]
        .map(toPoint)
        .flatMap((tile) => [tile, ...getNeighborsCoordinates(tile)]),
    );
    const currentState = new Map(flippedTiles);

    coordsToGoThrough.forEach((tile) => {
      const key = toKey(tile);
      const isFlipped = currentState.get(key) ?? false;

      const activeNeighbors = getActiveNeighbors(tile, currentState);

      if (isFlipped && activeNeighbors > 2) {
        flippedTiles.set(key, false);
      } else if (!isFlipped && activeNeighbors === 2) {
        flippedTiles.set(key, true);
      } else if (activeNeighbors === 0) {
        flippedTiles.delete(key);
      }
    });

    day += 1;
  }

  // 3917
  return getNumberOfFlippedTiles(flippedTiles);
}
