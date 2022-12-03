export const sumPrioritiesOfMisplacedItems = (input: string): number => {
  let sumPriorities = 0;
  const rucksackInputs = input.split(/\r?\n/);

  rucksackInputs.forEach((rucksackInput) => {
    const [firstCompartment, secondCompartment] = splitItemsIntoCompartments(rucksackInput);
    const commonItem = findCommonItem([...firstCompartment], [...secondCompartment]);
    const priority = getCharacterPriority(commonItem);

    sumPriorities += priority;
  });

  return sumPriorities;
};

const splitItemsIntoCompartments = (input: string): [string, string] => {
  const middleIndex = Math.ceil(input.length / 2);
  const firstCompartment = input.slice(0, middleIndex);
  const secondCompartment = input.slice(middleIndex);

  return [firstCompartment, secondCompartment];
};

const findCommonItem = (
  firstCompartmentCharacters: string[],
  secondCompartmentCharacters: string[],
): string | undefined => {
  const candidates: Record<string, boolean> = firstCompartmentCharacters.reduce((object, character) => {
    return { ...object, [character]: true };
  }, {});
  const commonItem = secondCompartmentCharacters.find((character) => candidates[character] === true);

  return commonItem;
};

const getCharacterPriority = (character: string | undefined): number => {
  if (character === undefined) return 0;

  if (character.toLocaleLowerCase() === character) {
    return character.charCodeAt(0) - 96;
  } else {
    return character.charCodeAt(0) - 38;
  }
};
