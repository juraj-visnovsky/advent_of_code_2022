import { readFileSync } from "fs";

import { countOverlappingSections } from "./part_two";

describe("part two", () => {
  test("example input", () => {
    const result = countOverlappingSections(readFileSync("./04/example_input.txt", "utf-8"));

    expect(result).toEqual(4);
  });

  test("input", () => {
    const result = countOverlappingSections(readFileSync("./04/input.txt", "utf-8"));

    expect(result).toEqual(900);
  });
});
