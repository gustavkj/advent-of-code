import { calculateFuelRequirement } from './2';

describe('2019 - day 1 - part 2', () => {
  describe('calculateNeededFuel', () => {
    it('should require 2 units of fuel for 14 units of mass', () => {
      expect(calculateFuelRequirement(14)).toEqual(2);
    });

    it('should require 966 units of fuel for 1969 units of mass', () => {
      expect(calculateFuelRequirement(1969)).toEqual(966);
    });

    it('should require 50346 units of fuel for 100756 units of mass', () => {
      expect(calculateFuelRequirement(100756)).toEqual(50346);
    });
  });
});
