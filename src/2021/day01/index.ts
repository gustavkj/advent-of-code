function countIncreases(array: number[]): number {
  let numberOfIncreases = 0;
  let previous = array.shift()!;

  array.forEach((current) => {
    if (current > previous) {
      numberOfIncreases += 1;
    }

    previous = current;
  });

  return numberOfIncreases;
}

export function part1(input: string): number {
  const rows = input.split('\n').map(Number);

  return countIncreases(rows); // 1557
}

export function part2(input: string): number {
  const rows = input.split('\n');

  const measurementWindows: number[] = [];

  function addDepthToWindow(depth: number, window: number) {
    if (window < 0) {
      return;
    }
    if (typeof measurementWindows[window] !== 'number') {
      measurementWindows[window] = 0;
    }

    measurementWindows[window] += depth;
  }

  rows.forEach((row, index) => {
    const depthMeasurement = Number(row);

    [0, -1, -2].forEach((steps) => {
      const window = index + steps;
      addDepthToWindow(depthMeasurement, window);
    });
  });

  return countIncreases(measurementWindows); // 1608
}
