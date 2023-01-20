import { readFileSync } from "fs";

import { solution } from "./part_two";

describe("part two", () => {
  test("example input", () => {
    const result = solution(readFileSync("./21/example_input.txt", "utf-8"));

    expect(result).toEqual(301);
  });

  test("input", () => {
    const result = solution(readFileSync("./21/input.txt", "utf-8"));

    expect(result).toEqual(3_887_609_741_189);
  });
});
