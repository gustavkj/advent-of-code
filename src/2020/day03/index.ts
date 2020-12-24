import { Point } from '../../types';
import { toKey } from '../../utils';

function parseInput(input: string): { treeMap: Map<string, boolean>; dimensions: Point } {
  const treeMap = new Map<string, boolean>();
  const rows = input.split('\n');

  rows.forEach((row, y) => {
    [...row].forEach((cell, x) => {
      if (cell === '#') {
        treeMap.set(toKey({ x, y }), true);
      }
    });
  });

  return { treeMap, dimensions: { x: rows[0].length, y: rows.length } };
}

function traverseUntilBottom(treeMap: Map<string, boolean>, dimensions: Point, delta: Point) {
  const curPos: Point = { x: 0, y: 0 };

  let treesEncountered = 0;

  while (curPos.y < dimensions.y) {
    curPos.x = (curPos.x + delta.x) % dimensions.x;
    curPos.y += delta.y;

    treesEncountered += treeMap.has(toKey(curPos)) ? 1 : 0;
  }

  return treesEncountered;
}

export function part1(input: string): number {
  const { treeMap, dimensions } = parseInput(input);

  return traverseUntilBottom(treeMap, dimensions, { x: 3, y: 1 });
}

export function part2(input: string): number {
  const { treeMap, dimensions } = parseInput(input);

  const slopes: Point[] = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ];

  return slopes
    .map((slope) => traverseUntilBottom(treeMap, dimensions, slope))
    .reduce((product, curVal) => product * curVal);
}
