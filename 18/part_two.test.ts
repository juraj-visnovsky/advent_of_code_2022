import { readFileSync } from "fs";

import { countExposedSides } from "./part_two";

describe("part two", () => {
  test("example input", () => {
    const result = countExposedSides(readFileSync("./18/example_input.txt", "utf-8"));

    expect(result).toEqual(58);
  });

  test("input", () => {
    const result = countExposedSides(readFileSync("./18/input.txt", "utf-8"));

    expect(result).toEqual(2_058);
  });
});
