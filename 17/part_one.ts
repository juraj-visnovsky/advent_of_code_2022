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

  constructor() {
    this.layers = [];
    this.fallingRock = null;
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

    sortedCoordinates.forEach(({ x, y }) => {
      if (this.layers[y] === undefined) {
        this.addEmptyLayer();
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

  for (let i = 0; i < 2022; i++) {
    const rockShape = rockShapeGenerator.next().value!;

    cave.dropNewRock(rockShape, windDirectionGenerator);
  }

  return cave.height;
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
