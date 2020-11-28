export function runIntcodeProgram(intcodeProgram: number[]): number[] {
  let cursor = 0;
  const intcodes = [...intcodeProgram];

  function add(index: number) {
    intcodes[intcodes[index + 3]] = intcodes[intcodes[index + 1]] + intcodes[intcodes[index + 2]];
  }

  function multiply(index: number) {
    intcodes[intcodes[index + 3]] = intcodes[intcodes[index + 1]] * intcodes[intcodes[index + 2]];
  }

  while (intcodes[cursor] !== 99) {
    if (intcodes[cursor] === 1) {
      add(cursor);
    } else if (intcodes[cursor] === 2) {
      multiply(cursor);
    } else {
      throw new Error(
        `Unknown Opcode: ${intcodes[cursor]} as position ${cursor}.\n\n${JSON.stringify(intcodes)}`,
      );
    }
    cursor += 4;
  }

  return intcodes;
}

function parseInput(input: string): number[] {
  return input.split(',').map(Number);
}

export function part1(input: string): number {
  const intcodeProgram = parseInput(input);

  // Before running the program, replace position 1 with the value 12 and replace position 2 with the value 2
  intcodeProgram[1] = 12;
  intcodeProgram[2] = 2;

  return runIntcodeProgram(intcodeProgram)[0]; // 3654868
}
