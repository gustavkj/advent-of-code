import { part1, part2 } from '.';

describe('2020 day 14', () => {
  describe('part 1', () => {
    it('should return the sum of all values left in memory after it completes', () => {
      const input = [
        'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
        'mem[8] = 11',
        'mem[7] = 101',
        'mem[8] = 0',
      ].join('\n');

      expect(part1(input)).toBe(165);
    });
  });

  describe('part 2', () => {
    it('should return the sum of all values left in memory after it completes', () => {
      const input = [
        'mask = 000000000000000000000000000000X1001X',
        'mem[42] = 100',
        'mask = 00000000000000000000000000000000X0XX',
        'mem[26] = 1',
      ].join('\n');

      expect(part2(input)).toBe(208);
    });
  });
});
