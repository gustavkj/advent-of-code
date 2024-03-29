import { part1, part2 } from '.';

describe('2020 day 20', () => {
  describe('part 1', () => {
    const input = [
      'Tile 2311:',
      '..##.#..#.',
      '##..#.....',
      '#...##..#.',
      '####.#...#',
      '##.##.###.',
      '##...#.###',
      '.#.#.#..##',
      '..#....#..',
      '###...#.#.',
      '..###..###',
      '',
      'Tile 1951:',
      '#.##...##.',
      '#.####...#',
      '.....#..##',
      '#...######',
      '.##.#....#',
      '.###.#####',
      '###.##.##.',
      '.###....#.',
      '..#.#..#.#',
      '#...##.#..',
      '',
      'Tile 1171:',
      '####...##.',
      '#..##.#..#',
      '##.#..#.#.',
      '.###.####.',
      '..###.####',
      '.##....##.',
      '.#...####.',
      '#.##.####.',
      '####..#...',
      '.....##...',
      '',
      'Tile 1427:',
      '###.##.#..',
      '.#..#.##..',
      '.#.##.#..#',
      '#.#.#.##.#',
      '....#...##',
      '...##..##.',
      '...#.#####',
      '.#.####.#.',
      '..#..###.#',
      '..##.#..#.',
      '',
      'Tile 1489:',
      '##.#.#....',
      '..##...#..',
      '.##..##...',
      '..#...#...',
      '#####...#.',
      '#..#.#.#.#',
      '...#.#.#..',
      '##.#...##.',
      '..##.##.##',
      '###.##.#..',
      '',
      'Tile 2473:',
      '#....####.',
      '#..#.##...',
      '#.##..#...',
      '######.#.#',
      '.#...#.#.#',
      '.#########',
      '.###.#..#.',
      '########.#',
      '##...##.#.',
      '..###.#.#.',
      '',
      'Tile 2971:',
      '..#.#....#',
      '#...###...',
      '#.#.###...',
      '##.##..#..',
      '.#####..##',
      '.#..####.#',
      '#..#.#..#.',
      '..####.###',
      '..#.#.###.',
      '...#.#.#.#',
      '',
      'Tile 2729:',
      '...#.#.#.#',
      '####.#....',
      '..#.#.....',
      '....#..#.#',
      '.##..##.#.',
      '.#.####...',
      '####.#.#..',
      '##.####...',
      '##..#.##..',
      '#.##...##.',
      '',
      'Tile 3079:',
      '#.#.#####.',
      '.#..######',
      '..#.......',
      '######....',
      '####.#..#.',
      '.#...#.##.',
      '#.#####.##',
      '..#.###...',
      '..#.......',
      '..#.###...',
    ].join('\n');

    it('should return product of the IDs of the four corner tiles', () => {
      expect(part1(input)).toBe(20899048083289);
    });
  });

  describe('part 2', () => {
    const input = [
      'Tile 2311:',
      '..##.#..#.',
      '##..#.....',
      '#...##..#.',
      '####.#...#',
      '##.##.###.',
      '##...#.###',
      '.#.#.#..##',
      '..#....#..',
      '###...#.#.',
      '..###..###',
      '',
      'Tile 1951:',
      '#.##...##.',
      '#.####...#',
      '.....#..##',
      '#...######',
      '.##.#....#',
      '.###.#####',
      '###.##.##.',
      '.###....#.',
      '..#.#..#.#',
      '#...##.#..',
      '',
      'Tile 1171:',
      '####...##.',
      '#..##.#..#',
      '##.#..#.#.',
      '.###.####.',
      '..###.####',
      '.##....##.',
      '.#...####.',
      '#.##.####.',
      '####..#...',
      '.....##...',
      '',
      'Tile 1427:',
      '###.##.#..',
      '.#..#.##..',
      '.#.##.#..#',
      '#.#.#.##.#',
      '....#...##',
      '...##..##.',
      '...#.#####',
      '.#.####.#.',
      '..#..###.#',
      '..##.#..#.',
      '',
      'Tile 1489:',
      '##.#.#....',
      '..##...#..',
      '.##..##...',
      '..#...#...',
      '#####...#.',
      '#..#.#.#.#',
      '...#.#.#..',
      '##.#...##.',
      '..##.##.##',
      '###.##.#..',
      '',
      'Tile 2473:',
      '#....####.',
      '#..#.##...',
      '#.##..#...',
      '######.#.#',
      '.#...#.#.#',
      '.#########',
      '.###.#..#.',
      '########.#',
      '##...##.#.',
      '..###.#.#.',
      '',
      'Tile 2971:',
      '..#.#....#',
      '#...###...',
      '#.#.###...',
      '##.##..#..',
      '.#####..##',
      '.#..####.#',
      '#..#.#..#.',
      '..####.###',
      '..#.#.###.',
      '...#.#.#.#',
      '',
      'Tile 2729:',
      '...#.#.#.#',
      '####.#....',
      '..#.#.....',
      '....#..#.#',
      '.##..##.#.',
      '.#.####...',
      '####.#.#..',
      '##.####...',
      '##..#.##..',
      '#.##...##.',
      '',
      'Tile 3079:',
      '#.#.#####.',
      '.#..######',
      '..#.......',
      '######....',
      '####.#..#.',
      '.#...#.##.',
      '#.#####.##',
      '..#.###...',
      '..#.......',
      '..#.###...',
    ].join('\n');

    it('should return how many # are not part of a sea monster', () => {
      expect(part2(input)).toBe(273);
    });
  });
});
