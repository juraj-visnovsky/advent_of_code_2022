type Valve = {
  valveName: string;
  flowRate: number;
  tunnelDestinations: string[];
};
type Valves = Record<string, Valve>;
type DistanceMap = Record<string, Record<string, number>>;
type State = {
  myLocation: string;
  myTimeLeft: number;
  elephantLocation: string;
  elephantTimeLeft: number;
  usedValves: Set<string>;
};

export const findMaximumPressureRelease = (input: string): number => {
  const valves = parseValves(input);
  const distanceMap = mapDistances(valves);
  const startLocation = "AA";
  const usedValves = new Set<string>([startLocation]);

  return calculatePressure(valves, startLocation, 30, distanceMap, usedValves);
};

const calculatePressure = (
  valves: Valves,
  currentValveName: string,
  minutesLeft: number,
  distanceMap: DistanceMap,
  usedValves: Set<string>,
) => {
  if (minutesLeft < 1) {
    return 0;
  }

  const { valveName, flowRate } = valves[currentValveName];
  let totalPressure = flowRate * minutesLeft;
  const options = Object.entries(distanceMap[valveName])
    .filter(([nextValveName, minutesSpent]) => !usedValves.has(nextValveName) && minutesLeft - minutesSpent >= 0)
    .map(([nextValveName, minutesSpent]) => ({ nextValveName, minutesSpent }));

  if (options.length > 0) {
    totalPressure += Math.max(
      ...options.map(({ nextValveName, minutesSpent }) =>
        calculatePressure(
          valves,
          nextValveName,
          minutesLeft - minutesSpent,
          distanceMap,
          new Set([...usedValves, nextValveName]),
        ),
      ),
    );
  }

  return totalPressure;
};

const mapDistances = (valves: Valves) => {
  const distanceMap: DistanceMap = {};

  Object.entries(valves).forEach(([firstValveName, firstValve]) => {
    Object.entries(valves).forEach(([secondValveName, secondValve]) => {
      if (firstValveName === secondValveName) {
        return;
      }

      if (firstValve.flowRate === 0 || secondValve.flowRate === 0) {
        if (firstValveName === "AA") {
          if (secondValve.flowRate === 0) {
            return;
          }
        } else {
          return;
        }
      }

      if (!distanceMap[firstValveName]) {
        distanceMap[firstValveName] = {};
      }

      const distance = findShortestDistanceBetweenValves(firstValveName, secondValveName, valves);

      if (distance) {
        distanceMap[firstValveName][secondValveName] = distance + 1;
      }
    });
  });

  return distanceMap;
};

const findShortestDistanceBetweenValves = (sourceValve: string, targetValve: string, valves: Valves) => {
  const queue = [{ currentValve: sourceValve, minutesSpent: 0 }];
  const seenValves = new Set<string>();

  while (queue.length > 0) {
    const { currentValve, minutesSpent } = queue.shift()!;
    seenValves.add(currentValve);

    if (currentValve === targetValve) {
      return minutesSpent;
    }

    valves[currentValve].tunnelDestinations.forEach((nextValve) => {
      if (seenValves.has(nextValve)) {
        return;
      }

      queue.push({ currentValve: nextValve, minutesSpent: minutesSpent + 1 });
    });
  }

  return;
};

const parseValves = (input: string) => {
  const valves: Valves = {};

  input.split(/\r?\n/).forEach((line) => {
    const [, valveName, flowRate, tunnelDestinations] = line.match(
      /Valve (\S+) has flow rate=(\d+); tunnels? leads? to valves? (.*)/,
    )!;

    valves[valveName] = {
      valveName,
      flowRate: Number(flowRate),
      tunnelDestinations: tunnelDestinations.split(", "),
    };
  });

  return valves;
};
