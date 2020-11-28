import { isValid } from './part1';

describe('2019 - day 4 - part 1', () => {
  describe('isValid', () => {
    it('should return true when all digits are the same', () => {
      expect(isValid(111111)).toEqual(true);
    });

    it('should return false when digits decrease', () => {
      expect(isValid(223450)).toEqual(false);
    });

    it('should return false when there are no doubles', () => {
      expect(isValid(123789)).toEqual(false);
    });
  });
});
