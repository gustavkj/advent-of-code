import { part1, part2 } from '.';

describe('2020 day 22', () => {
  const input = [
    'Player 1:',
    '9',
    '2',
    '6',
    '3',
    '1',
    '',
    'Player 2:',
    '5',
    '8',
    '4',
    '7',
    '10',
  ].join('\n');

  describe('part 1', () => {
    it("should return the winning player's score", () => {
      expect(part1(input)).toBe(306);
    });
  });

  describe('part 2', () => {
    it("should return the winning player's score", () => {
      expect(part2(input)).toBe(291);
    });

    it('should up the ante and work for more than two players', () => {
      // See: https://www.reddit.com/r/adventofcode/comments/ki4jy3/2020_day_22_part_3_crab_party/

      const upTheAnteInput = [
        'Player 1:',
        '9',
        '5',
        '',
        'Player 2:',
        '2',
        '8',
        '',
        'Player 3:',
        '6',
        '4',
        '',
        'Player 4:',
        '3',
        '7',
        '',
        'Player 5:',
        '1',
        '10',
      ].join('\n');

      expect(part2(upTheAnteInput)).toBe(353);
    });
  });
});
