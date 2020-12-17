import { IntcodeComputer } from '../utils/intcode-computer';

function parseInput(input: string): number[] {
  return input.split(',').map(Number);
}

export function part1(input: string): void {
  const intcodeProgram = parseInput(input);

  const computer = new IntcodeComputer(intcodeProgram);

  computer.run();

  // Part 1: Input 1 yielded 13210611.
  // Part 2: Input 5 yielded 584126.
}
