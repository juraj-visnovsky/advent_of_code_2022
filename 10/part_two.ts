export const produceImage = (input: string) => {
  const instructions = parseInstructions(input);
  let crt = "";
  let register = 1;
  let cycle = 0;

  instructions.forEach(([instruction, value]) => {
    if (instruction === "noop") {
      [cycle, crt] = nextCycle(cycle, register, crt);
    }

    if (instruction === "addx") {
      [cycle, crt] = nextCycle(cycle, register, crt);
      [cycle, crt] = nextCycle(cycle, register, crt);
      register += value;
    }
  });

  return crt;
};

const parseInstructions = (input: string): [string, number][] => {
  return input.split(/\r?\n/).map((instructionLine) => {
    const [instruction, value] = instructionLine.split(" ");

    return [instruction, Number(value)] as [string, number];
  });
};

const nextCycle = (cycle: number, register: number, crt: string): [number, string] => {
  const position = cycle % 40;

  if (cycle !== 0 && position === 0) {
    crt += "\n";
  }

  if (Math.abs(register - position) <= 1) {
    crt += "#";
  } else {
    crt += ".";
  }

  return [cycle + 1, crt];
};
