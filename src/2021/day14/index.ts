function parseInput(input: string) {
  const [templateInput, rulesInput] = input.split('\n\n');
  const template = templateInput.split('');
  const rules = Object.fromEntries(
    rulesInput.split('\n').map((row) => row.split(' -> ') as [string, string]),
  );

  return { template, rules };
}

function getPolymerAfterNthIteration(template: string[], rules: Record<string, string>, n: number) {
  let polymer = template;
  for (let step = 0; step < n; step += 1) {
    const nextTemplate: string[] = [];

    for (let index = 0; index < polymer.length - 1; index += 1) {
      const pair = polymer[index] + polymer[index + 1];
      const middle = rules[pair];

      nextTemplate.push(polymer[index], middle);
    }

    nextTemplate.push(...polymer.slice(-1));
    polymer = nextTemplate;
  }

  return polymer;
}

function getMostLeastCommonSubtraction(polymer: string[]): number {
  const occurrences: Record<string, number> = {};

  polymer.forEach((letter) => {
    occurrences[letter] = (occurrences[letter] ?? 0) + 1;
  });

  const letters = Object.keys(occurrences);
  let mostCommon = letters[0];
  let leastCommon = letters[0];

  for (let index = 1; index < letters.length; index += 1) {
    const letter = letters[index];

    if (occurrences[letter] > occurrences[mostCommon]) {
      mostCommon = letter;
    }
    if (occurrences[letter] < occurrences[leastCommon]) {
      leastCommon = letter;
    }
  }

  return occurrences[mostCommon] - occurrences[leastCommon];
}

export function part1(input: string): number {
  const { template, rules } = parseInput(input);
  const polymer = getPolymerAfterNthIteration(template, rules, 10);
  return getMostLeastCommonSubtraction(polymer);
}
