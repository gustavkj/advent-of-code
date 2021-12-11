import { part1, part2 } from '.';

const input = [
  '0,9 -> 5,9',
  '8,0 -> 0,8',
  '9,4 -> 3,4',
  '2,2 -> 2,1',
  '7,0 -> 7,4',
  '6,4 -> 2,0',
  '0,9 -> 2,9',
  '3,4 -> 1,4',
  '0,0 -> 8,8',
  '5,5 -> 8,2',
].join('\n');

describe('2021 day 5', () => {
  describe('part 1 - vertical or horizontal lines', () => {
    it('should return at how many points do at least two lines overlap', () => {
      expect(part1(input)).toBe(5);
    });
  });

  describe('part 2 - all (vertical, horizontal or diagonal) lines', () => {
    it('should return at how many points do at least two lines overlap', () => {
      expect(part2(input)).toBe(12);
    });
  });
});
