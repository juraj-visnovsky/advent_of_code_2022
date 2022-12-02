const choicePoints = {
  X: { A: 3, B: 1, C: 2, score: 0 },
  Y: { A: 1, B: 2, C: 3, score: 3 },
  Z: { A: 2, B: 3, C: 1, score: 6 },
};

type OpponentChoices = "A" | "B" | "C";
type Outcomes = keyof typeof choicePoints;

export const countTotalScore = (input: string): number => {
  let totalScore = 0;
  const rounds = input.split(/\r?\n/);

  rounds.forEach((round) => {
    const [opponentsChoice, outcome] = parseRound(round);

    totalScore += calculateChoicePoints(outcome, opponentsChoice);
    totalScore += calculateOutcomePoints(outcome);
  });

  return totalScore;
};

const parseRound = (roundInput: string): [OpponentChoices, Outcomes] => {
  const [opponentsChoice, outcome] = roundInput.split(" ");

  return [opponentsChoice as OpponentChoices, outcome as Outcomes];
};

const calculateChoicePoints = (outcome: Outcomes, opponentsChoice: OpponentChoices): number => {
  return choicePoints[outcome][opponentsChoice];
};

const calculateOutcomePoints = (outcome: Outcomes): number => {
  return choicePoints[outcome]["score"];
};
