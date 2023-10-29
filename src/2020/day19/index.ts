/**
 * Replace self-reference tokens from rules that are prepared to become RegExp.
 * @param rules An array of rules prepared to be converted to RegExp.
 * @param ruleNum The number of the rule for which the reference tokens should be replaced.
 * @param maxTimes The max times the rule should be repeated.
 */
function replaceSelfReference(rules: string[], ruleNum: number, maxTimes: number) {
  const regexp = new RegExp(`#${ruleNum}`, 'g');
  const arrayBySize = new Array(maxTimes).fill('');

  return rules.flatMap((rule) =>
    arrayBySize.map((_, index) => rule.replace(regexp, `{${index + 1}}`)),
  );
}

function buildRuleZero(ruleSpecs: Map<number, string>) {
  const rulePreps = new Map<number, number[][]>();
  const resolvedRules = new Set<number>();

  while (resolvedRules.size !== ruleSpecs.size) {
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    ruleSpecs.forEach((ruleSpec, ruleNum) => {
      if (resolvedRules.has(ruleNum)) {
        return;
      }

      if (/"[a-z]"/.test(ruleSpec)) {
        ruleSpecs.set(ruleNum, ruleSpec.slice(1, -1));
        resolvedRules.add(ruleNum);
        return;
      }

      let subRules: number[][];
      if (rulePreps.has(ruleNum)) {
        subRules = rulePreps.get(ruleNum)!;
      } else {
        subRules = ruleSpec.split('|').map((rulePart) => rulePart.trim().split(' ').map(Number));

        rulePreps.set(ruleNum, subRules);
      }

      const allSubRulesAreResolved = subRules.every((rulePart) =>
        rulePart.every((subRuleNum) => resolvedRules.has(subRuleNum) || ruleNum === subRuleNum),
      );

      if (!allSubRulesAreResolved) {
        return;
      }

      const selfRef = subRules.some((rulePart) =>
        rulePart.some((subRuleNum) => ruleNum === subRuleNum),
      );

      const resolvedRule = subRules
        .slice(selfRef ? 1 : 0)
        .map((subRule) => {
          const newRule = subRule
            .map((subRuleNum) =>
              ruleNum === subRuleNum ? `#${ruleNum}` : `(?:${ruleSpecs.get(subRuleNum)!})`,
            )
            .join('');

          // Replace self-referencing rules with "#n" where n is the rule number.

          return (
            newRule +
            (newRule.includes(`#${ruleNum}`) && !newRule.endsWith(`#${ruleNum}`)
              ? `#${ruleNum}`
              : '')
          );
        })
        .join('|');

      resolvedRules.add(ruleNum);
      ruleSpecs.set(ruleNum, resolvedRule);
    });
  }

  const ruleZero = ruleSpecs.get(0);

  if (!ruleZero) {
    throw new Error('rule 0 is not defined');
  }

  return `^${ruleZero}$`;
}

function parseInput(input: string) {
  const [rulesForValidMessagesPreParse, receivedMessages] = input
    .split('\n\n')
    .map((section) => section.split('\n'));

  const ruleSpecs = new Map<number, string>();

  rulesForValidMessagesPreParse.forEach((ruleRow) => {
    const [ruleNum, ruleSpec] = ruleRow.split(': ');
    ruleSpecs.set(Number(ruleNum), ruleSpec);
  });

  return {
    ruleSpecs,
    receivedMessages,
  };
}

export function part1(input: string): number {
  const { ruleSpecs, receivedMessages } = parseInput(input);
  const ruleZero = buildRuleZero(ruleSpecs);

  // 124
  return receivedMessages.filter((message) => new RegExp(ruleZero).test(message)).length;
}

export function part2(input: string): number {
  const { ruleSpecs, receivedMessages } = parseInput(input);
  ruleSpecs.set(8, '42 | 42 8');
  ruleSpecs.set(11, '42 31 | 42 11 31');

  const ruleZero = buildRuleZero(ruleSpecs);

  const maxTimes = 8;
  const regexps = replaceSelfReference(replaceSelfReference([ruleZero], 8, maxTimes), 11, maxTimes);

  // 228
  return receivedMessages.filter((message) => new RegExp(regexps.join('|')).test(message)).length;
}
