import { readFileSync } from "fs";

import { totalDirectorySize } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = totalDirectorySize(readFileSync("./07/example_input.txt", "utf-8"));

    expect(result).toEqual(95_437);
  });

  test("input", () => {
    const result = totalDirectorySize(readFileSync("./07/input.txt", "utf-8"));

    expect(result).toEqual(2_061_777);
  });
});
