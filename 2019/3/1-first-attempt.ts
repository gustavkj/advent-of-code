import aocLoader from 'aoc-loader';
import config from '../../config';

interface Point {
  x: number;
  y: number;
}

function getNextPoints(currentPoint: Point, direction: string): Point[] {
  const multiplier = ['L', 'D'].includes(direction[0]) ? -1 : 1;
  const steps = Number(direction.slice(1));

  if (['U', 'D'].includes(direction[0])) {
    return Array.from({ length: steps }, (_, i) => ({
      x: currentPoint.x,
      y: currentPoint.y + multiplier * (i + 1),
    }));
  }

  return Array.from({ length: steps }, (_, i) => ({
    x: currentPoint.x + multiplier * (i + 1),
    y: currentPoint.y,
  }));
}

function getManhattanDistance(nodeA: Point, nodeB: Point): number {
  return Math.abs(nodeA.x - nodeB.x) + Math.abs(nodeA.y - nodeB.y);
}

export function getDistanceToClosestIntersection(wirePaths: string[][]): number {
  // startPoint defines where the wires start.
  const startPoint: Point = { x: 0, y: 0 };

  const wirePoints = wirePaths.map((wireSpec) =>
    wireSpec.reduce(
      (path, direction) => {
        return [...path, ...getNextPoints(path[path.length - 1], direction)];
      },
      [startPoint],
    ),
  );

  const intersections = wirePoints[0]
    .filter(
      (nodeW1) => !!wirePoints[1].find((nodeW2) => nodeW1.x === nodeW2.x && nodeW1.y === nodeW2.y),
    )
    .filter((node) => node.x !== startPoint.x && node.y !== startPoint.y);

  const shortestDistance = Math.min(
    ...intersections.map((intersection) => getManhattanDistance(intersection, startPoint)),
  );

  return shortestDistance;
}

function parseInput(input: string): string[][] {
  return input.split('\n').map((row) => row.split(','));
}

async function solveDay3Part1(): Promise<void> {
  const input = await aocLoader(2019, 3, config.aocSessionCookie);
  const wireSpecs = parseInput(input);

  // This did not work, I got 2200 which was way off.
  console.log(getDistanceToClosestIntersection(wireSpecs));
}

if (require.main === module) {
  solveDay3Part1().catch((err) => {
    console.log('Failed', err);
  });
}
