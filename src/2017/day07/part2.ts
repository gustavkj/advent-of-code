import { BalancedDisc } from './types';

function balanceDisc(disc: BalancedDisc) {
  if (disc.children.length !== 0 && !disc.isBalanced) {
    const childWeights = disc.children.map(balanceDisc);

    // eslint-disable-next-line no-param-reassign
    disc.isBalanced = !!childWeights.reduce((a, b) => (a === b ? a : NaN));

    // eslint-disable-next-line no-param-reassign
    disc.totalWeight = disc.weight + childWeights.reduce((total, weight) => total + weight);

    if (!disc.isBalanced) {
      const weights: Record<number, number> = {};
      for (const childWeight of childWeights) {
        if (typeof weights[childWeight] === 'undefined') {
          weights[childWeight] = 1;
        } else {
          weights[childWeight] += 1;
        }
      }

      let faultyWeight: number;
      let rightWeight: number;

      if (weights[childWeights[0]] === 1) {
        [faultyWeight, rightWeight] = childWeights;
      } else {
        [rightWeight, faultyWeight] = childWeights;
      }
      const faultyChild = disc.children.find((child) => child.totalWeight === faultyWeight);

      if (!faultyChild) {
        throw new Error('Failed to find `faultyChild`');
      }

      console.log(faultyChild.key); // ptshtrn
      console.log(faultyChild.weight + rightWeight - faultyWeight); // 521

      faultyChild.weight += rightWeight - faultyWeight;
      faultyChild.totalWeight += rightWeight - faultyWeight;

      // eslint-disable-next-line no-param-reassign
      disc.totalWeight += rightWeight - faultyWeight;

      // eslint-disable-next-line no-param-reassign
      disc.isBalanced = true;
    }

    return disc.totalWeight;
  }

  // eslint-disable-next-line no-param-reassign
  disc.isBalanced = true;

  // eslint-disable-next-line no-param-reassign
  disc.totalWeight = disc.weight;
  return disc.weight;
}

export function part2(data: string): number {
  const rows = data.split('\n');

  const discs = rows.map((row): BalancedDisc => {
    const matches = /([a-z]*)\s\(([0-9]*)\)(?:\s->\s((?:[a-z]*(?:,\s)?)*))?/.exec(row);

    if (!matches) {
      throw new Error(`Faulty row ${row}`);
    }

    return {
      key: matches[1],
      weight: Number(matches[2]),
      children: [],
      childKeys: typeof matches[3] !== 'undefined' ? matches[3].split(', ') : [],
      hasParent: false,
      isBalanced: false,
      totalWeight: 0,
    };
  });

  discs.forEach((disc, i, arr) => {
    if (disc.childKeys.length !== 0) {
      // eslint-disable-next-line no-param-reassign
      disc.children = disc.childKeys.map((childKey) => {
        const childIndex = arr.findIndex((element) => element.key === childKey);

        // eslint-disable-next-line no-param-reassign
        arr[childIndex].hasParent = true;

        return arr[childIndex];
      });
    }
  });

  const root = discs.find((element) => !element.hasParent);

  if (!root) {
    throw new Error('Failed to find root');
  }

  return balanceDisc(root);
}
