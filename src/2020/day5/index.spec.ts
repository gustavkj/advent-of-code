import { getSeatID, part1 } from '.';

describe('2020 day 5', () => {
  describe('getSeatID', () => {
    it('should return valid seat IDs', () => {
      expect(getSeatID('BFFFBBFRRR')).toEqual(567);
      expect(getSeatID('FFFBBBFRRR')).toEqual(119);
      expect(getSeatID('BBFFBBFRLL')).toEqual(820);
    });
  });

  describe('part 1', () => {
    it('should return the highest seat IDs', () => {
      const input = ['BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL'].join('\n');

      expect(part1(input)).toEqual(820);
    });
  });
});
