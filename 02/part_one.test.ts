import { readFileSync } from "fs";

import { countTotalScore } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = countTotalScore(readFileSync("./02/example_input.txt", "utf-8"));

    expect(result).toEqual(15);
  });

  test("input", () => {
    const result = countTotalScore(readFileSync("./02/input.txt", "utf-8"));

    expect(result).toEqual(12_586);
  });
});
