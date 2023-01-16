type SequenceElement = {
  value: number;
  originalIndex: number;
};
type Sequence = SequenceElement[];

export const sumDecryptedValues = (input: string): number => {
  const sequence = parseSequence(input);
  const decryptedSequence = decryptSequence(sequence);
  const zeroIndex = decryptedSequence.findIndex(({ value }) => value === 0);
  const values = [1000, 2000, 3000].map(
    (offset) => decryptedSequence[(zeroIndex + offset) % decryptedSequence.length].value,
  );
  const sumValues = values.reduce((sum, value) => sum + value);

  return sumValues;
};

const parseSequence = (input: string) => {
  return input.split(/\r?\n/).map((valueString, originalIndex) => {
    return {
      value: Number(valueString),
      originalIndex,
    };
  });
};

const decryptSequence = (sequence: Sequence) => {
  const decryptedSequence = [...sequence];

  for (let index = 0; index < sequence.length; index++) {
    const currentIndex = decryptedSequence.findIndex((element) => element.originalIndex === index);
    const [element] = decryptedSequence.splice(currentIndex, 1);
    const newIndex = (currentIndex + element.value + sequence.length - 1) % (sequence.length - 1);
    decryptedSequence.splice(newIndex, 0, element);
  }

  return decryptedSequence;
};
