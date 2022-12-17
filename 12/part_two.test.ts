import { readFileSync } from "fs";

import { findShortestPathDown } from "./part_two";

describe("part two", () => {
  test("example input", () => {
    const result = findShortestPathDown(readFileSync("./12/example_input.txt", "utf-8"));

    expect(result).toEqual(29);
  });

  test("input", () => {
    const result = findShortestPathDown(readFileSync("./12/input.txt", "utf-8"));

    expect(result).toEqual(439);
  });
});
