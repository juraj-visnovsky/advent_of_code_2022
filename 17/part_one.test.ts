import { readFileSync } from "fs";

import { calculateCaveHeight } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = calculateCaveHeight(readFileSync("./17/example_input.txt", "utf-8"));

    expect(result).toEqual(3_068);
  });

  test("input", () => {
    const result = calculateCaveHeight(readFileSync("./17/input.txt", "utf-8"));

    expect(result).toEqual(3_175);
  });
});
