export const countVisibleTrees = (input: string): number => {
  const grid = buildGrid(input);
  const transposedGrid = grid[0].map((col, i) => grid.map((row) => row[i]));
  let visibleTrees = 0;

  grid.forEach((row, y) => {
    row.forEach((value, x) => {
      const column = transposedGrid[x];
      const directions = [row.slice(0, x), row.slice(x + 1), column.slice(0, y), column.slice(y + 1)];

      const isVisible = directions.some((direction) => value > Math.max(...direction));
      if (isVisible) visibleTrees += 1;
    });
  });

  return visibleTrees;
};

const buildGrid = (input: string) => {
  const rows = input.split(/\r?\n/);
  const grid = rows.map((row) => row.split("").map((value) => Number(value)));

  return grid;
};
