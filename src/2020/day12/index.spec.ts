import { part1, part2 } from '.';

describe('2020 day 12', () => {
  const input = ['F10', 'N3', 'F7', 'R90', 'F11'].join('\n');

  describe('part 1', () => {
    it("should return the distance between the location and the ship's starting position", () => {
      expect(part1(input)).toBe(25);
    });
  });

  describe('part 2', () => {
    it("should return the distance between the location and the ship's starting position", () => {
      expect(part2(input)).toBe(286);
    });
  });
});
