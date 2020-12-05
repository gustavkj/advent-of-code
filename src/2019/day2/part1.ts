import { IntcodeComputer } from '../utils/intcode-computer';

function parseInput(input: string): number[] {
  return input.split(',').map(Number);
}

export function part1(input: string): number {
  const intcodeProgram = parseInput(input);

  // Before running the program, replace position 1 with the value 12 and replace position 2 with the value 2
  intcodeProgram[1] = 12;
  intcodeProgram[2] = 2;

  const computer = new IntcodeComputer(intcodeProgram);

  computer.run();

  return computer.memory[0]; // 3654868
}
