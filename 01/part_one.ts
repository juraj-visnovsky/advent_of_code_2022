export const maxCalories = (input: string): number => {
  const elfInputs = splitByElfs(input);

  const caloriesPerElf = elfInputs.reduce((accumulator: number[], elfData) => {
    accumulator.push(countCalories(elfData));

    return accumulator;
  }, []);

  return Math.max(...caloriesPerElf);
};

const splitByElfs = (input: string): string[] => {
  return input.split(/\r?\n\r?\n/);
};

const countCalories = (input: string): number => {
  const caloriesCount = input
    .split(/\r?\n/)
    .map((calories) => Number(calories))
    .reduce((sum, calories) => sum + calories, 0);

  return caloriesCount;
};
