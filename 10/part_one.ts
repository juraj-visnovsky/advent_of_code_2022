export const sumSignalStrengths = (input: string) => {
  const instructions = parseInstructions(input);
  let signalStrengthsSum = 0;
  let register = 1;
  let cycle = 0;

  instructions.forEach(([instruction, value]) => {
    if (instruction === "noop") {
      [cycle, signalStrengthsSum] = nextCycle(cycle, register, signalStrengthsSum);
    }

    if (instruction === "addx") {
      [cycle, signalStrengthsSum] = nextCycle(cycle, register, signalStrengthsSum);
      [cycle, signalStrengthsSum] = nextCycle(cycle, register, signalStrengthsSum);
      register += value;
    }
  });

  return signalStrengthsSum;
};

const parseInstructions = (input: string): [string, number][] => {
  return input.split(/\r?\n/).map((instructionLine) => {
    const [instruction, value] = instructionLine.split(" ");

    return [instruction, Number(value)] as [string, number];
  });
};

const nextCycle = (cycle: number, register: number, signalStrengthsSum: number) => {
  const nextCycle = cycle + 1;
  signalStrengthsSum += calculateCurrentCycleSignalStrength(nextCycle, register);

  return [nextCycle, signalStrengthsSum];
};

const calculateCurrentCycleSignalStrength = (cycle: number, register: number) => {
  let signalStrength = 0;

  if ((cycle - 20) % 40 === 0) {
    signalStrength += register * cycle;
  }

  return signalStrength;
};
