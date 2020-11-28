import { getDistanceToClosestIntersection } from './part1';

describe('2019 - day 3 - part 1', () => {
  describe('getDistanceToClosestIntersection', () => {
    it('case 1', () => {
      const wires = [
        ['R8', 'U5', 'L5', 'D3'],
        ['U7', 'R6', 'D4', 'L4'],
      ];
      expect(getDistanceToClosestIntersection(wires)).toEqual(6);
    });

    it('case 2', () => {
      const wires = [
        ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'],
        ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83'],
      ];
      expect(getDistanceToClosestIntersection(wires)).toEqual(159);
    });

    it('case 3', () => {
      const wires = [
        ['R98', 'U47', 'R26', 'D63', 'R33', 'U87', 'L62', 'D20', 'R33', 'U53', 'R51'],
        ['U98', 'R91', 'D20', 'R16', 'D67', 'R40', 'U7', 'R15', 'U6', 'R7'],
      ];
      expect(getDistanceToClosestIntersection(wires)).toEqual(135);
    });
  });
});
