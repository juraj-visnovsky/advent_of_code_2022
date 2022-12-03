import { readFileSync } from "fs";

import { sumPrioritiesOfBadges } from "./part_two";

describe("part two", () => {
  test("example input", () => {
    const result = sumPrioritiesOfBadges(readFileSync("./03/example_input.txt", "utf-8"));

    expect(result).toEqual(70);
  });

  test("input", () => {
    const result = sumPrioritiesOfBadges(readFileSync("./03/input.txt", "utf-8"));

    expect(result).toEqual(2_510);
  });
});
