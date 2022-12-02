import { readFileSync } from "fs";

import { topThreeSum } from "./part_two";

describe("part two", () => {
  test("example input", () => {
    const result = topThreeSum(readFileSync("./01/example_input.txt", "utf-8"));

    expect(result).toEqual(45_000);
  });

  test("input", () => {
    const result = topThreeSum(readFileSync("./01/input.txt", "utf-8"));

    expect(result).toEqual(212_520);
  });
});
