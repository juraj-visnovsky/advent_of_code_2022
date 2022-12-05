type Stacks = {
  [key: string]: string[];
};

export const findCratesOnTopOfStacks = (input: string): string => {
  const [initialState, instructions] = input.split(/\r?\n\r?\n/);
  const stacks = initializeStacks(initialState);

  instructions.split(/\r?\n/).forEach((instruction) => {
    const [numberOfCrates, souceStackId, targetStackId] = instruction.match(/\d+/g) || [];

    if (numberOfCrates && souceStackId && targetStackId) {
      const cratesToMove = stacks[souceStackId].splice(-Number(numberOfCrates));

      stacks[targetStackId].push(...cratesToMove);
    }
  });

  const topCrates = Object.values(stacks)
    .map((stack) => stack.pop())
    .join("");

  return topCrates;
};

const initializeStacks = (initialState: string): Stacks => {
  const initialStateMatrix = initialState
    .split(/\r?\n/)
    .map((row) => row.split(""))
    .reverse();
  const transposedMatrix = initialStateMatrix[0].map((col, i) => initialStateMatrix.map((row) => row[i]));

  const stacks = transposedMatrix.reduce((stacks, row) => {
    const [index, ...cratesWithEmptyValues] = row;

    if (index !== " ") {
      const crates = cratesWithEmptyValues.filter((crate) => crate !== " ");

      stacks[index] = crates;
    }

    return stacks;
  }, {} as Stacks);

  return stacks;
};
