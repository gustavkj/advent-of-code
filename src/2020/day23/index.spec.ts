import { part1, part2 } from '.';

describe('2020 day 23', () => {
  describe('part 1', () => {
    it('should return the labels on the cups after cup 1', () => {
      expect(part1('389125467')).toBe('67384529');
    });
  });

  describe('part 2', () => {
    it('should return the product of the two cups clockwise of cup 1', () => {
      expect(part2('389125467')).toBe(149245887792);
    });
  });
});
