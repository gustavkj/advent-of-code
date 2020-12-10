import { part1, part2 } from '.';

describe('2020 day 10', () => {
  const input1 = ['16', '10', '15', '5', '1', '11', '7', '19', '6', '12', '4'].join('\n');

  const input2 = [
    '28',
    '33',
    '18',
    '42',
    '31',
    '14',
    '46',
    '20',
    '48',
    '47',
    '24',
    '23',
    '49',
    '45',
    '19',
    '38',
    '39',
    '11',
    '1',
    '32',
    '25',
    '35',
    '8',
    '17',
    '7',
    '9',
    '4',
    '2',
    '34',
    '10',
    '3',
  ].join('\n');

  describe('part 1', () => {
    it('should return the 1 jolt and the 3 jolt differences multiplied with each other, case 1', () => {
      expect(part1(input1)).toEqual(7 * 5);
    });

    it('should return the 1 jolt and the 3 jolt differences multiplied with each other, case 2', () => {
      expect(part1(input2)).toEqual(22 * 10);
    });
  });

  describe('part 2', () => {
    it('should return number of ways the adapters can be arranged, case 1', () => {
      expect(part2(input1)).toEqual(8);
    });

    it('should return number of ways the adapters can be arranged, case 2', () => {
      expect(part2(input2)).toEqual(19208);
    });
  });
});
