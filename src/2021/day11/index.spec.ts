import { part1, part2 } from '.';

const input = [
  '5483143223',
  '2745854711',
  '5264556173',
  '6141336146',
  '6357385478',
  '4167524645',
  '2176841721',
  '6882881134',
  '4846848554',
  '5283751526',
].join('\n');

describe('2021 day 11', () => {
  describe('part 1', () => {
    it('should return how many total flashes there are after 100 steps', () => {
      expect(part1(input)).toBe(1656);
    });
  });

  describe('part 2', () => {
    it('should return the first step during which all octopuses flash', () => {
      expect(part2(input)).toBe(195);
    });
  });
});
