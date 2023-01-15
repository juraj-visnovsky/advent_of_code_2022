enum RobotTypes {
  Ore = "ore",
  Clay = "clay",
  Obsidian = "obsidian",
  Geode = "geode",
}

type Blueprint = {
  id: number;
  oreRobotOreCost: number;
  clayRobotOreCost: number;
  obsidianRobotOreCost: number;
  obsidianRobotClayCost: number;
  geodeRobotOreCost: number;
  geodeRobotObsidianCost: number;
};

type State = {
  blueprint: Blueprint;
  minutesLeft: number;
  ore: number;
  clay: number;
  obsidian: number;
  geode: number;
  oreRobots: number;
  clayRobots: number;
  obsidianRobots: number;
  geodeRobots: number;
  currentRobotTarget: RobotTypes;
};

export const multiplyBlueprintQualityLevels = (input: string): number => {
  const blueprints = parseBlueprints(input).slice(0, 3);
  const qualityLevelSum = blueprints.reduce((sum, blueprint) => {
    const initialState = {
      blueprint,
      minutesLeft: 32,
      ore: 0,
      clay: 0,
      obsidian: 0,
      geode: 0,
      oreRobots: 1,
      clayRobots: 0,
      obsidianRobots: 0,
      geodeRobots: 0,
      currentRobotTarget: RobotTypes.Geode,
    };
    const openedGeodes = countOpenedGeodes(initialState);

    return sum * openedGeodes;
  }, 1);

  return qualityLevelSum;
};

const countOpenedGeodes = (state: State) => {
  const { minutesLeft, geode } = state;

  if (minutesLeft === 0) {
    return geode;
  }

  const options = buildOptions(state);

  const maxGeodes = Math.max(
    ...options.map((newState) => {
      while (!canBuildRobot(newState)) {
        collectResources(newState);

        if (newState.minutesLeft === 0) {
          return newState.geode;
        }
      }

      collectResources(newState);
      buildRobot(newState);

      return countOpenedGeodes(newState);
    }),
  );

  return maxGeodes;
};

const canBuildRobot = (state: State) => {
  const { blueprint, ore, clay, obsidian } = state;

  switch (state.currentRobotTarget) {
    case RobotTypes.Ore:
      return ore >= blueprint.oreRobotOreCost;
    case RobotTypes.Clay:
      return ore >= blueprint.clayRobotOreCost;
    case RobotTypes.Obsidian:
      return ore >= blueprint.obsidianRobotOreCost && clay >= blueprint.obsidianRobotClayCost;
    case RobotTypes.Geode:
      return ore >= blueprint.geodeRobotOreCost && obsidian >= blueprint.geodeRobotObsidianCost;
  }
};

const collectResources = (state: State) => {
  state.ore += state.oreRobots;
  state.clay += state.clayRobots;
  state.obsidian += state.obsidianRobots;
  state.geode += state.geodeRobots;
  state.minutesLeft--;
};

const buildRobot = (state: State) => {
  const { blueprint } = state;

  switch (state.currentRobotTarget) {
    case RobotTypes.Ore:
      state.ore -= blueprint.oreRobotOreCost;
      state.oreRobots += 1;
      break;
    case RobotTypes.Clay:
      state.ore -= blueprint.clayRobotOreCost;
      state.clayRobots += 1;
      break;
    case RobotTypes.Obsidian:
      state.ore -= blueprint.obsidianRobotOreCost;
      state.clay -= blueprint.obsidianRobotClayCost;
      state.obsidianRobots += 1;
      break;
    case RobotTypes.Geode:
      state.ore -= blueprint.geodeRobotOreCost;
      state.obsidian -= blueprint.geodeRobotObsidianCost;
      state.geodeRobots += 1;
      break;
  }
};

const buildOptions = (state: State) => {
  const { blueprint, oreRobots, clayRobots, obsidianRobots } = state;
  const shouldBuildOreRobot =
    oreRobots <
    Math.max(
      blueprint.oreRobotOreCost,
      blueprint.clayRobotOreCost,
      blueprint.obsidianRobotOreCost,
      blueprint.geodeRobotOreCost,
    );
  const shouldBuildClayRobot = clayRobots < blueprint.obsidianRobotClayCost;
  const shouldBuildObsidianRobot = obsidianRobots < blueprint.geodeRobotObsidianCost;
  const robotTypes = [{ ...state, currentRobotTarget: RobotTypes.Geode }];

  if (shouldBuildOreRobot) {
    robotTypes.push({ ...state, currentRobotTarget: RobotTypes.Ore });
  }

  if (shouldBuildClayRobot) {
    robotTypes.push({ ...state, currentRobotTarget: RobotTypes.Clay });
  }

  if (shouldBuildObsidianRobot) {
    robotTypes.push({ ...state, currentRobotTarget: RobotTypes.Obsidian });
  }

  return robotTypes;
};

const parseBlueprints = (input: string) => {
  return input.split(/\r?\n/).map((line) => {
    const numbers = line.match(/\d+/g);
    const [
      id,
      oreRobotOreCost,
      clayRobotOreCost,
      obsidianRobotOreCost,
      obsidianRobotClayCost,
      geodeRobotOreCost,
      geodeRobotObsidianCost,
    ] = numbers?.map(Number)!;

    return {
      id,
      oreRobotOreCost,
      clayRobotOreCost,
      obsidianRobotOreCost,
      obsidianRobotClayCost,
      geodeRobotOreCost,
      geodeRobotObsidianCost,
    };
  });
};
