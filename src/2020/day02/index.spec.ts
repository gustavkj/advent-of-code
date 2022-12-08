import { part1, part2 } from '.';

describe('2020 day 1', () => {
  describe('part 1', () => {
    it('should return how many passwords are valid', () => {
      const input = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'].join('\n');
      expect(part1(input)).toBe(2);
    });
  });

  describe('part 2', () => {
    it('should return how many passwords are valid', () => {
      const input = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'].join('\n');
      expect(part2(input)).toBe(1);
    });
  });
});
