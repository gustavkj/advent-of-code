import aocLoader from 'aoc-loader';
import config from '../../config';

function getXY(node: string): number[] {
  return node.split(',').map(Number);
}

function getNextPoints(currentPoint: string, direction: string): string[] {
  const [x, y] = getXY(currentPoint);

  const multiplier = ['L', 'D'].includes(direction[0]) ? -1 : 1;
  const steps = Number(direction.slice(1));

  if (['U', 'D'].includes(direction[0])) {
    return Array.from({ length: steps }, (_, i) => `${x},${y + multiplier * (i + 1)}`);
  }

  return Array.from({ length: steps }, (_, i) => `${x + multiplier * (i + 1)},${y}`);
}

export function getFewestStepsToIntersection(wirePaths: string[][]): number {
  // startPoint defines where the wires start.
  const startPoint = '0,0';

  const wirePoints = wirePaths.map((wireSpec) =>
    wireSpec.reduce(
      (path, direction) => {
        return [...path, ...getNextPoints(path[path.length - 1], direction)];
      },
      [startPoint],
    ),
  );

  const intersections = wirePoints[0]
    .filter((node) => wirePoints[1].includes(node))
    .filter((node) => node !== startPoint);

  const fewestSteps = Math.min(
    ...intersections.map((intersection) =>
      wirePoints.reduce(
        (steps, wire) => steps + wire.findIndex((node) => node === intersection),
        0,
      ),
    ),
  );

  return fewestSteps;
}

function parseInput(input: string): string[][] {
  return input.split('\n').map((row) => row.split(','));
}

async function solveDay3Part2(): Promise<void> {
  const input = await aocLoader(2019, 3, config.aocSessionCookie);
  const wireSpecs = parseInput(input);

  console.log(getFewestStepsToIntersection(wireSpecs)); // 21196
}

if (require.main === module) {
  solveDay3Part2().catch((err) => {
    console.log('Failed', err);
  });
}
