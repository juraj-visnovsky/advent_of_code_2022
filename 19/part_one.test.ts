import { readFileSync } from "fs";

import { sumBlueprintQualityLevels } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = sumBlueprintQualityLevels(readFileSync("./19/example_input.txt", "utf-8"));

    expect(result).toEqual(33);
  });

  test("input", () => {
    const result = sumBlueprintQualityLevels(readFileSync("./19/input.txt", "utf-8"));

    expect(result).toEqual(994);
  });
});
