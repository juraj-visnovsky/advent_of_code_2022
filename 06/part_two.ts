export const findStartOfMessageMarker = (input: string): number => {
  const inputArray = input.split("");

  for (let i = 0; i < inputArray.length - 13; i++) {
    const markerPosition = i + 14;
    const uniqueCharactersCount = new Set(inputArray.slice(i, markerPosition)).size;

    if (uniqueCharactersCount === 14) return markerPosition;
  }

  return -1;
};
