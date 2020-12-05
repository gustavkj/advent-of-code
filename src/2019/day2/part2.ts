import { IntcodeComputer } from '../utils/intcode-computer';

function parseInput(input: string): number[] {
  return input.split(',').map(Number);
}

export function part2(input: string): number {
  const initialMemory = parseInput(input);

  let noun = 0;
  let verb = 0;

  initialMemory[1] = noun;
  initialMemory[2] = verb;

  const computer = new IntcodeComputer(initialMemory);

  while (computer.run()[0] !== 19690720) {
    if (noun === 99 && verb === 99) {
      throw new Error('Maxed out');
    } else if (noun === 99) {
      verb += 1;
      noun = 0;
    } else {
      noun += 1;
    }

    initialMemory[1] = noun;
    initialMemory[2] = verb;
    computer.reset(initialMemory);
  }

  return 100 * noun + verb; // 7014
}
