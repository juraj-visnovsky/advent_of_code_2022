import { readFileSync } from "fs";

import { calculateCoveredLocationsOnRow } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = calculateCoveredLocationsOnRow(readFileSync("./15/example_input.txt", "utf-8"), 10);

    expect(result).toEqual(26);
  });

  test("input", () => {
    const result = calculateCoveredLocationsOnRow(readFileSync("./15/input.txt", "utf-8"), 2_000_000);

    expect(result).toEqual(4_725_496);
  });
});
