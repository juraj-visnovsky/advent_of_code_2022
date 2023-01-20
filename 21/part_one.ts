class Monkey {
  id: string | undefined;
  private value: number | undefined;
  private firstId: string | undefined;
  private operator: string | undefined;
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
      const firstValue = monkeys[this.firstId].yell(monkeys);
      const secondValue = monkeys[this.secondId].yell(monkeys);

      return eval(`${firstValue} ${this.operator} ${secondValue}`);
    }

    return NaN;
  }
}

type Monkeys = Record<string, Monkey>;

export const solution = (input: string): number => {
  const monkeys = parseMonkeys(input);

  return monkeys["root"].yell(monkeys);
};

const parseMonkeys = (input: string): Monkeys => {
  return input.split(/\r?\n/).reduce((monkeys, line) => {
    const monkey = new Monkey(line);

    return { ...monkeys, [monkey.id as string]: monkey };
  }, {});
};
