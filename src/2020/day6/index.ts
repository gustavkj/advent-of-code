function countUnique(group: string[][]): number {
  return group.flat().filter((answer, index, array) => array.indexOf(answer) === index).length;
}

function parseInput(input: string) {
  return input.split('\n\n').map((group) => group.split('\n').map((person) => person.split('')));
}

export function part1(input: string): number {
  const answers = parseInput(input);

  // 6430
  return answers.reduce((sum, group) => sum + countUnique(group), 0);
}

function countCommon(group: string[][]) {
  const commonAnswers: Record<string, number> = {};

  group.flat().forEach((answer) => {
    commonAnswers[answer] = (commonAnswers[answer] ?? 0) + 1;
  });

  return Object.keys(commonAnswers).filter((key) => commonAnswers[key] === group.length).length;
}

export function part2(input: string): number {
  const answers = parseInput(input);

  // 3125
  return answers.reduce((sum, group) => sum + countCommon(group), 0);
}
