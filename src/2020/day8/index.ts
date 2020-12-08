function parseInput(input: string) {
  return input.split('\n').map((row) => row.split(' '));
}

export function part1(input: string): number {
  const instructions = parseInput(input);
  const visited = new Set<number>();

  let accumulator = 0;
  let index = 0;

  while (!visited.has(index)) {
    const [operation, valueStr] = instructions[index];
    const value = Number(valueStr);
    let nextIndex = index + 1;

    switch (operation) {
      case 'nop':
        break;

      case 'acc':
        accumulator += value;
        break;

      case 'jmp':
        nextIndex = index + value;
        break;

      default:
        break;
    }

    visited.add(index);
    index = nextIndex;
  }

  return accumulator; // 2034
}

function run(
  accumulator: number,
  index: number,
  instructions: string[][],
  visited: Set<number>,
  changedInstruction: boolean,
): number {
  if (index >= instructions.length) {
    return accumulator;
  }
  if (visited.has(index)) {
    throw new Error(`Already visited: ${index}`);
  }

  const [operation, valueStr] = instructions[index];
  const value = Number(valueStr);
  let nextIndex = index + 1;
  let acc = accumulator;

  switch (operation) {
    case 'nop':
      break;

    case 'acc':
      acc += value;
      break;

    case 'jmp':
      nextIndex = index + value;
      break;

    default:
      break;
  }

  visited.add(index);

  try {
    return run(acc, nextIndex, instructions, visited, changedInstruction);
  } catch (error) {
    if (changedInstruction) {
      visited.delete(index);
      throw new Error('Already changed an instruction');
    }

    if (operation === 'acc') {
      visited.delete(index);
      throw new Error(`Cannot change 'acc' operation at ${index}`);
    }
  }

  try {
    if (operation === 'jmp') {
      // Act as 'nop' operation instead
      nextIndex = index + 1;
      return run(acc, nextIndex, instructions, visited, true);
    }
    if (operation === 'nop') {
      // Act as 'jmp' operation instead
      nextIndex = index + value;
      return run(acc, nextIndex, instructions, visited, true);
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'Already changed an instruction') {
      visited.delete(index);
      throw error;
    }
  }

  throw new Error('Something went wrong, you should not be able to get here.');
}

export function part2(input: string): number {
  const instructions = parseInput(input);
  const visited = new Set<number>();

  const accumulator = run(0, 0, instructions, visited, false);

  return accumulator; // 672
}
