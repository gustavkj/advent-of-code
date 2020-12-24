import { Point } from '../../types';
import { getManhattanDistance } from '../../utils';

const directions = <const>['E', 'N', 'W', 'S'];

type Direction = typeof directions[number];

interface Instruction {
  action: Direction | 'L' | 'R' | 'F';
  value: number;
}

function isDirection(x: string): x is Direction {
  return directions.includes(x as Direction);
}

function deltaPoint(direction: Direction, value: number) {
  const point: Point = { x: 0, y: 0 };

  switch (direction) {
    case 'N':
      point.y += value;
      break;
    case 'S':
      point.y -= value;
      break;
    case 'E':
      point.x += value;
      break;
    case 'W':
      point.x -= value;
      break;
    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Unknown direction: ${direction}`);
  }

  return point;
}

function parseInput(input: string): Instruction[] {
  return input.split('\n').map((row) => ({
    action: row.slice(0, 1) as Instruction['action'],
    value: Number(row.slice(1)),
  }));
}

export function part1(input: string): number {
  const instructions = parseInput(input);
  const startPoint: Point = { x: 0, y: 0 };
  const currentPoint: Point = { ...startPoint };
  let direction: Direction = 'E';

  instructions.forEach(({ action, value }) => {
    if (isDirection(action) || action === 'F') {
      const delta = deltaPoint(action === 'F' ? direction : action, value);

      currentPoint.x += delta.x;
      currentPoint.y += delta.y;
    } else {
      const multiplier = action === 'L' ? 1 : -1;
      const index = directions.indexOf(direction);
      const steps = ((multiplier * value) / 90) % 4;

      [direction] = directions.slice((index + steps) % 4);
    }
  });

  return getManhattanDistance(startPoint, currentPoint); // 1133
}

export function part2(input: string): number {
  const instructions = parseInput(input);
  const startPoint: Point = { x: 0, y: 0 };
  const wayPoint: Point = { x: 10, y: 1 };
  const currentPoint: Point = { ...startPoint };

  instructions.forEach(({ action, value }) => {
    if (action === 'F') {
      currentPoint.x += wayPoint.x * value;
      currentPoint.y += wayPoint.y * value;
    } else if (isDirection(action)) {
      const delta = deltaPoint(action, value);

      wayPoint.x += delta.x;
      wayPoint.y += delta.y;
    } else {
      const multiplier = action === 'L' ? 1 : -1;
      const radians = (value * multiplier * Math.PI) / 180;

      const { x, y } = wayPoint;

      wayPoint.x = Math.round(x * Math.cos(radians) - y * Math.sin(radians));
      wayPoint.y = Math.round(x * Math.sin(radians) + y * Math.cos(radians));
    }
  });

  return getManhattanDistance(startPoint, currentPoint); // 61053
}
