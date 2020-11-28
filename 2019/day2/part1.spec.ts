import { runIntcodeProgram } from './part1';

describe('2019 - day 2 - part 1', () => {
  describe('runIntcodeProgram', () => {
    it('should operate correctly, case 1', () => {
      const given = [1, 0, 0, 0, 99];
      const expected = [2, 0, 0, 0, 99];
      expect(runIntcodeProgram(given)).toEqual(expected);
    });

    it('should operate correctly, case 2', () => {
      const given = [2, 3, 0, 3, 99];
      const expected = [2, 3, 0, 6, 99];
      expect(runIntcodeProgram(given)).toEqual(expected);
    });

    it('should operate correctly, case 3', () => {
      const given = [2, 4, 4, 5, 99, 0];
      const expected = [2, 4, 4, 5, 99, 9801];
      expect(runIntcodeProgram(given)).toEqual(expected);
    });

    it('should operate correctly, case 4', () => {
      const given = [1, 1, 1, 4, 99, 5, 6, 0, 99];
      const expected = [30, 1, 1, 4, 2, 5, 6, 0, 99];
      expect(runIntcodeProgram(given)).toEqual(expected);
    });

    it('should operate correctly, case 5', () => {
      const given = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
      const expected = [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50];
      expect(runIntcodeProgram(given)).toEqual(expected);
    });
  });
});
