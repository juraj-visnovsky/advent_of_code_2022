import { readFileSync } from "fs";

import { countVisibleTrees } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = countVisibleTrees(readFileSync("./08/example_input.txt", "utf-8"));

    expect(result).toEqual(21);
  });

  test("input", () => {
    const result = countVisibleTrees(readFileSync("./08/input.txt", "utf-8"));

    expect(result).toEqual(1_796);
  });
});
