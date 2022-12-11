type Operation = (item: number) => number;
type Test = (item: number) => number;

class TroopOfMonkeys {
  private monkeys: Monkey[];

  constructor() {
    this.monkeys = [];
  }

  addMonkey(monkey: Monkey) {
    this.monkeys.push(monkey);
  }

  performRound() {
    this.monkeys.forEach((monkey) => {
      monkey.inspectItems(this.throwItem.bind(this), this.commonDivisor);
    });
  }

  calculateMonkeyBusiness() {
    const monkeyBusiness = this.monkeys.map((monkey) => monkey.insectedItemsCount);
    const sortedMonkeyBusiness = monkeyBusiness.sort((a, b) => b - a);

    return sortedMonkeyBusiness[0] * sortedMonkeyBusiness[1];
  }

  get commonDivisor() {
    return this.monkeys.reduce((sum, monkey) => sum * monkey.divisor, 1);
  }

  private throwItem(targetMonkeyId: number, item: number) {
    this.monkeys[targetMonkeyId].catchItem(item);
  }
}

class Monkey {
  insectedItemsCount = 0;
  divisor;
  private items;
  private operation;
  private test;

  constructor(startingItems: number[], operation: Operation, test: Test, divisor: number) {
    this.items = startingItems;
    this.operation = operation;
    this.test = test;
    this.divisor = divisor;
  }

  inspectItems(throwItem: (targetMonkeyId: number, item: number) => void, commonDivisor: number) {
    this.items.forEach((item) => {
      const itemWorryLevel = this.operation(item) % commonDivisor;
      const targetMonkeyId = this.test(itemWorryLevel);

      throwItem(targetMonkeyId, itemWorryLevel);
      this.insectedItemsCount++;
    });

    this.items = [];
  }

  catchItem(item: number) {
    this.items.push(item);
  }
}

export const calculateMonkeyBusiness = (input: string): number => {
  const troop = new TroopOfMonkeys();
  const monkeysData = input.split(/\r?\n\r?\n/);

  monkeysData.forEach((monkeyData) => {
    const [, startingItemsRaw, operationRaw, testRaw, trueTargetMonkeyRaw, falseTargetMonkeyRaw] =
      monkeyData.split(/\r?\n/);
    const startingItems = startingItemsRaw
      .replace("Starting items: ", "")
      .split(", ")
      .map((number) => Number(number));
    const operation = (old: number) => eval(operationRaw.replace("Operation: new = ", ""));
    const divisor = Number(testRaw.replace("Test: divisible by ", ""));
    const test = (item: number) => {
      const trueTargetMonkey = Number(trueTargetMonkeyRaw.replace("If true: throw to monkey ", ""));
      const falseTargetMonkey = Number(falseTargetMonkeyRaw.replace("If false: throw to monkey ", ""));
      const targetMonkey = item % divisor === 0 ? trueTargetMonkey : falseTargetMonkey;

      return targetMonkey;
    };
    const monkey = new Monkey(startingItems, operation, test, divisor);

    troop.addMonkey(monkey);
  });

  for (let i = 0; i < 10_000; i++) {
    troop.performRound();
  }

  return troop.calculateMonkeyBusiness();
};
