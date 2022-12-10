import { readFileSync } from "fs";

import { countPositionsVisitedByTail } from "./part_two";

describe("part two", () => {
  test("example input", () => {
    const result = countPositionsVisitedByTail(readFileSync("./09/example_input_part_two.txt", "utf-8"));

    expect(result).toEqual(36);
  });

  test("input", () => {
    const result = countPositionsVisitedByTail(readFileSync("./09/input.txt", "utf-8"));

    expect(result).toEqual(0);
  });
});
