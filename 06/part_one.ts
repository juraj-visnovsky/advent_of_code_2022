export const findStartOfPacketMarker = (input: string): number => {
  const inputArray = input.split("");

  for (let i = 0; i < inputArray.length - 3; i++) {
    const markerPosition = i + 4;
    const uniqueCharactersCount = new Set(inputArray.slice(i, markerPosition)).size;

    if (uniqueCharactersCount === 4) return markerPosition;
  }

  return -1;
};
