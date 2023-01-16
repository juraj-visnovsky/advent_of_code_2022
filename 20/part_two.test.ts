import { readFileSync } from "fs";

import { sumDecryptedValues } from "./part_two";

describe("part two", () => {
  test("example input", () => {
    const result = sumDecryptedValues(readFileSync("./20/example_input.txt", "utf-8"));

    expect(result).toEqual(1_623_178_306);
  });

  test("input", () => {
    const result = sumDecryptedValues(readFileSync("./20/input.txt", "utf-8"));

    expect(result).toEqual(19_185_967_576_920);
  });
});
