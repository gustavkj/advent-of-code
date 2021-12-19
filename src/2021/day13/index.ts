import assert from 'assert';
import { Point } from '../../types';
import { isTruthy } from '../../utils';

interface Fold {
  axis: 'x' | 'y';
  value: number;
}

function parseInput(input: string) {
  const [pointInput, foldInput] = input.split('\n\n');

  const points = pointInput.split('\n').map((row): Point => {
    const [x, y] = row.split(',').map(Number);
    return { x, y };
  });

  const folds = foldInput.split('\n').map((row): Fold => {
    const [axis, valueString] = row.replace('fold along ', '').split('=');

    assert(axis === 'x' || axis === 'y', `The axis is invalid: ${axis}`);

    return { axis, value: Number(valueString) };
  });

  return { points, folds };
}

function foldOrigami(points: Point[], fold: Fold): Point[] {
  const { axis, value } = fold;

  const origamiPoints = new Set(
    points
      .map((point): Point | undefined => {
        if (point[axis] === value) {
          return undefined;
        }
        if (point[axis] > value) {
          const newPosition = 2 * value - point[axis];

          return {
            ...point,
            [axis]: newPosition,
          };
        }
        return point;
      })
      .filter(isTruthy)
      .map(({ x, y }) => `${x},${y}`),
  );

  return [...origamiPoints].map((point) => {
    const [x, y] = point.split(',').map(Number);
    return { x, y };
  });
}

export function part1(input: string): number {
  const { points, folds } = parseInput(input);

  const firstFold = folds[0];

  const pointsAfterFirstFold = foldOrigami(points, firstFold);

  return pointsAfterFirstFold.length;
}

export function part2(input: string): string {
  const { points: initialPoints, folds } = parseInput(input);

  let points = [...initialPoints];

  folds.forEach((fold) => {
    points = foldOrigami(points, fold);
  });

  const maxX = Math.max(...points.map(({ x }) => x));
  const maxY = Math.max(...points.map(({ y }) => y));

  const display = Array<string[]>(maxY + 1).fill(Array<string>(maxX + 1).fill('.'));

  points.forEach(({ x, y }) => {
    const row = [...display[y]];
    row[x] = '#';
    display[y] = row;
  });

  return `\n${display.map((row) => row.join('')).join('\n')}`; // RLBCJGLU
}
