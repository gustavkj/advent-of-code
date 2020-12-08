import { part1, part2 } from '.';

describe('2020 day 8', () => {
  describe('part 1', () => {
    it('should return the value of the accumulator before any instruction is executed a second time', () => {
      const input = [
        'nop +0',
        'acc +1',
        'jmp +4',
        'acc +3',
        'jmp -3',
        'acc -99',
        'acc +1',
        'jmp -4',
        'acc +6',
      ].join('\n');

      expect(part1(input)).toEqual(5);
    });
  });

  describe('part 2', () => {
    it('should return the value of the accumulator after the program terminates', () => {
      const input = [
        'nop +0',
        'acc +1',
        'jmp +4',
        'acc +3',
        'jmp -3',
        'acc -99',
        'acc +1',
        'jmp -4',
        'acc +6',
      ].join('\n');

      expect(part2(input)).toEqual(8);
    });
  });
});
