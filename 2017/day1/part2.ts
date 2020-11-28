export function part2(data: string): number {
  const numbers = data.split('').map((num) => parseInt(num, 10));
  const step = numbers.length / 2;

  const captcha = numbers.reduce((sum, val, i, arr) => {
    if (val === arr[(i + step) % numbers.length]) {
      return sum + val;
    }
    return sum;
  }, 0);

  return captcha; // 1072
}
