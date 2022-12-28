type Position = [number, number];
type Cave = Tile[][];
type Boundaries = { minX: number; maxX: number; maxY: number };

enum Tile {
  Empty = ".",
  Sand = "o",
  Rock = "#",
}

export const countSandUnits = (input: string): number => {
  const [cave, boundaries, offsetX] = buildCave(input);
  let sandUnitsCount = 0;

  while (true) {
    const [[x, y], abyssReached] = dropSandUnit(cave, 0, 500 - offsetX, boundaries);

    if (abyssReached) break;

    cave[y][x] = Tile.Sand;
    sandUnitsCount++;
  }

  return sandUnitsCount;
};

function dropSandUnit(cave: Cave, y: number, x: number, boundaries: Boundaries): [Position, boolean] {
  if (cave[y + 1]?.[x] === Tile.Empty) {
    return dropSandUnit(cave, y + 1, x, boundaries);
  } else if (cave[y + 1]?.[x - 1] === Tile.Empty) {
    return dropSandUnit(cave, y + 1, x - 1, boundaries);
  } else if (cave[y + 1]?.[x + 1] === Tile.Empty) {
    return dropSandUnit(cave, y + 1, x + 1, boundaries);
  }

  const abyssReached = x <= boundaries.minX || x >= boundaries.maxX || y >= boundaries.maxY;

  return [[x, y], abyssReached];
}

const buildCave = (input: string): [Tile[][], Boundaries, number] => {
  const lines = input
    .split(/\r?\n/)
    .map((line) => line.split(" -> ").map((position) => position.split(",").map(Number)));
  const offsetX = Math.min(...lines.flatMap((line) => line.map(([x]) => x)));
  const boundaries = {
    minX: 0,
    maxX: Math.max(...lines.flatMap((line) => line.map(([x]) => x))) - offsetX,
    maxY: Math.max(...lines.flatMap((line) => line.map(([, y]) => y))),
  };
  const cave = new Array(boundaries.maxY + 1)
    .fill(Tile.Empty)
    .map(() => new Array(boundaries.maxX + 1).fill(Tile.Empty));

  lines.forEach((wall) => {
    for (let i = 0; i < wall.length - 1; i++) {
      const [start, end] = [wall[i], wall[i + 1]].sort((a, b) => a[0] - b[0]).sort((a, b) => a[1] - b[1]);

      if (start[0] === end[0]) {
        const x = start[0] - offsetX;

        for (let y = start[1]; y <= end[1]; y++) {
          cave[y][x] = Tile.Rock;
        }
      }

      if (start[1] === end[1]) {
        const y = start[1];

        for (let x = start[0] - offsetX; x <= end[0] - offsetX; x++) {
          cave[y][x] = Tile.Rock;
        }
      }
    }
  });

  return [cave, boundaries, offsetX];
};
