import { part1, part2 } from '.';

describe('2020 day 15', () => {
  const input1 = '0,3,6';
  describe('part 1', () => {
    it('should return the 2020th number spoken', () => {
      expect(part1(input1)).toBe(436);
    });
  });

  // This will take a lot of time
  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('part 2', () => {
    it('should return the 30000000th number spoken', () => {
      expect(part2(input1)).toBe(175594);
    });
  });
});
