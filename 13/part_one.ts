type Packet = Array<number | Packet>;
type Pair = { index: number; firstPacket: Packet; secondPacket: Packet };

export const sumPairIndexes = (input: string): number => {
  const pairs = parseInput(input);
  const pairsInRightOrder = pairs.filter((pair) => isPairInRightOrder(pair.firstPacket, pair.secondPacket));
  const sumIndexes = pairsInRightOrder.reduce((sum, pair) => sum + pair.index, 0);

  return sumIndexes;
};

const parseInput = (input: string) => {
  const pairs = input.split(/\r?\n\r?\n/).map((pairData, index) => createPair(pairData, index + 1));

  return pairs;
};

const createPair = (pairData: string, index: number): Pair => {
  const packetData = pairData.split(/\r?\n/);
  const firstPacket = JSON.parse(packetData[0]);
  const secondPacket = JSON.parse(packetData[1]);

  return { index, firstPacket, secondPacket };
};

const isPairInRightOrder = (firstValue: number | Packet, secondValue: number | Packet): boolean | undefined => {
  if (Number.isInteger(firstValue) && Number.isInteger(secondValue)) {
    if (firstValue > secondValue) return false;
    if (firstValue < secondValue) return true;

    return;
  } else if (Array.isArray(firstValue) && Array.isArray(secondValue)) {
    const maxLength = Math.max(firstValue.length, secondValue.length);

    for (let i = 0; i < maxLength; i++) {
      if (i >= firstValue.length) return true;
      if (i >= secondValue.length) return false;

      const comparisonResult = isPairInRightOrder(firstValue[i], secondValue[i]);

      if (comparisonResult === undefined) continue;

      return comparisonResult;
    }

    return;
  } else {
    return isPairInRightOrder(
      Array.isArray(firstValue) ? firstValue : [firstValue],
      Array.isArray(secondValue) ? secondValue : [secondValue],
    );
  }
};
