import { part1, part2 } from '.';

const input = '3,4,3,1,2';

describe('2021 day 6', () => {
  describe('part 1', () => {
    it('should return the number of lanternfish after 80 days', () => {
      expect(part1(input)).toBe(5934);
    });
  });

  describe('part 2', () => {
    it('should return the number of lanternfish after 256 days', () => {
      expect(part2(input)).toBe(26984457539);
    });
  });
});
