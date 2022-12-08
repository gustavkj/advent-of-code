import { part1, part2 } from '.';

describe('2020 day 21', () => {
  const input = [
    'mxmxvkd kfcds sqjhc nhms (contains dairy, fish)',
    'trh fvjkl sbzzf mxmxvkd (contains dairy)',
    'sqjhc fvjkl (contains soy)',
    'sqjhc mxmxvkd sbzzf (contains fish)',
  ].join('\n');

  describe('part 1', () => {
    it('should return how many times do any of the ingredients without allergens appear', () => {
      expect(part1(input)).toBe(5);
    });
  });

  describe('part 2', () => {
    it('should return the canonical dangerous ingredient list', () => {
      expect(part2(input)).toBe('mxmxvkd,sqjhc,fvjkl');
    });
  });
});
