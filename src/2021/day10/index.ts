interface CorruptRow {
  isCorrupt: true;
  row: string;
  corruptPoints: number;
  autocompletePoints?: number;
}

interface IncompleteRow {
  isCorrupt: false;
  row: string;
  corruptPoints?: number;
  autocompletePoints: number;
}

type Row = CorruptRow | IncompleteRow;

function prepareRows(input: string) {
  const corruptPointTable: Record<string, number> = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };

  const autocompletePointTable: Record<string, number> = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  };

  const openings = ['[', '(', '{', '<'];
  const endings = [']', ')', '}', '>'];

  const rows = input.split('\n').map((row): Row => {
    const openingStack: string[] = [];
    let corruptPoints = 0;

    const isCorrupt = row.split('').some((char) => {
      if (openings.includes(char)) {
        openingStack.push(char);
      } else {
        const endingLookupIndex = endings.indexOf(char);
        const lastOpening = openingStack.pop()!;
        const openingLookupIndex = openings.indexOf(lastOpening);

        if (openingLookupIndex !== endingLookupIndex) {
          // Corrupt
          corruptPoints = corruptPointTable[char];
          return true;
        }
      }
      return false;
    });

    const autocompletePoints = !isCorrupt
      ? openingStack.reduceRight((score, char) => {
          const lookupIndex = openings.indexOf(char);
          const expectedEnding = endings[lookupIndex];
          const points = autocompletePointTable[expectedEnding];

          return score * 5 + points;
        }, 0)
      : 0;

    return {
      isCorrupt,
      row,
      autocompletePoints,
      corruptPoints,
    };
  });

  return rows;
}

export function part1(input: string): number {
  let points = 0;
  prepareRows(input).forEach((row) => {
    if (row.isCorrupt) {
      points += row.corruptPoints;
    }
  });

  return points;
}

export function part2(input: string): number {
  const points = prepareRows(input)
    .filter((row): row is IncompleteRow => !row.isCorrupt)
    .map((row) => row.autocompletePoints)
    .sort((a, b) => a - b);

  // Get middle value
  return points.slice(Math.floor(points.length / 2))[0];
}
