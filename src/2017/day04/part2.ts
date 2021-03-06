export function part2(data: string): number {
  const noValid = data.split('\n').reduce((sum, passphrase) => {
    const words = passphrase.split(/\s/).map((word) => word.split('').sort().join(''));

    for (let i = 0; i < words.length - 1; i += 1) {
      for (let k = i + 1; k < words.length; k += 1) {
        if (words[i] === words[k]) {
          return sum;
        }
      }
    }
    return sum + 1;
  }, 0);

  return noValid; // 265
}
