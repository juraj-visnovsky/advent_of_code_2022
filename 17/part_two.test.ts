import { readFileSync } from "fs";

import { calculateCaveHeight } from "./part_two";

describe("part two", () => {
  test("example input", () => {
    const result = calculateCaveHeight(readFileSync("./17/example_input.txt", "utf-8"));

    expect(result).toEqual(1_514_285_714_288);
  });

  test("input", () => {
    const result = calculateCaveHeight(readFileSync("./17/input.txt", "utf-8"));

    expect(result).toEqual(1_555_113_636_385);
  });
});
