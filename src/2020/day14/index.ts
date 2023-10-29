interface Mask {
  type: 'mask';
  value: string;
}

interface Memory {
  type: 'mem';
  address: number;
  value: number;
}

type Instruction = Mask | Memory;

function parseInput(input: string): Instruction[] {
  return input
    .split('\n')
    .map((row) => {
      const match = /(?<type>[a-z]+)(?:\[(?<address>\d+)\])? = (?<value>.*)/.exec(row);

      if (!match?.groups) {
        return undefined;
      }

      const { type, address, value } = match.groups;

      return {
        type,
        address: address ? Number(address) : undefined,
        value: type === 'mem' ? Number(value) : value,
      } as Instruction;
    })
    .filter(<T>(x: T | undefined): x is T => x !== undefined);
}

function decimalToBinary(decimal: number) {
  return decimal.toString(2).padStart(36, '0').split('');
}

function binaryToDecimal(binary: string[]) {
  return parseInt(binary.join(''), 2);
}

export function part1(input: string): number {
  const instructions = parseInput(input);

  const memory: Record<number, number> = {};
  let currentMask = '';

  instructions.forEach((instruction) => {
    if (instruction.type === 'mask') {
      currentMask = instruction.value;
    } else if (instruction.type === 'mem') {
      const binary = decimalToBinary(instruction.value);
      [...currentMask].forEach((char, index) => {
        if (char !== 'X') {
          binary[index] = char;
        }
      });

      memory[instruction.address] = binaryToDecimal(binary);
    }
  });

  return Object.values(memory)
    .filter((v) => v !== 0)
    .reduce((sum, v) => sum + v);
}

export function part2(input: string): number {
  const instructions = parseInput(input);

  const memory: Record<number, number> = {};
  let currentMask = '';

  instructions.forEach((instruction) => {
    if (instruction.type === 'mask') {
      currentMask = instruction.value;
    } else if (instruction.type === 'mem') {
      const binaryAddress = decimalToBinary(instruction.address);
      const addressTemplate = [...currentMask].map((char, index) => {
        if (char === '0') {
          return binaryAddress[index];
        }
        if (char === '1') {
          return '1';
        }
        return 'X';
      });

      const maxIterations = 2 ** addressTemplate.filter((v) => v === 'X').length;
      let index = 0;

      while (index < maxIterations) {
        const binaryFiller = decimalToBinary(index);
        const address = addressTemplate.reduceRight(
          (array, v) => [v !== 'X' ? v : binaryFiller.pop()!, ...array],
          [] as string[],
        );

        memory[binaryToDecimal(address)] = instruction.value;

        index += 1;
      }
    }
  });

  return Object.values(memory)
    .filter((v) => v !== 0)
    .reduce((sum, v) => sum + v);
}
