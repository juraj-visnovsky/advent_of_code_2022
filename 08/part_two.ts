export const getHighestScenicScore = (input: string): number => {
  const grid = buildGrid(input);
  const transposedGrid = grid[0].map((col, i) => grid.map((row) => row[i]));
  let highestScenicScore = -Infinity;

  grid.forEach((row, y) => {
    row.forEach((value, x) => {
      const column = transposedGrid[x];
      const directions = [
        row.slice(0, x).reverse(),
        row.slice(x + 1),
        column.slice(0, y).reverse(),
        column.slice(y + 1),
      ];

      const scenicScore = directions
        .map((direction) => direction.findIndex((otherValue) => otherValue >= value) + 1 || direction.length)
        .reduce((score, value) => score * value, 1);

      if (scenicScore > highestScenicScore) highestScenicScore = scenicScore;
    });
  });

  return highestScenicScore;
};

const buildGrid = (input: string) => {
  const rows = input.split(/\r?\n/);
  const grid = rows.map((row) => row.split("").map((value) => Number(value)));

  return grid;
};
