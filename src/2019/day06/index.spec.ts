import { part1, part2 } from '.';

describe('2020 day 6', () => {
  describe('part 1', () => {
    it('should count the direct and indirect orbits', () => {
      const input = [
        'COM)B',
        'B)C',
        'C)D',
        'D)E',
        'E)F',
        'B)G',
        'G)H',
        'D)I',
        'E)J',
        'J)K',
        'K)L',
      ].join('\n');

      expect(part1(input)).toBe(42);
    });

    it('should count the direct and indirect orbits (COM - D)', () => {
      const input = ['COM)B', 'B)C', 'C)D'].join('\n');

      expect(part1(input)).toBe(6);
    });

    it('should count the direct and indirect orbits (COM - D & H)', () => {
      const input = ['COM)B', 'B)C', 'C)D', 'B)G', 'G)H'].join('\n');

      expect(part1(input)).toBe(11);
    });
  });

  describe('part 2', () => {
    it('should count the minimum number of orbital transfers required to move you to Santa', () => {
      const input = [
        'COM)B',
        'B)C',
        'C)D',
        'D)E',
        'E)F',
        'B)G',
        'G)H',
        'D)I',
        'E)J',
        'J)K',
        'K)L',
        'K)YOU',
        'I)SAN',
      ].join('\n');

      expect(part2(input)).toBe(4);
    });
  });
});
