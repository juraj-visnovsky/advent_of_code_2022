export const countExposedSides = (input: string): number => {
  let exposedSidesCount = 0;
  const droplet = buildDroplet(input);
  const directions = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  const { minX, maxX, minY, maxY, minZ, maxZ } = calculateBoundaries(droplet);
  const queue = [{ x: minX, y: minY, z: minZ }];
  const visited = new Set(`${minX},${minY},${minZ}`);

  while (queue.length > 0) {
    const { x, y, z } = queue.shift()!;
    const coordinatesString = `${x},${y},${z}`;

    visited.add(coordinatesString);

    directions.forEach(([xDiff, yDiff, zDiff]) => {
      const nextCoordinates = {
        x: x + xDiff,
        y: y + yDiff,
        z: z + zDiff,
      };
      const nextCoordinatesString = `${nextCoordinates.x},${nextCoordinates.y},${nextCoordinates.z}`;

      if (visited.has(nextCoordinatesString)) {
        return;
      }

      if (
        nextCoordinates.x < minX ||
        nextCoordinates.x > maxX ||
        nextCoordinates.y < minY ||
        nextCoordinates.y > maxY ||
        nextCoordinates.z < minZ ||
        nextCoordinates.z > maxZ
      ) {
        return;
      }

      if (droplet.has(nextCoordinatesString)) {
        exposedSidesCount++;
        return;
      }

      queue.push(nextCoordinates);
      visited.add(nextCoordinatesString);
    });
  }

  return exposedSidesCount;
};

const buildDroplet = (input: string) => {
  return input.split(/\r?\n/).reduce((map, coordinates) => {
    map.add(coordinates);

    return map;
  }, new Set<string>());
};

const calculateBoundaries = (droplet: Set<string>) => {
  const dropletCoordinates = Array.from(droplet).map((coordinates) => coordinates.split(",").map(Number));

  return {
    minX: Math.min(...dropletCoordinates.map((coordinates) => coordinates[0])) - 1,
    maxX: Math.max(...dropletCoordinates.map((coordinates) => coordinates[0])) + 1,
    minY: Math.min(...dropletCoordinates.map((coordinates) => coordinates[1])) - 1,
    maxY: Math.max(...dropletCoordinates.map((coordinates) => coordinates[1])) + 1,
    minZ: Math.min(...dropletCoordinates.map((coordinates) => coordinates[2])) - 1,
    maxZ: Math.max(...dropletCoordinates.map((coordinates) => coordinates[2])) + 1,
  };
};
