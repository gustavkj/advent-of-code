import { Falsy, Point } from '../types';

export function getManhattanDistance(pointA: Point, pointB: Point): number {
  const { x: x1, y: y1 } = pointA;
  const { x: x2, y: y2 } = pointB;

  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export function toPoint(key: string): Point {
  const [x, y] = key.split(',').map(Number);
  return { x, y };
}

export function toKey(point: Point): string {
  const { x, y } = point;

  return `${x},${y}`;
}

export function isTruthy<T>(x: T | Falsy): x is T {
  return Boolean(x);
}
