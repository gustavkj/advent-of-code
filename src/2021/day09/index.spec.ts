import { part1, part2 } from '.';

const input = ['2199943210', '3987894921', '9856789892', '8767896789', '9899965678'].join('\n');

describe('2021 day 9', () => {
  describe('part 1', () => {
    it('should return the sum of the risk levels of all low points on your heightmap', () => {
      expect(part1(input)).toBe(15);
    });
  });

  describe('part 2', () => {
    it('should return what you get if you multiply together the sizes of the three largest basins', () => {
      expect(part2(input)).toBe(1134);
    });
  });
});
