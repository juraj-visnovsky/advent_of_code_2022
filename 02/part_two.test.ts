import { readFileSync } from "fs";

import { countTotalScore } from "./part_two";

describe("part two", () => {
  test("example input", () => {
    const result = countTotalScore(readFileSync("./02/example_input.txt", "utf-8"));

    expect(result).toEqual(12);
  });

  test("input", () => {
    const result = countTotalScore(readFileSync("./02/input.txt", "utf-8"));

    expect(result).toEqual(13_193);
  });
});
