const choicePoints = {
  X: { A: 3, B: 0, C: 6, choicePoints: 1 },
  Y: { A: 6, B: 3, C: 0, choicePoints: 2 },
  Z: { A: 0, B: 6, C: 3, choicePoints: 3 },
};

type OpponentChoices = "A" | "B" | "C";
type MyChoices = keyof typeof choicePoints;

export const countTotalScore = (input: string): number => {
  let totalScore = 0;
  const rounds = input.split(/\r?\n/);

  rounds.forEach((round) => {
    const [opponentsChoice, myChoice] = getRoundChoices(round);

    totalScore += calculateChoicePoints(myChoice);
    totalScore += calculateOutcomePoints(opponentsChoice, myChoice);
  });

  return totalScore;
};

const getRoundChoices = (roundInput: string): [OpponentChoices, MyChoices] => {
  const [opponentsChoice, myChoice] = roundInput.split(" ");

  return [opponentsChoice as OpponentChoices, myChoice as MyChoices];
};

const calculateChoicePoints = (myChoice: MyChoices): number => {
  return choicePoints[myChoice]["choicePoints"];
};

const calculateOutcomePoints = (opponentsChoice: OpponentChoices, myChoice: MyChoices): number => {
  return choicePoints[myChoice][opponentsChoice];
};
