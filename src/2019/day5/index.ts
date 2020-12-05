import { IntcodeComputer } from '../utils/intcode-computer';

function parseInput(input: string): number[] {
  return input.split(',').map(Number);
}

export function part1(input: string) {
  const intcodeProgram = parseInput(input);

  const computer = new IntcodeComputer(intcodeProgram);

  computer.run();
}
