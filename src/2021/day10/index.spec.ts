import { part1, part2 } from '.';

const input = [
  '[({(<(())[]>[[{[]{<()<>>',
  '[(()[<>])]({[<{<<[]>>(',
  '{([(<{}[<>[]}>{[]{[(<()>',
  '(((({<>}<{<{<>}{[]{[]{}',
  '[[<[([]))<([[{}[[()]]]',
  '[{[{({}]{}}([{[{{{}}([]',
  '{<[[]]>}<{[{[{[]{()[[[]',
  '[<(<(<(<{}))><([]([]()',
  '<{([([[(<>()){}]>(<<{{',
  '<{([{{}}[<[[[<>{}]]]>[]]',
].join('\n');

describe('2021 day 10', () => {
  describe('part 1', () => {
    it('should return the total syntax error score for those errors', () => {
      expect(part1(input)).toBe(26397);
    });
  });

  describe('part 2', () => {
    it('return the middle autocomplete score', () => {
      expect(part2(input)).toBe(288957);
    });
  });
});
