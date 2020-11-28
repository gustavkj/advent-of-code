export function part1(data: string): number {
  const target = Number(data);

  const sqrt = Math.sqrt(target);
  const sqrtHi = Math.ceil(sqrt);
  const sqrtRound = Math.round(sqrt);
  const sqrtLo = sqrtHi - 1;

  const cornerHi = sqrtHi ** 2;
  const cornerLo = sqrtLo ** 2 + 1;
  const stepsToMiddle = sqrtHi % 2 === 0 ? (sqrtHi - 2) / 2 : Math.floor(sqrtHi / 2);

  let steps = Math.floor(sqrtHi / 2); // Steps to middle of spiral from layer

  if (sqrtRound === sqrtHi) {
    steps += Math.abs(target - (cornerHi - stepsToMiddle));
  } else {
    steps += Math.abs(target - (cornerLo + stepsToMiddle));
  }

  return steps; // 371
}
