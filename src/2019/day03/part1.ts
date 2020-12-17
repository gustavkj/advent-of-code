import { getManhattanDistance } from '../../utils/get-manhattan-distance';
import { getIntersections, parseInput, startPoint, toPoint } from './util';

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
