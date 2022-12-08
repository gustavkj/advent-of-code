import { part1, part2 } from '.';

describe('2020 - day 3', () => {
  describe('part 1', () => {
    it('should return how many trees are encountered with right 3 down 1', () => {
      const input = [
        '..##.......',
        '#...#...#..',
        '.#....#..#.',
        '..#.#...#.#',
        '.#...##..#.',
        '..#.##.....',
        '.#.#.#....#',
        '.#........#',
        '#.##...#...',
        '#...##....#',
        '.#..#...#.#',
      ].join('\n');

      expect(part1(input)).toBe(7);
    });
  });

  describe('part 2', () => {
    it('should return the product of how many trees are encountered for the different slopes', () => {
      const input = [
        '..##.......',
        '#...#...#..',
        '.#....#..#.',
        '..#.#...#.#',
        '.#...##..#.',
        '..#.##.....',
        '.#.#.#....#',
        '.#........#',
        '#.##...#...',
        '#...##....#',
        '.#..#...#.#',
      ].join('\n');

      expect(part2(input)).toBe(336);
    });
  });
});
