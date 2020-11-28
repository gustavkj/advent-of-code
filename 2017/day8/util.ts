import { ConditionType, Instruction, Modifier } from './types';

export function toInstruction(row: string): Instruction {
  const splitRow = row.split(/\s/);

  return {
    opVar: splitRow[0],
    opFun: splitRow[1] as Modifier,
    opNum: Number(splitRow[2]),
    conVar: splitRow[4],
    conType: splitRow[5] as ConditionType,
    conNum: Number(splitRow[6]),
  };
}

export function operate(operator: Modifier, left: number, right: number): number {
  switch (operator) {
    case 'inc':
      return left + right;
    case 'dec':
      return left - right;
    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Unknown operator: ${operator}`);
  }
}

export function compare(type: ConditionType, left: number, right: number): boolean {
  switch (type) {
    case '==':
      return left === right;
    case '!=':
      return left !== right;
    case '>':
      return left > right;
    case '>=':
      return left >= right;
    case '<':
      return left < right;
    case '<=':
      return left <= right;
    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Unknown comparator type: ${type}`);
  }
}
