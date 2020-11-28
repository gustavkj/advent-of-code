export function part1(data: string): number {
  const banks = data.split(/\s/).map((num) => parseInt(num, 10));
  let cycles = 0;
  const preComb: string[] = [];

  while (!preComb.includes(banks.join(''))) {
    preComb.push(banks.join(''));

    const max = banks.reduce(
      (maxNode, curVal, curInd) => {
        return {
          val: Math.max(maxNode.val, curVal),
          ind: curVal > maxNode.val ? curInd : maxNode.ind,
        };
      },
      { val: 0, ind: 0 },
    );

    let i = (max.ind + 1) % banks.length;
    let remaining = max.val;
    const dist = Math.ceil(max.val / banks.length);

    while (i !== max.ind && remaining - dist >= 0) {
      banks[i] += dist;
      remaining -= dist;
      i = (i + 1) % banks.length;
    }

    banks[max.ind] = remaining;

    cycles += 1;
  }
  return cycles; // 11137
}
