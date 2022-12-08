import { part1, part2 } from '.';

describe('2020 day 1', () => {
  describe('part 1', () => {
    it('should find two numbers that sum to 2020 and multiply them', () => {
      const input = [1721, 979, 366, 299, 675, 1456].join('\n');
      expect(part1(input)).toBe(514579);
    });
  });

  describe('part 2', () => {
    it('should find three numbers that sum to 2020 and multiply them', () => {
      const input = [1721, 979, 366, 299, 675, 1456].join('\n');
      expect(part2(input)).toBe(241861950);
    });
  });
});
