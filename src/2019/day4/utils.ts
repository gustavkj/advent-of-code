interface Boundaries {
  lower: number;
  upper: number;
}

export function getBoundaries(input: string): Boundaries {
  const boundaries = input.split('-').map(Number);
  return { lower: boundaries[0], upper: boundaries[1] };
}
