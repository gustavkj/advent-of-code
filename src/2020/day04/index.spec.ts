import { isValidField, part1, part2 } from '.';

describe('2020 - day 4', () => {
  const input = [
    'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd',
    'byr:1937 iyr:2017 cid:147 hgt:183cm',
    '',
    'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884',
    'hcl:#cfa07d byr:1929',
    '',
    'hcl:#ae17e1 iyr:2013',
    'eyr:2024',
    'ecl:brn pid:760753108 byr:1931',
    'hgt:179cm',
    '',
    'hcl:#cfa07d eyr:2025 pid:166559648',
    'iyr:2011 ecl:brn hgt:59in',
  ].join('\n');

  describe('part 1', () => {
    it('should return how many valid passports are present', () => {
      expect(part1(input)).toEqual(2);
    });
  });

  describe('part 2', () => {
    it('should return 0 valid passports when all are invalid', () => {
      const invalidPassports = [
        'eyr:1972 cid:100',
        'hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926',
        '',
        'iyr:2019',
        'hcl:#602927 eyr:1967 hgt:170cm',
        'ecl:grn pid:012533040 byr:1946',
        '',
        'hcl:dab227 iyr:2012',
        'ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277',
        '',
        'hgt:59cm ecl:zzz',
        'eyr:2038 hcl:74454a iyr:2023',
        'pid:3556412378 byr:2007',
      ].join('\n');

      expect(part2(invalidPassports)).toEqual(0);
    });

    it('should return 4 valid passports when all 4 are invalid', () => {
      const validPassports = [
        'pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980',
        'hcl:#623a2f',
        '',
        'eyr:2029 ecl:blu cid:129 byr:1989',
        'iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm',
        '',
        'hcl:#888785',
        'hgt:164cm byr:2001 iyr:2015 cid:88',
        'pid:545766238 ecl:hzl',
        'eyr:2022',
        '',
        'iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719',
      ].join('\n');

      expect(part2(validPassports)).toEqual(4);
    });
  });

  describe('isValidField', () => {
    it('should validate byr', () => {
      expect(isValidField('byr', '2002')).toEqual(true);
      expect(isValidField('byr', '2003')).toEqual(false);
    });

    it('should validate hgt', () => {
      expect(isValidField('hgt', '60in')).toEqual(true);
      expect(isValidField('hgt', '190cm')).toEqual(true);
      expect(isValidField('hgt', '190in')).toEqual(false);
      expect(isValidField('hgt', '190')).toEqual(false);
    });

    it('should validate hcl', () => {
      expect(isValidField('hcl', '#123abc')).toEqual(true);
      expect(isValidField('hcl', '#123abz')).toEqual(false);
      expect(isValidField('hcl', '123abc')).toEqual(false);
    });

    it('should validate ecl', () => {
      expect(isValidField('ecl', 'brn')).toEqual(true);
      expect(isValidField('ecl', 'wat')).toEqual(false);
    });

    it('should validate pid', () => {
      expect(isValidField('pid', '000000001')).toEqual(true);
      expect(isValidField('pid', '0123456789')).toEqual(false);
    });
  });
});
