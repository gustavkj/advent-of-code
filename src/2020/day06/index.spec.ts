import { part1, part2 } from '.';

describe('2020 day 6', () => {
  describe('part 1', () => {
    it('should count the unique answers per group and sum them', () => {
      const input = [
        'abc',
        '',
        'a',
        'b',
        'c',
        '',
        'ab',
        'ac',
        '',
        'a',
        'a',
        'a',
        'a',
        '',
        'b',
      ].join('\n');

      expect(part1(input)).toEqual(11);
    });
  });

  describe('part 2', () => {
    it('should count the answers that everyone answered per group and sum them', () => {
      const input = [
        'abc',
        '',
        'a',
        'b',
        'c',
        '',
        'ab',
        'ac',
        '',
        'a',
        'a',
        'a',
        'a',
        '',
        'b',
      ].join('\n');

      expect(part2(input)).toEqual(6);
    });
  });
});
