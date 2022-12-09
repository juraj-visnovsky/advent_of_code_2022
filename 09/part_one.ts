type Position = {
  x: number;
  y: number;
};

type Direction = "U" | "D" | "R" | "L";

const headMoves = {
  U: (position: Position) => position.y++,
  D: (position: Position) => position.y--,
  R: (position: Position) => position.x++,
  L: (position: Position) => position.x--,
};

export const countPositionsVisitedByTail = (input: string): number => {
  const motions = input.split(/\r?\n/);
  const headPosition = { x: 0, y: 0 };
  const tailPosition = { x: 0, y: 0 };
  const positionsVisitedByTail = new Set(["0:0"]);

  motions.forEach((motion) => {
    const [direction, stepsString] = motion.split(" ");
    const steps = Number(stepsString);

    for (let i = 1; i <= steps; i++) {
      const tailMoved = moveRope(direction as Direction, headPosition, tailPosition);

      if (tailMoved) {
        positionsVisitedByTail.add(`${tailPosition.x}:${tailPosition.y}`);
      }
    }
  });

  return positionsVisitedByTail.size;
};

const moveRope = (direction: Direction, headPosition: Position, tailPosition: Position) => {
  const currentHeadPosition = { ...headPosition };
  headMoves[direction](headPosition);
  return moveTailIfNeeded(headPosition, tailPosition, currentHeadPosition);
};

const moveTailIfNeeded = (headPosition: Position, tailPosition: Position, previousHeadPosition: Position) => {
  const distanceX = Math.abs(headPosition.x - tailPosition.x);
  const distanceY = Math.abs(headPosition.y - tailPosition.y);
  const distance = Math.max(distanceX, distanceY);
  let tailMoved = false;

  if (distance > 1) {
    tailPosition.x = previousHeadPosition.x;
    tailPosition.y = previousHeadPosition.y;
    tailMoved = true;
  }

  return tailMoved;
};
