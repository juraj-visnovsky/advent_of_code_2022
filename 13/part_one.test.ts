import { readFileSync } from "fs";

import { sumPairIndexes } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = sumPairIndexes(readFileSync("./13/example_input.txt", "utf-8"));

    expect(result).toEqual(13);
  });

  test("input", () => {
    const result = sumPairIndexes(readFileSync("./13/input.txt", "utf-8"));

    expect(result).toEqual(6_240);
  });
});
