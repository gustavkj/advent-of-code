import { part1, part2 } from '.';

const input = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
].join('\n');

describe('2021 day 3', () => {
  describe('part 1', () => {
    it('should return the power consumption of the submarine', () => {
      expect(part1(input)).toBe(198);
    });
  });

  describe('part 2', () => {
    it('should return the life support rating of the submarine', () => {
      expect(part2(input)).toBe(230);
    });
  });
});
