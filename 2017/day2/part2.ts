export function part2(data: string): number {
  const checksum = data.split('\n').reduce((sum, val) => {
    const row = val.split(/\s/).map((num) => parseInt(num, 10));
    for (let i = 0; i < row.length; i += 1) {
      for (let k = 0; k < row.length; k += 1) {
        if (i !== k && row[i] % row[k] === 0) {
          return sum + row[i] / row[k];
        }
      }
    }
    return sum;
  }, 0);

  return checksum; // 233
}
