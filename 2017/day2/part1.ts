export function part1(data: string): number {
  const checksum = data.split('\n').reduce((sum, val) => {
    const row = val.split(/\s/).map((num) => parseInt(num, 10));
    const max = row.reduce((maxVal, cur) => Math.max(maxVal, cur));
    const min = row.reduce((minVal, cur) => Math.min(minVal, cur));
    return sum + max - min;
  }, 0);

  return checksum; // 30994
}
