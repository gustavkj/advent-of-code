import { part1, part2 } from '.';

const input = '16,1,2,0,4,2,7,1,2,14';

describe('2021 day 6', () => {
  describe('part 1', () => {
    it('should return how much fuel the crabs must spend to align to the position requiring minimum fuel', () => {
      expect(part1(input)).toBe(37);
    });
  });

  describe('part 2', () => {
    it('should return how much fuel the crabs must spend to align to the position requiring minimum fuel', () => {
      expect(part2(input)).toBe(168);
    });
  });
});
