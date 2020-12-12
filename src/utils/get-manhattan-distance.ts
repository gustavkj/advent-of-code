import { Point } from '../types';

export function getManhattanDistance(pointA: Point, pointB: Point): number {
  const { x: x1, y: y1 } = pointA;
  const { x: x2, y: y2 } = pointB;

  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
