import { readFileSync } from "fs";

import { countSandUnits } from "./part_two";

describe("part one", () => {
  test("example input", () => {
    const result = countSandUnits(readFileSync("./14/example_input.txt", "utf-8"));

    expect(result).toEqual(93);
  });

  test("input", () => {
    const result = countSandUnits(readFileSync("./14/input.txt", "utf-8"));

    expect(result).toEqual(27_155);
  });
});
