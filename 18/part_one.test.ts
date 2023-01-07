import { readFileSync } from "fs";

import { countExposedSides } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = countExposedSides(readFileSync("./18/example_input.txt", "utf-8"));

    expect(result).toEqual(64);
  });

  test("input", () => {
    const result = countExposedSides(readFileSync("./18/input.txt", "utf-8"));

    expect(result).toEqual(3_390);
  });
});
