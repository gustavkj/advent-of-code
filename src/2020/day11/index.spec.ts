import { part1, part2 } from '.';

describe('2020 day 11', () => {
  const input = [
    'L.LL.LL.LL',
    'LLLLLLL.LL',
    'L.L.L..L..',
    'LLLL.LL.LL',
    'L.LL.LL.LL',
    'L.LLLLL.LL',
    '..L.L.....',
    'LLLLLLLLLL',
    'L.LLLLLL.L',
    'L.LLLLL.LL',
  ].join('\n');

  describe('part 1', () => {
    it('should return how many seats end up occupied', () => {
      expect(part1(input)).toEqual(37);
    });
  });

  describe('part 2', () => {
    it('should return how many seats end up occupied', () => {
      expect(part2(input)).toEqual(26);
    });
  });
});
