interface SignalEntry {
  uniqueSignalPatterns: string[];
  fourDigitOutputValue: string[];
}

function sortString(value: string) {
  return [...value].sort().join('');
}

function parseInput(input: string): SignalEntry[] {
  return input.split('\n').map((row) => {
    const pattern =
      /(\w+) (\w+) (\w+) (\w+) (\w+) (\w+) (\w+) (\w+) (\w+) (\w+) \| (\w+) (\w+) (\w+) (\w+)/;

    const match = pattern.exec(row);

    if (!match) {
      throw new Error(`Pattern couldn't match the input: ${row}`);
    }

    const uniqueSignalPatterns = match.slice(1, 11);
    const fourDigitOutputValue = match.slice(11).map(sortString);

    return {
      uniqueSignalPatterns,
      fourDigitOutputValue,
    };
  });
}

function getNumberOfSelectedDigits(signalEntry: SignalEntry) {
  // 1, 4, 7, 8 has the following number of active segments 2, 4, 3, 7
  const activeSegments = [2, 4, 3, 7];
  return signalEntry.fourDigitOutputValue.filter((outputValue) =>
    activeSegments.includes(outputValue.length),
  ).length;
}

export function part1(input: string): number {
  const signalEntries = parseInput(input);

  return signalEntries.reduce((sum, entry) => sum + getNumberOfSelectedDigits(entry), 0);
}

function getPatternOfLengthAndSegmentsFactory(initialSignalPatterns: string[]) {
  const signalPatterns: string[] = [...initialSignalPatterns];

  return function getPatternOfLengthAndSegments(length: number, segments?: string): string {
    const matchIndex = signalPatterns.findIndex(
      (pattern) =>
        pattern.length === length &&
        (segments === undefined ||
          [...segments].every((segmentLetter) => pattern.includes(segmentLetter))),
    );

    if (matchIndex === -1) {
      throw new Error(
        `getPatternOfLengthAndSegments: length: ${length}, segments: ${String(
          segments,
        )}, signalPatterns: ${JSON.stringify(signalPatterns)}`,
      );
    }

    const match = signalPatterns.splice(matchIndex, 1)[0];

    return sortString(match);
  };
}

function getPatternDifference(biggerPattern: string, smallerPattern: string) {
  const match = [...biggerPattern].find((segmentLetter) => !smallerPattern.includes(segmentLetter));

  if (!match) {
    throw new Error(
      `getPatternDifference: biggerPattern: ${biggerPattern}, smallerPattern: ${smallerPattern}`,
    );
  }

  return match;
}

function interpretSignalPatterns(signalEntry: SignalEntry) {
  const { uniqueSignalPatterns } = signalEntry;

  const getPatternOfLengthAndSegments = getPatternOfLengthAndSegmentsFactory(uniqueSignalPatterns);

  const numberPatternMap: Record<number, string> = {};

  numberPatternMap[1] = getPatternOfLengthAndSegments(2);
  numberPatternMap[4] = getPatternOfLengthAndSegments(4);
  numberPatternMap[7] = getPatternOfLengthAndSegments(3);
  numberPatternMap[8] = getPatternOfLengthAndSegments(7);

  /*

  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg

  */

  const segmentMap: Record<string, string> = {};

  segmentMap.a = getPatternDifference(numberPatternMap[7], numberPatternMap[1]);

  const numberNineWithoutG = numberPatternMap[4] + segmentMap.a;
  numberPatternMap[9] = getPatternOfLengthAndSegments(6, numberNineWithoutG);
  segmentMap.g = getPatternDifference(numberPatternMap[9], numberNineWithoutG);

  const numberThreeWithoutD = numberPatternMap[1] + segmentMap.a + segmentMap.g;
  numberPatternMap[3] = getPatternOfLengthAndSegments(5, numberThreeWithoutD);
  segmentMap.d = getPatternDifference(numberPatternMap[3], numberThreeWithoutD);

  segmentMap.b = getPatternDifference(numberPatternMap[9], numberPatternMap[3]);

  const numberFiveWithoutF = segmentMap.a + segmentMap.b + segmentMap.d + segmentMap.g;
  numberPatternMap[5] = getPatternOfLengthAndSegments(5, numberFiveWithoutF);
  segmentMap.f = getPatternDifference(numberPatternMap[5], numberFiveWithoutF);

  segmentMap.c = getPatternDifference(numberPatternMap[1], segmentMap.f);

  const numberZeroWrongOrder = numberPatternMap[8].replace(segmentMap.d, '');
  numberPatternMap[0] = getPatternOfLengthAndSegments(6, numberZeroWrongOrder);
  segmentMap.e = getPatternDifference(
    numberPatternMap[0],
    numberPatternMap[7] + segmentMap.b + segmentMap.g,
  );

  const numberTwoWrongOrder = numberPatternMap[3].replace(segmentMap.f, '') + segmentMap.e;
  numberPatternMap[2] = getPatternOfLengthAndSegments(5, numberTwoWrongOrder);

  // Only number 6 is remaining
  numberPatternMap[6] = getPatternOfLengthAndSegments(6);

  return Object.fromEntries(
    Object.entries(numberPatternMap).map(([targetNumber, pattern]) => [
      pattern,
      Number(targetNumber),
    ]),
  );
}

export function part2(input: string): number {
  const signalEntries = parseInput(input);

  return signalEntries.reduce((sum, entry) => {
    const patternToNumberMap = interpretSignalPatterns(entry);

    const outputNumber = Number(
      entry.fourDigitOutputValue.map((outputPattern) => patternToNumberMap[outputPattern]).join(''),
    );

    return sum + outputNumber;
  }, 0);
}
