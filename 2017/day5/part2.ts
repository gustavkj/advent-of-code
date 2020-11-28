export function part2(data: string): number {
  const jumps = data.split('\n').map((num) => parseInt(num, 10));

  let steps = 0;
  let i = 0;

  while (i >= 0 && i < jumps.length) {
    const prevIndex = i;
    if (jumps[i] >= 3) {
      i += jumps[i];
      jumps[prevIndex] -= 1;
    } else {
      i += jumps[i];
      jumps[prevIndex] += 1;
    }
    steps += 1;
  }
  return steps; // 30513679
}
