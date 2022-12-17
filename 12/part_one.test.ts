import { readFileSync } from "fs";

import { findShortestPath } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = findShortestPath(readFileSync("./12/example_input.txt", "utf-8"));

    expect(result).toEqual(31);
  });

  test("input", () => {
    const result = findShortestPath(readFileSync("./12/input.txt", "utf-8"));

    expect(result).toEqual(440);
  });
});
