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
  const knotPositions = Array.from({ length: 9 }, () => ({ x: 0, y: 0 }));
  const positionsVisitedByTail = new Set(["0:0"]);

  motions.forEach((motion) => {
    const [direction, stepsString] = motion.split(" ");
    const steps = Number(stepsString);

    for (let i = 1; i <= steps; i++) {
      moveRope(direction as Direction, headPosition, knotPositions);
      positionsVisitedByTail.add(`${knotPositions[8].x}:${knotPositions[8].y}`);
    }
  });

  return positionsVisitedByTail.size;
};

const moveRope = (direction: Direction, headPosition: Position, knotPositions: Position[]) => {
  headMoves[direction](headPosition);
  let previousKnotPosition = { ...headPosition };

  knotPositions.forEach((knotPosition) => {
    const distanceX = Math.abs(previousKnotPosition.x - knotPosition.x);
    const distanceY = Math.abs(previousKnotPosition.y - knotPosition.y);
    const distance = Math.max(distanceX, distanceY);

    if (distance > 1) {
      if (distanceX >= 1) {
        knotPosition.x += previousKnotPosition.x > knotPosition.x ? 1 : -1;
      }

      if (distanceY >= 1) {
        knotPosition.y += previousKnotPosition.y > knotPosition.y ? 1 : -1;
      }
    }

    previousKnotPosition = { ...knotPosition };
  });
};
