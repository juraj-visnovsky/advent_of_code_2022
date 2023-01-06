enum Tile {
  Empty = ".",
  Rock = "#",
}

enum WindDirection {
  Left = "<",
  Right = ">",
}

type RockShape = { x: number; y: number }[];

class Cave {
  private layers: Tile[][];
  private fallingRock: RockShape | null;
  private width = 7;
  height = 0;
  private newRockXOffset = 2;
  private newRockYOffset = 3;
  private rocksCount = 0;
  private heightRocksCountMap: Record<number, number> = {};

  constructor() {
    this.layers = [];
    this.fallingRock = null;
  }

  print() {
    console.log(this.layers.map((layer) => layer.join("")).join("\n"));
  }

  detectCycle(rockShapeGenerator: Generator<RockShape>, windDirectionGenerator: Generator<WindDirection>) {
    const requiredRepetitions = 10;
    let cycleFound = false;
    let rocksInCycle = 0;
    let cycleHeight = 0;
    let rocksBeforeCycle = 0;
    let heightBeforeCycle = 0;

    while (!cycleFound) {
      const rockShape = rockShapeGenerator.next().value!;

      this.dropNewRock(rockShape, windDirectionGenerator);

      const indexes = this.findLayersMatchingCurrentLayer();

      if (indexes.length < requiredRepetitions) {
        continue;
      }

      const endIndexes = indexes.slice(-requiredRepetitions);
      const indexPairs = this.createIndexPairs(endIndexes);
      const cycleLengths = indexPairs.map(([firstIndex, secondIndex]) => secondIndex - firstIndex);

      if (!cycleLengths.every((cycleLength, _, arr) => cycleLength === arr[0])) {
        continue;
      }

      const cycleLength = cycleLengths[0];

      if (endIndexes[0] - cycleLength < 0 || cycleLength === 1) {
        continue;
      }

      const cycles = endIndexes.map((_, index) =>
        this.layers.slice(endIndexes[0] - cycleLength + index * cycleLength, cycleLength),
      );

      if (cycles.every((cycle) => cycle.every((layer, y) => layer.every((tile, x) => tile === cycles[0][y][x])))) {
        cycleFound = true;
        rocksInCycle = this.heightRocksCountMap[endIndexes[1] - 1] - this.heightRocksCountMap[endIndexes[0] - 1];
        rocksBeforeCycle = this.heightRocksCountMap[endIndexes[0] - 1] - rocksInCycle;
        cycleHeight = cycleLength;
        heightBeforeCycle = endIndexes[0] - 1;
      }
    }

    return { rocksInCycle, cycleHeight, rocksBeforeCycle, heightBeforeCycle };
  }

  dropNewRock(rockShape: RockShape, windDirectionGenerator: Generator<WindDirection>) {
    this.fallingRock = rockShape.map(({ x, y }) => ({
      x: x + this.newRockXOffset,
      y: y + this.height + this.newRockYOffset,
    }));

    while (this.fallingRock) {
      const windDirection = windDirectionGenerator.next().value;

      if (windDirection === WindDirection.Left) {
        this.tryMovingRockLeft();
      } else {
        this.tryMovingRockRight();
      }

      this.tryMovingRockDown();
    }
  }

  private findLayersMatchingCurrentLayer() {
    const currentLayer = this.layers[this.layers.length - 1];

    return this.layers.reduce((indexes: number[], layer, y) => {
      if (layer.every((tile, x) => tile === currentLayer[x])) {
        indexes.push(y);
      }

      return indexes;
    }, []);
  }

  private createIndexPairs(indexes: number[]) {
    return indexes.reduce((indexPairs: number[][], _, index, arr) => {
      if (index < arr.length - 1) {
        indexPairs.push(arr.slice(index, index + 2));
      }

      return indexPairs;
    }, []);
  }

  private tryMovingRockLeft() {
    if (this.fallingRock === null) return;

    const newRockCoordinates = this.fallingRock.map(({ x, y }) => ({ x: x - 1, y }));

    if (newRockCoordinates.every(({ x, y }) => x >= 0 && this.isPositionEmpty(x, y))) {
      this.fallingRock = newRockCoordinates;
    }
  }

  private tryMovingRockRight() {
    if (this.fallingRock === null) return;

    const newRockCoordinates = this.fallingRock.map(({ x, y }) => ({ x: x + 1, y }));

    if (newRockCoordinates.every(({ x, y }) => x < this.width && this.isPositionEmpty(x, y))) {
      this.fallingRock = newRockCoordinates;
    }
  }

  private tryMovingRockDown() {
    if (this.fallingRock === null) return;

    const newRockCoordinates = this.fallingRock.map(({ x, y }) => ({ x, y: y - 1 }));

    if (newRockCoordinates.every(({ x, y }) => y >= 0 && this.isPositionEmpty(x, y))) {
      this.fallingRock = newRockCoordinates;
    } else {
      this.restRock();
    }
  }

  private restRock() {
    if (this.fallingRock === null) return;

    const sortedCoordinates = this.fallingRock.sort((a, b) => a.y - b.y);

    this.rocksCount++;

    sortedCoordinates.forEach(({ x, y }) => {
      if (this.layers[y] === undefined) {
        this.addEmptyLayer();
        this.heightRocksCountMap[this.height] = this.rocksCount;
      }

      this.layers[y][x] = Tile.Rock;
    });

    this.fallingRock = null;
  }

  private addEmptyLayer() {
    this.layers[this.height] = Array(this.width).fill(Tile.Empty);
    this.height++;
  }

  private isPositionEmpty(x: number, y: number) {
    return this.layers[y] === undefined || this.layers[y][x] === Tile.Empty;
  }
}

export const calculateCaveHeight = (input: string): number => {
  const cave = new Cave();
  const rockShapeGenerator = createRockShapeGenerator();
  const windDirectionGenerator = createWindDirectionGenerator(input);
  const { rocksInCycle, cycleHeight, rocksBeforeCycle, heightBeforeCycle } = cave.detectCycle(
    rockShapeGenerator,
    windDirectionGenerator,
  );
  const totalNumberOfRocks = 1_000_000_000_000;
  const cycles = Math.floor((totalNumberOfRocks - rocksBeforeCycle) / rocksInCycle);
  const rocksLeft = totalNumberOfRocks - rocksBeforeCycle - rocksInCycle * cycles;
  const heightAfterCycles = calculateCaveHeightAfterCycles(
    rocksBeforeCycle + rocksInCycle + rocksLeft,
    input,
    heightBeforeCycle + cycleHeight,
  );

  return heightBeforeCycle + cycles * cycleHeight + heightAfterCycles;
};

const calculateCaveHeightAfterCycles = (numberOfRocks: number, input: string, heightAfterFirstCycle: number) => {
  const cave = new Cave();
  const rockShapeGenerator = createRockShapeGenerator();
  const windDirectionGenerator = createWindDirectionGenerator(input);

  for (let i = 0; i < numberOfRocks; i++) {
    const rockShape = rockShapeGenerator.next().value!;

    cave.dropNewRock(rockShape, windDirectionGenerator);
  }

  return cave.height - heightAfterFirstCycle;
};

function* createRockShapeGenerator() {
  const rockShapes = [
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ],
    [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ],
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ],
  ];

  while (true) {
    const rockShape = rockShapes.shift()!;

    yield rockShape;

    rockShapes.push(rockShape);
  }
}

function* createWindDirectionGenerator(input: string) {
  const windDirections = input.split("");

  while (true) {
    const windDirection = windDirections.shift()!;

    yield windDirection as WindDirection;

    windDirections.push(windDirection);
  }
}
