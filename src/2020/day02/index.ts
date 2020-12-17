interface PasswordEntry {
  character: string;
  loEnd: number;
  hiEnd: number;
  password: string;
}

function parseRow(row: string): PasswordEntry {
  const [range, char, password] = row.split(' ');
  const [loEnd, hiEnd] = range.split('-').map(Number);

  return {
    character: char[0],
    loEnd,
    hiEnd,
    password,
  };
}

function parseInput(input: string) {
  return input.split('\n').map(parseRow);
}

function isValidPart1(password: PasswordEntry) {
  const charCount = [...password.password].filter((char) => char === password.character).length;

  return charCount >= password.loEnd && charCount <= password.hiEnd;
}

export function part1(input: string): number {
  const passwords = parseInput(input);

  return passwords.filter(isValidPart1).length;
}

function isValidPart2(password: PasswordEntry) {
  const passwordArray = [...password.password];

  const isCharAtLo = passwordArray[password.loEnd - 1] === password.character;
  const isCharAtHi = passwordArray[password.hiEnd - 1] === password.character;

  return (isCharAtLo || isCharAtHi) && !(isCharAtLo && isCharAtHi);
}

export function part2(input: string): number {
  const passwords = parseInput(input);

  return passwords.filter(isValidPart2).length;
}
