import { getIntersections } from './util';

export function getFewestStepsToIntersection(wirePaths: string[][]): number {
  const intersections = getIntersections(wirePaths);

  const fewestSteps = Math.min(...[...intersections.values()]);

  return fewestSteps;
}

function parseInput(input: string): string[][] {
  return input.split('\n').map((row) => row.split(','));
}

export function part2(input: string): number {
  const wireSpecs = parseInput(input);

  return getFewestStepsToIntersection(wireSpecs); // 21196
}
