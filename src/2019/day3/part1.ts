import { Point } from './types';
import { getIntersections, parseInput, startPoint, toPoint } from './util';

function getManhattanDistance(nodeA: Point, nodeB: Point): number {
  const { x: x1, y: y1 } = nodeA;
  const { x: x2, y: y2 } = nodeB;

  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export function getDistanceToClosestIntersection(wirePaths: string[][]): number {
  const intersections = getIntersections(wirePaths);

  const shortestDistance = Math.min(
    ...[...intersections.keys()].map((intersection) =>
      getManhattanDistance(toPoint(intersection), startPoint),
    ),
  );

  return shortestDistance;
}

export function part1(input: string): number {
  const wireSpecs = parseInput(input);

  return getDistanceToClosestIntersection(wireSpecs); // 207
}
