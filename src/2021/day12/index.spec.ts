import { part1, part2 } from '.';

const inputSmall = ['start-A', 'start-b', 'A-c', 'A-b', 'b-d', 'A-end', 'b-end'].join('\n');

const inputMedium = [
  'dc-end',
  'HN-start',
  'start-kj',
  'dc-start',
  'dc-HN',
  'LN-dc',
  'HN-end',
  'kj-sa',
  'kj-HN',
  'kj-dc',
].join('\n');

const inputBig = [
  'fs-end',
  'he-DX',
  'fs-he',
  'start-DX',
  'pj-DX',
  'end-zg',
  'zg-sl',
  'zg-pj',
  'pj-he',
  'RW-he',
  'fs-DX',
  'pj-RW',
  'zg-RW',
  'start-pj',
  'he-WI',
  'zg-he',
  'pj-fs',
  'start-RW',
].join('\n');

describe('2021 day 12', () => {
  describe('part 1', () => {
    it('should return how many paths through this cave system there are that visit small caves at most once', () => {
      expect(part1(inputSmall)).toBe(10);
      expect(part1(inputMedium)).toBe(19);
      expect(part1(inputBig)).toBe(226);
    });
  });

  describe('part 2', () => {
    it('should return how many paths through this cave system there are', () => {
      expect(part2(inputSmall)).toBe(36);
      expect(part2(inputMedium)).toBe(103);
      expect(part2(inputBig)).toBe(3509);
    });
  });
});
