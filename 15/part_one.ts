type CoveredLocations = Set<number>;

export const calculateCoveredLocationsOnRow = (input: string, row: number): number => {
  const coveredLocations: CoveredLocations = new Set<number>();
  const sensorsWithBeacons = parseSensorsWithBeacons(input);

  sensorsWithBeacons.forEach((data) => {
    const { sensorX, sensorY, beaconX, beaconY } = data;
    const manhattanDistance = calculateManhattanDistance(sensorX, sensorY, beaconX, beaconY);

    for (let yDistance = 0; yDistance <= manhattanDistance; yDistance++) {
      const xDistance = manhattanDistance - yDistance;

      if (sensorY - yDistance === row) {
        markLocationsOnRow(coveredLocations, sensorY - yDistance, sensorX - xDistance, sensorX + xDistance);
      }

      if (sensorY + yDistance === row) {
        markLocationsOnRow(coveredLocations, sensorY + yDistance, sensorX - xDistance, sensorX + xDistance);
      }
    }
  });

  sensorsWithBeacons.forEach((data) => {
    const { beaconX, beaconY } = data;

    if (beaconY === row) {
      coveredLocations.delete(beaconX);
    }
  });

  return coveredLocations.size;
};

const parseSensorsWithBeacons = (input: string) => {
  const lines = input.split(/\r?\n/);
  const sensorsWithBeacons = lines.map((line) => {
    const [sensorX, sensorY, beaconX, beaconY] = line.match(/-?\d+/g)?.map(Number)!;

    return { sensorX, sensorY, beaconX, beaconY };
  });

  return sensorsWithBeacons;
};

const calculateManhattanDistance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const markLocationsOnRow = (coveredLocations: CoveredLocations, y: number, fromX: number, toX: number) => {
  for (let x = fromX; x <= toX; x++) {
    coveredLocations.add(x);
  }
};
