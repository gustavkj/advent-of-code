import { part1, part2 } from '.';

describe('2020 day 17', () => {
  const input = ['.#.', '..#', '###'].join('\n');

  describe('part 1', () => {
    it('should return how many cubes are left in the active state after the sixth cycle', () => {
      expect(part1(input)).toEqual(112);
    });
  });

  describe('part 2', () => {
    it('should return how many cubes are left in the active state after the sixth cycle', () => {
      expect(part2(input)).toEqual(848);
    });
  });
});
