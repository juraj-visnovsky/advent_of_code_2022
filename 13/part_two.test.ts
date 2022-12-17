import { readFileSync } from "fs";

import { getDecoderKey } from "./part_two";

describe("part two", () => {
  test("example input", () => {
    const result = getDecoderKey(readFileSync("./13/example_input.txt", "utf-8"));

    expect(result).toEqual(140);
  });

  test("input", () => {
    const result = getDecoderKey(readFileSync("./13/input.txt", "utf-8"));

    expect(result).toEqual(23_142);
  });
});
