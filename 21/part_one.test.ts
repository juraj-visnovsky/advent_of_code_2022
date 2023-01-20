import { readFileSync } from "fs";

import { solution } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = solution(readFileSync("./21/example_input.txt", "utf-8"));

    expect(result).toEqual(152);
  });

  test("input", () => {
    const result = solution(readFileSync("./21/input.txt", "utf-8"));

    expect(result).toEqual(194_501_589_693_264);
  });
});
