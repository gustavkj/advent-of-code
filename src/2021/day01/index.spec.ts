import { part1, part2 } from '.';

const input = ['199', '200', '208', '210', '200', '207', '240', '269', '260', '263'].join('\n');

describe('2021 day 1', () => {
  describe('part 1', () => {
    it('should count the times a depth measurement increases', () => {
      expect(part1(input)).toBe(7);
    });
  });

  describe('part 2', () => {
    it('should count the number of times the sum of measurements in this sliding window increases', () => {
      expect(part2(input)).toBe(5);
    });
  });
});
