function parseInput(input: string) {
  const [template, rulesInput] = input.split('\n\n');
  const rules = new Map(rulesInput.split('\n').map((row) => row.split(' -> ') as [string, string]));

  return { template, rules };
}

function getResultAfterNthIteration(template: string, rules: Map<string, string>, n: number) {
  let polymerPairs = new Map<string, number>();
  const occurrences = new Map<string, number>();

  for (let index = 0; index < template.length - 1; index += 1) {
    const polymerPair = template[index] + template[index + 1];
    occurrences.set(template[index], (occurrences.get(template[index]) ?? 0) + 1);
    const numberOfPairs = polymerPairs.get(polymerPair);

    polymerPairs.set(polymerPair, (numberOfPairs ?? 0) + 1);
  }
  occurrences.set(template.slice(-1), (occurrences.get(template.slice(-1)) ?? 0) + 1);

  for (let step = 0; step < n; step += 1) {
    const nextPolymerPairs = new Map<string, number>();

    polymerPairs.forEach((numberOfPairs, polymerPair) => {
      const middle = rules.get(polymerPair)!;
      const newPairFront = polymerPair[0] + middle;
      const newPairBack = middle + polymerPair[1];

      const frontNumber = nextPolymerPairs.get(newPairFront);
      const backNumber = nextPolymerPairs.get(newPairBack);

      nextPolymerPairs.set(newPairFront, (frontNumber ?? 0) + numberOfPairs);
      nextPolymerPairs.set(newPairBack, (backNumber ?? 0) + numberOfPairs);

      occurrences.set(middle, (occurrences.get(middle) ?? 0) + numberOfPairs);
    });

    polymerPairs = nextPolymerPairs;
  }

  const values = [...occurrences.values()];

  const mostCommon = Math.max(...values);
  const leastCommon = Math.min(...values);

  return mostCommon - leastCommon;
}

export function part1(input: string): number {
  const { template, rules } = parseInput(input);
  const result = getResultAfterNthIteration(template, rules, 10);

  return result;
}

export function part2(input: string): number {
  const { template, rules } = parseInput(input);
  const result = getResultAfterNthIteration(template, rules, 40);

  return result;
}
