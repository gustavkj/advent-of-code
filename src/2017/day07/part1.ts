import { Disc } from './types';

export function part1(data: string): string {
  const rows = data.split('\n');

  const discs = rows.map((row): Disc => {
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

  return root.key; // dtacyn
}
