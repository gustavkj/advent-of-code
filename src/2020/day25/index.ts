export function getLoopSizeFromPublicKey(publicKey: number): number {
  let loopSize = 0;
  let value = 1;
  const subjectNumber = 7;

  while (value !== publicKey) {
    value *= subjectNumber;
    value %= 20201227;
    loopSize += 1;
  }

  return loopSize;
}

export function transform(subjectNumber: number, loopSize: number): number {
  let i = 0;
  let value = 1;

  while (i < loopSize) {
    value *= subjectNumber;
    value %= 20201227;
    i += 1;
  }

  return value;
}

export function part1(input: string): number {
  const publicKeys = input.split('\n').map(Number);

  const loopSizes = publicKeys.map(getLoopSizeFromPublicKey);

  return transform(publicKeys[0], loopSizes[1]); // 9714832
}
