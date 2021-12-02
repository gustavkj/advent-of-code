import { part1, part2 } from '.';

const input = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2'].join('\n');

describe('2021 day 2', () => {
  describe('part 1', () => {
    it('should return the product of your final horizontal position by your final depth', () => {
      expect(part1(input)).toBe(150);
    });
  });

  describe('part 2', () => {
    it('should return the product of your final horizontal position by your final depth', () => {
      expect(part2(input)).toBe(900);
    });
  });
});
