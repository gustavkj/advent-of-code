import { getBoundaries } from './utils';

export function isValid(password: number): boolean {
  const passwordArray = [...password.toString()];

  // It is a six-digit number.
  if (passwordArray.length !== 6) {
    return false;
  }

  // Two adjacent digits are the same (like 22 in 122345).
  if (!passwordArray.slice(0, -1).some((v, i) => v === passwordArray[i + 1])) {
    return false;
  }

  // Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
  if (!passwordArray.slice(0, -1).every((v, i) => v <= passwordArray[i + 1])) {
    return false;
  }

  return true;
}

export function part1(input: string): number {
  const boundaries = getBoundaries(input);

  let password = boundaries.lower;
  let numberOfValidPasswords = 0;

  while (password <= boundaries.upper) {
    if (isValid(password)) {
      numberOfValidPasswords += 1;
    }

    password += 1;
  }

  return numberOfValidPasswords; // 1330
}
