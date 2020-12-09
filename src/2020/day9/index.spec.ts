import { part1, part2 } from '.';

describe('2020 day 9', () => {
  const input = [
    '35',
    '20',
    '15',
    '25',
    '47',
    '40',
    '62',
    '55',
    '65',
    '95',
    '102',
    '117',
    '150',
    '182',
    '127',
    '219',
    '299',
    '277',
    '309',
    '576',
  ].join('\n');

  describe('part 1', () => {
    it('should return the first number that is not a sum of two numbers in the preamble', () => {
      expect(part1(input, 5)).toEqual(127);
    });
  });

  describe('part 2', () => {
    it('should return the sum of the smallest and largest number of the range adding up to the number from part 1', () => {
      expect(part2(input, 5)).toEqual(62);
    });
  });
});
