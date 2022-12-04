import { readFileSync } from "fs";

import { countFullyContainedSections } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = countFullyContainedSections(readFileSync("./04/example_input.txt", "utf-8"));

    expect(result).toEqual(2);
  });

  test("input", () => {
    const result = countFullyContainedSections(readFileSync("./04/input.txt", "utf-8"));

    expect(result).toEqual(542);
  });
});
