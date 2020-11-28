export function part1(data: string): number {
  const numbers = data.split('').map((num) => parseInt(num, 10));

  const captcha = numbers.reduce((sum, val, i, arr) => {
    if (i === 0 && val === arr[arr.length - 1]) {
      return sum + val;
    }
    if (val === arr[i - 1]) {
      return sum + val;
    }
    return sum;
  }, 0);

  return captcha; // 1216
}
