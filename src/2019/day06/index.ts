interface SpaceObject {
  name: string;
  orbitedBy?: string[];
  orbits?: string;
}

function parseInput(input: string) {
  const orbits: Record<string, SpaceObject> = {};

  input.split('\n').forEach((orbit) => {
    const [center, satellite] = orbit.split(')');

    orbits[center] = {
      ...(orbits[center] ?? {}),
      name: center,
      orbitedBy: [...(orbits[center]?.orbitedBy ?? []), satellite],
    };

    orbits[satellite] = {
      ...(orbits[satellite] ?? {}),
      name: satellite,
      orbits: center,
    };
  });

  return orbits;
}

function getOrbitCount(
  name: string,
  orbits: Record<string, SpaceObject>,
  indirectOrbitsOfParent = 0,
): number {
  const satellite = orbits[name];
  const indirectOrbits = indirectOrbitsOfParent + (satellite.orbits ? 1 : 0);

  if (satellite.orbitedBy) {
    return satellite.orbitedBy.reduce(
      (sum, childSatellite) => sum + getOrbitCount(childSatellite, orbits, indirectOrbits),
      indirectOrbits,
    );
  }

  return indirectOrbits;
}

export function part1(input: string): number {
  const orbits = parseInput(input);

  return getOrbitCount('COM', orbits); // 358244
}

function getOrbitChain(name: string, orbits: Record<string, SpaceObject>): string[] {
  const satellite = orbits[name];

  if (satellite.orbits) {
    return [...getOrbitChain(satellite.orbits, orbits), satellite.orbits];
  }

  return [];
}

export function part2(input: string): number {
  const orbits = parseInput(input);

  const yourOrbitChain = getOrbitChain('YOU', orbits);
  const santasOrbitChain = getOrbitChain('SAN', orbits);

  let split = 0;

  while (yourOrbitChain[split] === santasOrbitChain[split]) {
    split += 1;
  }

  // No need to backtrack one step since the last object in each chains are the ones orbited currently,
  // so they are not included in the transfer count.

  return yourOrbitChain.length + santasOrbitChain.length - 2 * split; // 517
}
