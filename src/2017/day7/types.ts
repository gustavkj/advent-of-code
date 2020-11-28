export interface Disc {
  key: string;
  weight: number;
  children: Disc[];
  childKeys: string[];
  hasParent: boolean;
}

export interface BalancedDisc extends Disc {
  isBalanced: boolean;
  totalWeight: number;
  children: BalancedDisc[];
}
