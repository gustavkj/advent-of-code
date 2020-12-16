interface RuleCondition {
  rangeOneLo: number;
  rangeOneHi: number;
  rangeTwoLo: number;
  rangeTwoHi: number;
}

function getTicketNumbers(ticketRow: string) {
  return ticketRow.split(',').map(Number);
}

function parseInput(input: string) {
  const splits = input.split('\n\n');

  const rules: Record<string, RuleCondition> = {};

  splits[0].split('\n').forEach((row) => {
    const match = /([\w\s]+): (\d+)-(\d+) or (\d+)-(\d+)/.exec(row);

    if (match === null) {
      throw new Error(`Failed to parse rule: ${row}`);
    }

    rules[match[1]] = {
      rangeOneLo: Number(match[2]),
      rangeOneHi: Number(match[3]),
      rangeTwoLo: Number(match[4]),
      rangeTwoHi: Number(match[5]),
    };
  });

  const yourTicket = getTicketNumbers(splits[1].split('\n')[1]);

  const nearbyTickets = splits[2].split('\n').slice(1).map(getTicketNumbers);

  return {
    rules,
    yourTicket,
    nearbyTickets,
  };
}

function functionFromCondition({ rangeOneLo, rangeOneHi, rangeTwoLo, rangeTwoHi }: RuleCondition) {
  return (value: number) =>
    (value >= rangeOneLo && value <= rangeOneHi) || (value >= rangeTwoLo && value <= rangeTwoHi);
}

function getInvalidTicketNumbersFactory(rules: Record<string, RuleCondition>) {
  const conditions = Object.values(rules).map(functionFromCondition);

  return function getInvalidTicketNumbers(ticket: number[]): number[] {
    return ticket.filter((ticketNumber) =>
      conditions.every((condition) => !condition(ticketNumber)),
    );
  };
}

export function part1(input: string): number {
  const { rules, nearbyTickets } = parseInput(input);

  const getInvalidTicketNumbers = getInvalidTicketNumbersFactory(rules);

  // 29851
  return nearbyTickets
    .flatMap(getInvalidTicketNumbers)
    .reduce((sum, ticketNumber) => sum + ticketNumber, 0);
}

function isValidFactory(rules: Record<string, RuleCondition>) {
  const conditions = Object.values(rules).map(functionFromCondition);

  return function isValid(ticket: number[]): boolean {
    return ticket.every(
      (ticketNumber) => !conditions.every((condition) => !condition(ticketNumber)),
    );
  };
}

export function part2(input: string): number {
  const { rules, yourTicket, nearbyTickets } = parseInput(input);

  const validNearbyTickets = nearbyTickets.filter(isValidFactory(rules));
  const potentialFieldPositions: Record<string, Set<number>> = {};
  const fieldPositions: Record<string, number> = {};

  Object.entries(rules).forEach(([ruleName, rule]) => {
    const isCompliantWithRule = functionFromCondition(rule);

    potentialFieldPositions[ruleName] = new Set<number>();

    let index = 0;

    while (index < yourTicket.length) {
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      const matchesRule = validNearbyTickets.every((ticket) => isCompliantWithRule(ticket[index]));

      if (matchesRule) {
        potentialFieldPositions[ruleName].add(index);
      }

      index += 1;
    }
  });

  const fieldsYetToBePlaced = new Set(Object.keys(potentialFieldPositions));

  while (fieldsYetToBePlaced.size > 0) {
    const indicesToRemove: number[] = [];

    fieldsYetToBePlaced.forEach((fieldName) => {
      if (potentialFieldPositions[fieldName].size === 1) {
        [fieldPositions[fieldName]] = [...potentialFieldPositions[fieldName].values()];
        indicesToRemove.push(fieldPositions[fieldName]);
        fieldsYetToBePlaced.delete(fieldName);
      }
    });

    Object.values(potentialFieldPositions).forEach((indicies) => {
      indicesToRemove.forEach((index) => indicies.delete(index));
    });
  }

  // 3029180675981
  return Object.entries(fieldPositions).reduce(
    (product, [fieldName, index]) =>
      product * (fieldName.startsWith('departure') ? yourTicket[index] : 1),
    1,
  );
}
