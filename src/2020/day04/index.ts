interface Passport {
  byr?: string;
  iyr?: string;
  eyr?: string;
  hgt?: string;
  hcl?: string;
  ecl?: string;
  pid?: string;
  cid?: string;
}

type PassportKey = keyof Passport;

const passportKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'] as const;

type ValidFieldFunction = (key: string, value: string) => boolean;

function isPassportKey(x: unknown): x is PassportKey {
  return typeof x === 'string' && passportKeys.includes(x as PassportKey);
}

function parseInput(input: string, isValid: ValidFieldFunction = () => true) {
  return input.split('\n\n').map((passportEntry) => {
    const passport: Passport = {};

    passportEntry
      .replace(/\n/g, ' ')
      .split(' ')
      .forEach((field) => {
        const [key, value] = field.split(':');

        if (isPassportKey(key) && isValid(key, value)) {
          passport[key] = value;
        }
      });

    return passport;
  });
}

function isValidYear(value: string, min: number, max: number) {
  const year = Number(value);
  return value.length === 4 && year >= min && year <= max;
}

function isValidHeight(value: string) {
  // hgt (Height) - a number followed by either cm or in:
  // If cm, the number must be at least 150 and at most 193.
  // If in, the number must be at least 59 and at most 76.
  const height = Number(value.slice(0, -2));
  if (value.endsWith('cm')) {
    return height >= 150 && height <= 193;
  }
  if (value.endsWith('in')) {
    return height >= 59 && height <= 76;
  }
  return false;
}

export function isValidField(key: string, value: string): boolean {
  switch (key) {
    case 'byr':
      // byr (Birth Year) - four digits; at least 1920 and at most 2002.
      return isValidYear(value, 1920, 2002);
      break;
    case 'iyr':
      // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
      return isValidYear(value, 2010, 2020);
    case 'eyr':
      // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
      return isValidYear(value, 2020, 2030);
    case 'hgt':
      // hgt (Height) - a number followed by either cm or in:
      // If cm, the number must be at least 150 and at most 193.
      // If in, the number must be at least 59 and at most 76.
      return isValidHeight(value);
    case 'hcl':
      // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
      return /^#[0-9a-f]{6}$/.test(value);
    case 'ecl':
      // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
      return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
    case 'pid':
      // pid (Passport ID) - a nine-digit number, including leading zeroes.
      return /^[0-9]{9}$/.test(value);
    case 'cid':
      // cid (Country ID) - ignored, missing or not.
      return true;
    default:
      return false;
  }
}

function hasAllPassportFields(passport: Passport): boolean {
  // Do not include `cid`
  const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

  const keys = Object.keys(passport);

  return requiredKeys.every((key) => keys.includes(key));
}

export function part1(input: string): number {
  const passports = parseInput(input);

  return passports.filter(hasAllPassportFields).length; // 264
}

export function part2(input: string): number {
  const passports = parseInput(input, isValidField);

  return passports.filter(hasAllPassportFields).length; // 224
}
