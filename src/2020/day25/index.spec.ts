import { getLoopSizeFromPublicKey, transform } from '.';

describe('2020 day 25', () => {
  describe('getLoopSizeFromPublicKey', () => {
    it('should return the correct loop size, case 1', () => {
      expect(getLoopSizeFromPublicKey(5764801)).toBe(8);
    });
    it('should return the correct loop size, case 2', () => {
      expect(getLoopSizeFromPublicKey(17807724)).toBe(11);
    });
  });

  describe('transform', () => {
    it('should return the correct encryption key, case 1', () => {
      expect(transform(17807724, 8)).toBe(14897079);
    });
    it('should return the correct encryption key, case 2', () => {
      expect(transform(5764801, 11)).toBe(14897079);
    });
  });
});
