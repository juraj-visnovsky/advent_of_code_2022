import { readFileSync } from "fs";

import { maxCalories } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = maxCalories(readFileSync("./01/example_input.txt", "utf-8"));

    expect(result).toEqual(24_000);
  });

  test("input", () => {
    const result = maxCalories(readFileSync("./01/input.txt", "utf-8"));

    expect(result).toEqual(72_017);
  });
});
