type SensorWithBeacon = {
  sensorX: number;
  sensorY: number;
  beaconX: number;
  beaconY: number;
  manhattanDistance: number;
};

export const getTuningFrequency = (input: string, boundaryMin: number, boundaryMax: number): number => {
  const sensorsWithBeacons = parseSensorsWithBeacons(input);
  const queue = [...sensorsWithBeacons];

  while (queue.length > 0) {
    const { sensorX, sensorY, manhattanDistance } = queue.pop()!;
    const distance = manhattanDistance + 1;

    for (let diff = 0; diff <= distance; diff++) {
      const possiblePositions = [
        [sensorX + diff, sensorY + (distance - diff)],
        [sensorX - diff, sensorY - (distance - diff)],
        [sensorX + diff, sensorY - (distance - diff)],
        [sensorX - diff, sensorY + (distance - diff)],
      ];
      const distressSignalPosition = possiblePositions.find(
        ([x, y]) => isWithinBoundaries(x, y, boundaryMin, boundaryMax) && !isInRangeOfASensor(sensorsWithBeacons, x, y),
      );

      if (distressSignalPosition) {
        return distressSignalPosition[0] * 4_000_000 + distressSignalPosition[1];
      }
    }
  }

  return -1;
};

const parseSensorsWithBeacons = (input: string) => {
  const lines = input.split(/\r?\n/);
  const sensorsWithBeacons = lines.map((line) => {
    const [sensorX, sensorY, beaconX, beaconY] = line.match(/-?\d+/g)?.map(Number)!;
    const manhattanDistance = calculateManhattanDistance(sensorX, sensorY, beaconX, beaconY);

    return { sensorX, sensorY, beaconX, beaconY, manhattanDistance };
  });

  return sensorsWithBeacons;
};

const calculateManhattanDistance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const isInRangeOfASensor = (sensorsWithBeacons: SensorWithBeacon[], x: number, y: number) => {
  return sensorsWithBeacons.some(({ sensorX, sensorY, manhattanDistance }) => {
    return manhattanDistance >= calculateManhattanDistance(sensorX, sensorY, x, y);
  });
};

const isWithinBoundaries = (x: number, y: number, boundaryMin: number, boundaryMax: number) => {
  return x >= boundaryMin && x <= boundaryMax && y >= boundaryMin && y <= boundaryMax;
};
