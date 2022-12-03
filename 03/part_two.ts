import { chunk } from "lodash";

export const sumPrioritiesOfBadges = (input: string): number => {
  let sumPriorities = 0;
  const rucksackInputs = input.split(/\r?\n/);

  chunk(rucksackInputs, 3).forEach(([firstRucksack, secondRucksack, thirdRucksack]: string[]) => {
    const commonItem = findCommonItem([...firstRucksack], [...secondRucksack], [...thirdRucksack]);
    const priority = getCharacterPriority(commonItem);

    sumPriorities += priority;
  });

  return sumPriorities;
};

const findCommonItem = (
  firstRucksackCharacters: string[],
  secondRucksackCharacters: string[],
  thirdRucksackCharacters: string[],
): string | undefined => {
  const firstRucksackCandidates = getCandidates(firstRucksackCharacters);
  const secondRucksackCandidates = getCandidates(secondRucksackCharacters);
  const commonItem = thirdRucksackCharacters.find(
    (character) => firstRucksackCandidates[character] && secondRucksackCandidates[character],
  );

  return commonItem;
};

const getCandidates = (characters: string[]): Record<string, boolean> => {
  return characters.reduce((object, character) => {
    return { ...object, [character]: true };
  }, {});
};

const getCharacterPriority = (character: string | undefined): number => {
  if (character === undefined) return 0;

  if (character.toLocaleLowerCase() === character) {
    return character.charCodeAt(0) - 96;
  } else {
    return character.charCodeAt(0) - 38;
  }
};
