import { readFileSync } from "fs";

import { multiplyBlueprintQualityLevels } from "./part_two";

describe("part two", () => {
  test("example input", () => {
    const result = multiplyBlueprintQualityLevels(readFileSync("./19/example_input.txt", "utf-8"));

    expect(result).toEqual(3_472);
  });

  test("input", () => {
    const result = multiplyBlueprintQualityLevels(readFileSync("./19/input.txt", "utf-8"));

    expect(result).toEqual(15_960);
  });
});
