import { readFileSync } from "fs";

import { findCratesOnTopOfStacks } from "./part_two";

describe("part two", () => {
  test("example input", () => {
    const result = findCratesOnTopOfStacks(readFileSync("./05/example_input.txt", "utf-8"));

    expect(result).toEqual("MCD");
  });

  test("input", () => {
    const result = findCratesOnTopOfStacks(readFileSync("./05/input.txt", "utf-8"));

    expect(result).toEqual("HRFTQVWNN");
  });
});
