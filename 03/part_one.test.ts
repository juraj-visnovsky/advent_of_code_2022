import { readFileSync } from "fs";

import { sumPrioritiesOfMisplacedItems } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = sumPrioritiesOfMisplacedItems(readFileSync("./03/example_input.txt", "utf-8"));

    expect(result).toEqual(157);
  });

  test("input", () => {
    const result = sumPrioritiesOfMisplacedItems(readFileSync("./03/input.txt", "utf-8"));

    expect(result).toEqual(8_039);
  });
});
