type Valve = {
  valveName: string;
  flowRate: number;
  tunnelDestinations: string[];
};
type Valves = Record<string, Valve>;
type DistanceMap = Record<string, Record<string, number>>;
type State = {
  myValveName: string;
  myTimeLeft: number;
  elephantValveName: string;
  elephantTimeLeft: number;
  usedValves: Set<string>;
};

// This solution is slow. I'm not willing to invest more time into making it more performant, so hopefully no one will ever have to run this code. :)

export const findMaximumPressureRelease = (input: string): number => {
  const valves = parseValves(input);
  const distanceMap = mapDistances(valves);
  const startLocation = "AA";
  const usedValves = new Set<string>([startLocation]);
  const initialState = {
    myValveName: startLocation,
    myTimeLeft: 26,
    elephantValveName: startLocation,
    elephantTimeLeft: 26,
    usedValves,
  };

  return calculatePressure(valves, distanceMap, initialState);
};

const calculatePressure = (valves: Valves, distanceMap: DistanceMap, state: State) => {
  const { myValveName, myTimeLeft, elephantValveName, elephantTimeLeft, usedValves } = state;
  let totalPressure = 0;
  let pressures: number[] = [];
  const myOptions = getAvailableOptions(distanceMap, myValveName, myTimeLeft, usedValves);
  const elephantOptions = getAvailableOptions(distanceMap, elephantValveName, elephantTimeLeft, usedValves);

  if (myTimeLeft < 1 && elephantTimeLeft < 1) {
    return 0;
  }

  if (myOptions.length === 0 && elephantOptions.length === 0) {
    return myTimeLeft * valves[myValveName].flowRate + elephantTimeLeft * valves[elephantValveName].flowRate;
  }

  if (myTimeLeft > elephantTimeLeft) {
    myOptions.forEach(({ nextValveName, minutesSpent }) => {
      const nextState = {
        myValveName: nextValveName,
        myTimeLeft: myTimeLeft - minutesSpent,
        elephantValveName,
        elephantTimeLeft,
        usedValves: new Set([...usedValves, nextValveName]),
      };

      pressures.push(valves[myValveName].flowRate * myTimeLeft + calculatePressure(valves, distanceMap, nextState));
    });
  } else if (elephantTimeLeft > myTimeLeft) {
    elephantOptions.forEach(({ nextValveName, minutesSpent }) => {
      const nextState = {
        myValveName,
        myTimeLeft,
        elephantValveName: nextValveName,
        elephantTimeLeft: elephantTimeLeft - minutesSpent,
        usedValves: new Set([...usedValves, nextValveName]),
      };

      pressures.push(
        valves[elephantValveName].flowRate * elephantTimeLeft + calculatePressure(valves, distanceMap, nextState),
      );
    });
  } else {
    myOptions.forEach(({ nextValveName, minutesSpent }) => {
      const nextState = {
        myValveName: nextValveName,
        myTimeLeft: myTimeLeft - minutesSpent,
        elephantValveName,
        elephantTimeLeft,
        usedValves: new Set([...usedValves, nextValveName]),
      };

      pressures.push(valves[myValveName].flowRate * myTimeLeft + calculatePressure(valves, distanceMap, nextState));
    });

    elephantOptions.forEach(({ nextValveName, minutesSpent }) => {
      const nextState = {
        myValveName,
        myTimeLeft,
        elephantValveName: nextValveName,
        elephantTimeLeft: elephantTimeLeft - minutesSpent,
        usedValves: new Set([...usedValves, nextValveName]),
      };

      pressures.push(
        valves[elephantValveName].flowRate * elephantTimeLeft + calculatePressure(valves, distanceMap, nextState),
      );
    });
  }

  return totalPressure + Math.max(...pressures);
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

const getAvailableOptions = (
  distanceMap: DistanceMap,
  valveName: string,
  minutesLeft: number,
  usedValves: Set<string>,
) => {
  return Object.entries(distanceMap[valveName])
    .filter(([nextValveName, minutesSpent]) => !usedValves.has(nextValveName) && minutesLeft - minutesSpent >= 0)
    .map(([nextValveName, minutesSpent]) => ({ nextValveName, minutesSpent }));
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
