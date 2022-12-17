type Grid = Location[][];
type Queue = { location: Location; pathLength: number }[];

class Location {
  x: number;
  y: number;
  value: string;
  height: number;
  isStart: boolean;
  isDestination: boolean;

  constructor(value: string, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.isStart = value === "S";
    this.isDestination = value === "E";
    this.height = this.calculateHeight();
  }

  toString() {
    return `${this.x}:${this.y}`;
  }

  private calculateHeight() {
    let value = this.value;

    if (this.isStart) value = "a";
    if (this.isDestination) value = "z";

    return value.charCodeAt(0) - 96;
  }
}

export const findShortestPath = (input: string): number => {
  let start: Location | null = null;
  const grid = input.split(/\r?\n/).map((row, x) =>
    row.split("").map((value, y) => {
      const location = new Location(value, x, y);
      if (location.isStart) {
        start = location;
      }

      return location;
    }),
  );

  if (start === null) return -1;

  const queue: Queue = [{ location: start, pathLength: 0 }];
  const visitedLocations = new Set<string>();

  while (queue.length) {
    const { location, pathLength } = queue.shift()!;

    if (visitedLocations.has(location.toString())) {
      continue;
    }

    visitedLocations.add(location.toString());

    if (location.isDestination) {
      return pathLength;
    }

    const nextLocations = findNextLocations(grid, location);

    nextLocations.forEach((nextLocation) => queue.push({ location: nextLocation, pathLength: pathLength + 1 }));
  }

  return -1;
};

const findNextLocations = (grid: Grid, currentLocation: Location) => {
  const directions = [
    [currentLocation.x + 1, currentLocation.y],
    [currentLocation.x - 1, currentLocation.y],
    [currentLocation.x, currentLocation.y + 1],
    [currentLocation.x, currentLocation.y - 1],
  ];
  const reachableCoordinates = directions.filter(([nextX, nextY]) =>
    locationIsReachable(currentLocation, grid, nextX, nextY),
  );

  return reachableCoordinates.map(([nextX, nextY]) => grid[nextX][nextY]);
};

const locationIsReachable = (currentLocation: Location, grid: Grid, nextX: number, nextY: number) => {
  const isOnGrid = nextX >= 0 && nextX < grid.length && nextY >= 0 && nextY < grid[nextX].length;
  const isReachable = isOnGrid && currentLocation.height + 1 >= grid[nextX][nextY].height;

  return isOnGrid && isReachable;
};
