import { part1, part2 } from '.';

const input = [
  '6,10',
  '0,14',
  '9,10',
  '0,3',
  '10,4',
  '4,11',
  '6,0',
  '6,12',
  '4,1',
  '0,13',
  '10,12',
  '3,4',
  '3,0',
  '8,4',
  '1,10',
  '2,14',
  '8,10',
  '9,0',
  '',
  'fold along y=7',
  'fold along x=5',
].join('\n');

describe('2021 day 13', () => {
  describe('part 1', () => {
    it('should return how many dots are visible after completing just the first fold instruction on your transparent paper', () => {
      expect(part1(input)).toBe(17);
    });
  });

  describe('part 2', () => {
    it('should return the code to use to activate the infrared thermal imaging camera system', () => {
      expect(part2(input)).toBe(
        `
#####
#...#
#...#
#...#
#####`,
      );
    });
  });
});
