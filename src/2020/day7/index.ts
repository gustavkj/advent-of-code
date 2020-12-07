interface Bag {
  name: string;
  contains?: ContainmentInfo[];
  containedBy?: string[];
}

interface ContainmentInfo {
  name: string;
  count: number;
}

function parseInput(input: string): Record<string, Bag> {
  const bags: Record<string, Bag> = {};

  input.split('\n').forEach((row) => {
    const [mainBagName, containedBags] = row.split(' bags contain ');

    const bag = bags[mainBagName] ?? { name: mainBagName };

    containedBags.split(',').forEach((bagEntry) => {
      const match = /(\d+) (.+) bags?/.exec(bagEntry);

      if (match) {
        const [, count, childBagName] = match;
        bag.contains = [...(bag.contains ?? []), { name: childBagName, count: Number(count) }];

        bags[childBagName] = {
          ...(bags[childBagName] ?? { name: childBagName }),
          containedBy: [...(bags[childBagName]?.containedBy ?? []), mainBagName],
        };
      }
    });

    bags[mainBagName] = bag;
  });

  return bags;
}

function getContainerBagNames(name: string, bags: Record<string, Bag>): string[] {
  const bag = bags[name];

  if (bag.containedBy) {
    return bag.containedBy.reduce(
      (names, bagName) => [...names, ...getContainerBagNames(bagName, bags)],
      [name],
    );
  }

  return [name];
}

export function part1(input: string): number {
  const bags = parseInput(input);

  // Decrease by one to remove 'shiny gold'
  return (
    getContainerBagNames('shiny gold', bags).filter(
      (name, index, array) => array.indexOf(name) === index,
    ).length - 1
  ); // 119
}

function countBagsInside(name: string, bags: Record<string, Bag>): number {
  const bag = bags[name];

  if (bag.contains) {
    return bag.contains.reduce(
      (count, childBag) => count + childBag.count * countBagsInside(childBag.name, bags),
      1,
    );
  }

  return 1;
}

export function part2(input: string): number {
  const bags = parseInput(input);

  // Decrease by one to remove 'shiny gold'
  return countBagsInside('shiny gold', bags) - 1;
}
