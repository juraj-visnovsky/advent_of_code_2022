import { readFileSync } from "fs";

import { getTuningFrequency } from "./part_two";

describe("part two", () => {
  test("example input", () => {
    const result = getTuningFrequency(readFileSync("./15/example_input.txt", "utf-8"), 0, 20);

    expect(result).toEqual(56_000_011);
  });

  test("input", () => {
    const result = getTuningFrequency(readFileSync("./15/input.txt", "utf-8"), 0, 4_000_000);

    expect(result).toEqual(12_051_287_042_458);
  });
});
