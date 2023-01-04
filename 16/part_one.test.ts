import { readFileSync } from "fs";

import { findMaximumPressureRelease } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = findMaximumPressureRelease(readFileSync("./16/example_input.txt", "utf-8"));

    expect(result).toEqual(1_651);
  });

  test("input", () => {
    const result = findMaximumPressureRelease(readFileSync("./16/input.txt", "utf-8"));

    expect(result).toEqual(1_716);
  });
});
