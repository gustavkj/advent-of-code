import { part1, part2 } from '.';

const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

describe('2022 day 1', () => {
  describe('part 1', () => {
    it('should return the total calories carried by the elf carrying the most', () => {
      expect(part1(input)).toBe(24000);
    });
  });

  describe('part 2', () => {
    it('should return the total calories carried by the three elves carrying the most', () => {
      expect(part2(input)).toBe(45000);
    });
  });
});
