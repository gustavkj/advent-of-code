import { part1, part2 } from '.';

describe('2020 day 13', () => {
  const input = ['939', '7,13,x,x,59,x,31,19'].join('\n');

  describe('part 1', () => {
    it("should return the ID of the earliest bus you can take to the airport multiplied by the number of minutes you'll need to wait for that bus", () => {
      expect(part1(input)).toEqual(295);
    });
  });

  describe('part 2', () => {
    it('should return the earliest timestamp such that all of the listed bus IDs depart at offsets matching their positions in the list', () => {
      expect(part2(input)).toEqual(1068781);
    });

    it('should return the earliest timestamp such that all of the listed bus IDs depart at offsets matching their positions in the list, case 1', () => {
      const input1 = ['0', '17,x,13,19'].join('\n');

      expect(part2(input1)).toEqual(3417);
    });

    it('should return the earliest timestamp such that all of the listed bus IDs depart at offsets matching their positions in the list, case 2', () => {
      const input2 = ['0', '67,7,59,61'].join('\n');

      expect(part2(input2)).toEqual(754018);
    });

    it('should return the earliest timestamp such that all of the listed bus IDs depart at offsets matching their positions in the list, case 3', () => {
      const input3 = ['0', '67,x,7,59,61'].join('\n');

      expect(part2(input3)).toEqual(779210);
    });

    it('should return the earliest timestamp such that all of the listed bus IDs depart at offsets matching their positions in the list, case 4', () => {
      const input4 = ['0', '67,7,x,59,61'].join('\n');

      expect(part2(input4)).toEqual(1261476);
    });

    it('should return the earliest timestamp such that all of the listed bus IDs depart at offsets matching their positions in the list, case 5', () => {
      const input5 = ['0', '1789,37,47,1889'].join('\n');

      expect(part2(input5)).toEqual(1202161486);
    });
  });
});
