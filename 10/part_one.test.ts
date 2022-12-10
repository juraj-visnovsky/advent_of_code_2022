import { readFileSync } from "fs";

import { sumSignalStrengths } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = sumSignalStrengths(readFileSync("./10/example_input.txt", "utf-8"));

    expect(result).toEqual(13_140);
  });

  test("input", () => {
    const result = sumSignalStrengths(readFileSync("./10/input.txt", "utf-8"));

    expect(result).toEqual(14_620);
  });
});
