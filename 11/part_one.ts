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
      monkey.inspectItems(this.throwItem.bind(this));
    });
  }

  calculateMonkeyBusiness() {
    const monkeyBusiness = this.monkeys.map((monkey) => monkey.insectedItemsCount);
    const sortedMonkeyBusiness = monkeyBusiness.sort((a, b) => b - a);

    return sortedMonkeyBusiness[0] * sortedMonkeyBusiness[1];
  }

  private throwItem(targetMonkeyId: number, item: number) {
    this.monkeys[targetMonkeyId].catchItem(item);
  }
}

class Monkey {
  insectedItemsCount = 0;
  private items;
  private operation;
  private test;

  constructor(startingItems: number[], operation: Operation, test: Test) {
    this.items = startingItems;
    this.operation = operation;
    this.test = test;
  }

  inspectItems(throwItem: (targetMonkeyId: number, item: number) => void) {
    this.items.forEach((item) => {
      let itemWorryLevel = this.operation(item);
      itemWorryLevel = Math.floor(itemWorryLevel / 3);
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
    const test = (item: number) => {
      const divisor = Number(testRaw.replace("Test: divisible by ", ""));
      const trueTargetMonkey = Number(trueTargetMonkeyRaw.replace("If true: throw to monkey ", ""));
      const falseTargetMonkey = Number(falseTargetMonkeyRaw.replace("If false: throw to monkey ", ""));
      const targetMonkey = item % divisor === 0 ? trueTargetMonkey : falseTargetMonkey;

      return targetMonkey;
    };
    const monkey = new Monkey(startingItems, operation, test);

    troop.addMonkey(monkey);
  });

  for (let i = 0; i < 20; i++) {
    troop.performRound();
  }

  return troop.calculateMonkeyBusiness();
};
