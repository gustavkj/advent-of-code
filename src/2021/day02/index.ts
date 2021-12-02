type Direction = 'forward' | 'up' | 'down';

interface Command {
  direction: Direction;
  units: number;
}

function parseInput(input: string): Command[] {
  return input.split('\n').map((row): Command => {
    const [direction, units] = row.split(' ');
    return { direction: direction as Direction, units: Number(units) };
  });
}

export function part1(input: string): number {
  const commands = parseInput(input);

  let horizontalPosition = 0;
  let depth = 0;

  commands.forEach((command) => {
    switch (command.direction) {
      case 'forward':
        horizontalPosition += command.units;
        break;
      case 'up':
        depth -= command.units;
        break;
      case 'down':
        depth += command.units;
        break;
      default:
        throw new TypeError(`Unknown command direction: ${command.direction as string}`);
    }
  });

  return horizontalPosition * depth; // 1604850
}

export function part2(input: string): number {
  const commands = parseInput(input);

  let horizontalPosition = 0;
  let depth = 0;
  let aim = 0;

  commands.forEach((command) => {
    switch (command.direction) {
      case 'forward':
        horizontalPosition += command.units;
        depth += aim * command.units;
        break;
      case 'up':
        aim -= command.units;
        break;
      case 'down':
        aim += command.units;
        break;
      default:
        throw new TypeError(`Unknown command direction: ${command.direction as string}`);
    }
  });

  return horizontalPosition * depth; // 1685186100
}
