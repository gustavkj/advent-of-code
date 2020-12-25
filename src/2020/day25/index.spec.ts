import { getLoopSizeFromPublicKey, transform } from '.';

describe('2020 day 25', () => {
  describe('getLoopSizeFromPublicKey', () => {
    it('should return the correct loop size, case 1', () => {
      expect(getLoopSizeFromPublicKey(5764801)).toEqual(8);
    });
    it('should return the correct loop size, case 2', () => {
      expect(getLoopSizeFromPublicKey(17807724)).toEqual(11);
    });
  });

  describe('transform', () => {
    it('should return the correct encryption key, case 1', () => {
      expect(transform(17807724, 8)).toEqual(14897079);
    });
    it('should return the correct encryption key, case 2', () => {
      expect(transform(5764801, 11)).toEqual(14897079);
    });
  });
});
