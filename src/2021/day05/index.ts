import { Point } from '../../types';

function getLineFactory(considerDiagonalLines = false) {
  return function getLine(lineInput: string) {
    const match = /(\d+),(\d+) -> (\d+),(\d+)/.exec(lineInput);
    const discreteLine: Point[] = [];

    if (!match) {
      throw new Error(`Line input: "${lineInput} does not match pattern"`);
    }

    const [x1, y1, x2, y2] = match.slice(1).map(Number);

    const dx = x2 - x1;
    const dy = y2 - y1;
    const kx = Math.sign(dx);
    const ky = Math.sign(dy);

    if (!considerDiagonalLines && kx !== 0 && ky !== 0) {
      return undefined;
    }

    let x = x1;
    let y = y1;
    let t = 0;

    while (x !== x2 || y !== y2) {
      x = x1 + kx * t;
      y = y1 + ky * t;

      discreteLine.push({ x, y });

      t += 1;
    }

    return discreteLine;
  };
}

function parseInput(input: string) {
  return input.split('\n');
}

function getNumberOfIntersections(lines: (Point[] | undefined)[]): number {
  const ventMap = new Map<string, number>();

  lines.forEach((line) => {
    line?.forEach((point) => {
      const { x, y } = point;
      const pointString = `${x},${y}`;
      const linesAtPoint = ventMap.get(pointString);

      if (!linesAtPoint) {
        ventMap.set(pointString, 1);
      } else {
        ventMap.set(pointString, linesAtPoint + 1);
      }
    });
  });

  const intersections = [...ventMap.entries()].filter(([, value]) => value >= 2);

  return intersections.length;
}

export function part1(input: string): number {
  const lines = parseInput(input).map(getLineFactory());

  return getNumberOfIntersections(lines); // 4873
}

export function part2(input: string): number {
  const lines = parseInput(input).map(getLineFactory(true));

  return getNumberOfIntersections(lines); // 19472
}
