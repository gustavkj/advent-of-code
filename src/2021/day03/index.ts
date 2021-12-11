export function part1(input: string): number {
  const rows = input.split('\n');
  const occurrencesOfOnes = new Array<number>(rows[0].length).fill(0);

  rows.forEach((row) => {
    row.split('').forEach((bit, position) => {
      if (bit === '1') {
        occurrencesOfOnes[position] += 1;
      }
    });
  });

  const tmpGammaRate: string[] = [];
  const tmpEpsilonRate: string[] = [];

  const half = rows.length / 2;

  occurrencesOfOnes.forEach((numberOfOne) => {
    if (numberOfOne > half) {
      tmpGammaRate.push('1');
      tmpEpsilonRate.push('0');
    } else {
      tmpGammaRate.push('0');
      tmpEpsilonRate.push('1');
    }
  });

  const gammaRate = parseInt(tmpGammaRate.join(''), 2);
  const epsilonRate = parseInt(tmpEpsilonRate.join(''), 2);
  const powerConsumption = gammaRate * epsilonRate;

  return powerConsumption; // 4147524
}

export function part2(input: string): number {
  const rows = input.split('\n');

  const skippedRowOGR = new Set<number>();
  const skippedRowCSR = new Set<number>();

  let oxygenGeneratorRatingDone = false;
  let co2ScrubberRatingDone = false;

  for (let bitPosition = 0; bitPosition < rows[0].length; bitPosition += 1) {
    if (rows.length - skippedRowOGR.size === 1) {
      oxygenGeneratorRatingDone = true;
    }
    if (rows.length - skippedRowCSR.size === 1) {
      co2ScrubberRatingDone = true;
    }

    if (oxygenGeneratorRatingDone && co2ScrubberRatingDone) {
      break;
    }

    const rowsWithOneOGR: number[] = [];
    const rowsWithZeroOGR: number[] = [];
    const rowsWithOneCSR: number[] = [];
    const rowsWithZeroCSR: number[] = [];

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
      const skipOGR = skippedRowOGR.has(rowIndex);
      const skipCSR = skippedRowCSR.has(rowIndex);

      const bit = rows[rowIndex][bitPosition];

      if (bit === '1') {
        if (!skipOGR) rowsWithOneOGR.push(rowIndex);
        if (!skipCSR) rowsWithOneCSR.push(rowIndex);
      } else {
        if (!skipOGR) rowsWithZeroOGR.push(rowIndex);
        if (!skipCSR) rowsWithZeroCSR.push(rowIndex);
      }
    }

    if (!oxygenGeneratorRatingDone) {
      if (rowsWithOneOGR.length >= rowsWithZeroOGR.length) {
        rowsWithZeroOGR.forEach((rowNumber) => skippedRowOGR.add(rowNumber));
      } else {
        rowsWithOneOGR.forEach((rowNumber) => skippedRowOGR.add(rowNumber));
      }
    }
    if (!co2ScrubberRatingDone) {
      if (rowsWithOneCSR.length >= rowsWithZeroCSR.length) {
        rowsWithOneCSR.forEach((rowNumber) => skippedRowCSR.add(rowNumber));
      } else {
        rowsWithZeroCSR.forEach((rowNumber) => skippedRowCSR.add(rowNumber));
      }
    }
  }

  const oxygenGeneratorRating = parseInt(
    rows.find((_row, rowIndex) => !skippedRowOGR.has(rowIndex)) as string,
    2,
  );

  const co2ScrubberRating = parseInt(
    rows.find((_row, rowIndex) => !skippedRowCSR.has(rowIndex)) as string,
    2,
  );

  const lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating;
  return lifeSupportRating; // 3570354
}
