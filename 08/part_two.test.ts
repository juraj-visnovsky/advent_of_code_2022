import { readFileSync } from "fs";

import { getHighestScenicScore } from "./part_two";

describe("part two", () => {
  test("example input", () => {
    const result = getHighestScenicScore(readFileSync("./08/example_input.txt", "utf-8"));

    expect(result).toEqual(8);
  });

  test("input", () => {
    const result = getHighestScenicScore(readFileSync("./08/input.txt", "utf-8"));

    expect(result).toEqual(288_120);
  });
});
