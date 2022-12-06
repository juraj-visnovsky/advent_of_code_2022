import { readFileSync } from "fs";

import { findStartOfMessageMarker } from "./part_two";

describe("part two", () => {
  test("example input", () => {
    const result = findStartOfMessageMarker(readFileSync("./06/example_input.txt", "utf-8"));

    expect(result).toEqual(19);
  });

  test("input", () => {
    const result = findStartOfMessageMarker(readFileSync("./06/input.txt", "utf-8"));

    expect(result).toEqual(2_313);
  });
});
