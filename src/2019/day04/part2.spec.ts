import { isValid } from './part2';

describe('2019 - day 4 - part 2', () => {
  describe('isValid', () => {
    it('should return true when there are three pairs of doubles', () => {
      expect(isValid(112233)).toEqual(true);
    });

    it('should return true when there is a pair that is unique', () => {
      expect(isValid(111122)).toEqual(true);
    });

    it('should return false when all digits are the same', () => {
      expect(isValid(111111)).toEqual(false);
    });

    it('should return false when digits decrease', () => {
      expect(isValid(223450)).toEqual(false);
      expect(isValid(331100)).toEqual(false);
    });

    it('should return false when there are no doubles', () => {
      expect(isValid(123789)).toEqual(false);
    });

    it('should return false when there are three of the same digit in a row', () => {
      expect(isValid(123444)).toEqual(false);
    });
  });
});
