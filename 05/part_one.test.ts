import { readFileSync } from "fs";

import { findCratesOnTopOfStacks } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = findCratesOnTopOfStacks(readFileSync("./05/example_input.txt", "utf-8"));

    expect(result).toEqual("CMZ");
  });

  test("input", () => {
    const result = findCratesOnTopOfStacks(readFileSync("./05/input.txt", "utf-8"));

    expect(result).toEqual("FRDSQRRCD");
  });
});
