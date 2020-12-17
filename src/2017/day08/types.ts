export type ConditionType = '==' | '!=' | '>' | '>=' | '<' | '<=';

export type Modifier = 'inc' | 'dec';

export interface Instruction {
  opVar: string;
  opFun: Modifier;
  opNum: number;
  conVar: string;
  conType: ConditionType;
  conNum: number;
}
