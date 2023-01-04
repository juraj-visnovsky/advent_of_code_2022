import { readFileSync } from "fs";

import { findMaximumPressureRelease } from "./part_two";

describe("part two", () => {
  test("example input", () => {
    const result = findMaximumPressureRelease(readFileSync("./16/example_input.txt", "utf-8"));

    expect(result).toEqual(1_707);
  });

  test("input", () => {
    const result = findMaximumPressureRelease(readFileSync("./16/input.txt", "utf-8"));

    expect(result).toEqual(2_504);
  });
});
