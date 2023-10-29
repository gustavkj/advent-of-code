import { Point } from '../../types';
import { toKey } from '../../utils';

/** Defines where the wires start. */
export const startPoint: Point = { x: 0, y: 0 };

export function parseInput(input: string): string[][] {
  return input.split('\n').map((row) => row.split(','));
}

export function getDirection(direction: string): Point {
  switch (direction[0]) {
    case 'U':
      return { x: 0, y: 1 };
    case 'R':
      return { x: 1, y: 0 };
    case 'D':
      return { x: 0, y: -1 };
    case 'L':
      return { x: -1, y: 0 };
    default:
      throw new Error(`Unknown direction: ${direction[0]}`);
  }
}

function getNextPoints(currentPoint: Point, direction: string): Point[] {
  const { x, y } = currentPoint;

  const { x: multiplierX, y: multiplierY } = getDirection(direction);
  const steps = Number(direction.slice(1));

  return Array.from({ length: steps }, (_, i) => ({
    x: x + multiplierX * (i + 1),
    y: y + multiplierY * (i + 1),
  }));
}

export function getIntersections(wirePaths: string[][]): Map<string, number> {
  const visited = new Map<string, number>();
  const intersections = new Map<string, number>();

  wirePaths.forEach((wireSpec, i) => {
    wireSpec.reduce(
      (path, direction) => {
        const nextPoints = getNextPoints(path[path.length - 1], direction);

        const distance = path.length;

        if (i === 0) {
          nextPoints.forEach((point, pointDistance) =>
            visited.set(toKey(point), distance + pointDistance),
          );
        } else {
          nextPoints.forEach((point, pointDistance) => {
            const key = toKey(point);
            if (visited.has(key)) {
              intersections.set(key, visited.get(key)! + distance + pointDistance);
            }
          });
        }

        return [...path, ...nextPoints];
      },
      [startPoint],
    );
  });

  return intersections;
}
