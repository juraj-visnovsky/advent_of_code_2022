class Monkey {
  id: string | undefined;
  value: number | undefined;
  operator: string | undefined;
  private firstId: string | undefined;
  private secondId: string | undefined;

  constructor(input: string) {
    const match = input.match(
      /(?<id>[a-z]{4}): ((?<value>\d+)|(?<firstId>[a-z]{4})\s(?<operator>[+-/\*])\s(?<secondId>[a-z]{4}))/,
    );

    if (match) {
      const { id, value, firstId, operator, secondId } = match.groups!;

      this.id = id;
      this.value = Number(value);
      this.firstId = firstId;
      this.operator = operator;
      this.secondId = secondId;
    }
  }

  yell(monkeys: Monkeys): number {
    if (this.value) {
      return this.value;
    }

    if (this.operator && this.firstId && this.firstId in monkeys && this.secondId && this.secondId in monkeys) {
      const firstValue = this.leftValue(monkeys);
      const secondValue = this.rightValue(monkeys);

      if (this.id === "root") {
        return firstValue - secondValue;
      }

      return eval(`${firstValue} ${this.operator} ${secondValue}`);
    }

    return NaN;
  }

  leftValue(monkeys: Monkeys) {
    return monkeys[this.firstId!].yell(monkeys);
  }

  rightValue(monkeys: Monkeys) {
    return monkeys[this.secondId!].yell(monkeys);
  }
}

type Monkeys = Record<string, Monkey>;

export const solution = (input: string): number => {
  const monkeys = parseMonkeys(input);
  const inverted = detectInverted(monkeys);
  const root = monkeys["root"];
  const human = monkeys["humn"];

  let min = 0;
  let max = Number.MAX_SAFE_INTEGER;

  while (true) {
    const mid = Math.floor((max + min) / 2);
    human.value = mid;

    const leftValue = root.leftValue(monkeys);
    const rightValue = root.rightValue(monkeys);

    if (leftValue === rightValue) {
      break;
    }

    if (leftValue > rightValue) {
      if (inverted) {
        max = mid;
      } else {
        min = mid;
      }
    } else {
      if (inverted) {
        min = mid;
      } else {
        max = mid;
      }
    }
  }

  return human.value;
};

const detectInverted = (monkeys: Monkeys) => {
  const root = monkeys["root"];
  const human = monkeys["humn"];

  const values = [1, 10].map((value) => {
    human.value = value;

    return { left: root.leftValue(monkeys), right: root.rightValue(monkeys) };
  });
  const humanOnLeftSide = values.every(({ right }) => right === values[0].right);

  if (humanOnLeftSide) {
    return values[1].left > values[0].left;
  } else {
    return values[1].right > values[0].right;
  }
};

const parseMonkeys = (input: string): Monkeys => {
  return input.split(/\r?\n/).reduce((monkeys, line) => {
    const monkey = new Monkey(line);

    return { ...monkeys, [monkey.id as string]: monkey };
  }, {});
};
