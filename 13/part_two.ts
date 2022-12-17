type Packet = Array<number | Packet>;

export const getDecoderKey = (input: string): number => {
  const dividerPackets = [[[2]], [[6]]];
  const packets = [...parsePackets(input), ...dividerPackets];
  const sortedPackets = packets.sort(comparePackets);
  const dividerIndices = dividerPackets.map((dividerPacket) => sortedPackets.indexOf(dividerPacket) + 1);

  return dividerIndices.reduce((key, index) => key * index);
};

const parsePackets = (input: string) => {
  const packets = input
    .split(/\r?\n/)
    .filter((packetData) => packetData.length > 0)
    .map((packetData) => JSON.parse(packetData));

  return packets;
};

const comparePackets = (firstValue: number | Packet, secondValue: number | Packet): number => {
  if (Number.isInteger(firstValue) && Number.isInteger(secondValue)) {
    if (firstValue > secondValue) return 1;
    if (firstValue < secondValue) return -1;

    return 0;
  } else if (Array.isArray(firstValue) && Array.isArray(secondValue)) {
    const maxLength = Math.max(firstValue.length, secondValue.length);

    for (let i = 0; i < maxLength; i++) {
      if (i >= firstValue.length) return -1;
      if (i >= secondValue.length) return 1;

      const comparisonResult = comparePackets(firstValue[i], secondValue[i]);

      if (comparisonResult === 0) continue;

      return comparisonResult;
    }

    return 0;
  } else {
    return comparePackets(
      Array.isArray(firstValue) ? firstValue : [firstValue],
      Array.isArray(secondValue) ? secondValue : [secondValue],
    );
  }
};
