import { calculateFuelRequirement } from './part1';

describe('2019 - day 1 - part 1', () => {
  describe('calculateNeededFuel', () => {
    it('should require 2 units of fuel for 12 units of mass', () => {
      expect(calculateFuelRequirement(12)).toBe(2);
    });

    it('should require 2 units of fuel for 14 units of mass', () => {
      expect(calculateFuelRequirement(14)).toBe(2);
    });

    it('should require 654 units of fuel for 1969 units of mass', () => {
      expect(calculateFuelRequirement(1969)).toBe(654);
    });

    it('should require 33583 units of fuel for 100756 units of mass', () => {
      expect(calculateFuelRequirement(100756)).toBe(33583);
    });
  });
});
