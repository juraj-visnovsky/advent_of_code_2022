export const countExposedSides = (input: string): number => {
  const droplet = buildDroplet(input);
  const countExposedSides = Array.from(droplet).reduce((count, coordinates) => {
    const exposedSides = 6 - countNeighbours(coordinates, droplet);

    return count + exposedSides;
  }, 0);

  return countExposedSides;
};

const countNeighbours = (coordinates: string, droplet: Set<string>) => {
  const [x, y, z] = coordinates.split(",").map(Number);
  const directions = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  const neighboursCount = directions.filter(([xDiff, yDiff, zDiff]) =>
    droplet.has(`${x + xDiff},${y + yDiff},${z + zDiff}`),
  ).length;

  return neighboursCount;
};

const buildDroplet = (input: string) => {
  return input.split(/\r?\n/).reduce((map, coordinates) => {
    map.add(coordinates);

    return map;
  }, new Set<string>());
};
