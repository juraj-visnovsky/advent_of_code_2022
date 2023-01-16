import { readFileSync } from "fs";

import { sumDecryptedValues } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = sumDecryptedValues(readFileSync("./20/example_input.txt", "utf-8"));

    expect(result).toEqual(3);
  });

  test("input", () => {
    const result = sumDecryptedValues(readFileSync("./20/input.txt", "utf-8"));

    expect(result).toEqual(13_883);
  });
});
