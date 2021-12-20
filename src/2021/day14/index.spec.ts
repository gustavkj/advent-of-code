import { part1, part2 } from '.';

const input = [
  'NNCB',
  '',
  'CH -> B',
  'HH -> N',
  'CB -> H',
  'NH -> C',
  'HB -> C',
  'HC -> B',
  'HN -> C',
  'NN -> C',
  'BH -> H',
  'NC -> B',
  'NB -> B',
  'BN -> B',
  'BB -> N',
  'BC -> B',
  'CC -> N',
  'CN -> C',
].join('\n');

describe('2021 day 14', () => {
  describe('part 1 - 10 steps', () => {
    it('should return what result based on the quantity of the most common element and subtract the quantity of the least common element', () => {
      expect(part1(input)).toBe(1588);
    });
  });

  describe('part 2 - 40 steps', () => {
    it('should return what result based on the quantity of the most common element and subtract the quantity of the least common element', () => {
      expect(part2(input)).toBe(2188189693529);
    });
  });
});
