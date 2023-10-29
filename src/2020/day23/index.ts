export function part1(input: string): string {
  const cups = input.split('').map(Number);

  const moves = 100;
  let i = 0;
  const maxCup = Math.max(...cups);

  while (i < moves) {
    const currentCup = cups[0];
    const cupsToMove = cups.splice(1, 3);

    const preliminaryDestinations = cups.filter((cup) => !cupsToMove.includes(cup));
    let destinationCup = currentCup - 1;
    while (!preliminaryDestinations.includes(destinationCup)) {
      if (destinationCup === 0) {
        destinationCup = maxCup;
      } else {
        destinationCup -= 1;
      }
    }

    const destinationCupIndex = cups.findIndex((cup) => cup === destinationCup);

    cups.splice(destinationCupIndex + 1, 0, ...cupsToMove);

    cups.push(cups.shift()!);
    i += 1;
  }

  const [end, start] = cups.join('').split('1');

  return `${start}${end}`;
}

interface Cup {
  label: number;
  next: number;
}

export function part2(input: string): number {
  const startingCups = input.split('').map(Number);
  const totalNumberOfCups = 1000000;
  const cups = new Map(
    startingCups.map((label, index, array) => [
      label,
      { label, next: array[index + 1] ?? 10 } as Cup,
    ]),
  );

  for (let k = 10; k <= totalNumberOfCups; k += 1) {
    cups.set(k, { label: k, next: k + 1 > totalNumberOfCups ? startingCups[0] : k + 1 });
  }

  const moves = 10000000;
  let i = 0;
  const maxCup = totalNumberOfCups;

  let currentCup = cups.get(startingCups[0])!;

  while (i < moves) {
    const cupsToMove = [];
    let nextCup = cups.get(currentCup.next)!;

    while (cupsToMove.length < 3) {
      cupsToMove.push(nextCup.label);
      nextCup = cups.get(nextCup.next)!;
    }

    let destinationCupLabel = currentCup.label - 1;
    while (cupsToMove.includes(destinationCupLabel) || destinationCupLabel === 0) {
      if (destinationCupLabel === 0) {
        destinationCupLabel = maxCup;
      } else {
        destinationCupLabel -= 1;
      }
    }

    const destinationCup = cups.get(destinationCupLabel)!;

    const lastCup = cups.get(cupsToMove[2])!;
    currentCup.next = lastCup.next;
    lastCup.next = destinationCup.next;
    [destinationCup.next] = cupsToMove;

    cups.set(currentCup.label, currentCup);
    cups.set(destinationCup.label, destinationCup);
    cups.set(lastCup.label, lastCup);

    currentCup = cups.get(currentCup.next)!;
    i += 1;
  }

  const cupOne = cups.get(1)!;
  const cupTwo = cups.get(cupOne.next)!;
  const cupThree = cups.get(cupTwo.next)!;

  return cupTwo.label * cupThree.label;
}
