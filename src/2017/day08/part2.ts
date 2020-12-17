import { compare, operate, toInstruction } from './util';

export function part2(data: string): number {
  const instructions = data.split('\n').map(toInstruction);
  const regs: Record<string, number> = {};
  let max = 0;

  instructions.forEach((inst) => {
    if (typeof regs[inst.opVar] === 'undefined') {
      regs[inst.opVar] = 0;
    }

    if (typeof regs[inst.conVar] === 'undefined') {
      regs[inst.conVar] = 0;
    }

    if (compare(inst.conType, regs[inst.conVar], inst.conNum)) {
      regs[inst.opVar] = operate(inst.opFun, regs[inst.opVar], inst.opNum);
    }

    max = Math.max(max, ...Object.values(regs));
  });

  return max; // 6366
}
