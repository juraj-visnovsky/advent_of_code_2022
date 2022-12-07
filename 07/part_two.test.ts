import { readFileSync } from "fs";

import { getSizeOfDirectoryToDelete } from "./part_two";

describe("part one", () => {
  test("example input", () => {
    const result = getSizeOfDirectoryToDelete(readFileSync("./07/example_input.txt", "utf-8"));

    expect(result).toEqual(24_933_642);
  });

  test("input", () => {
    const result = getSizeOfDirectoryToDelete(readFileSync("./07/input.txt", "utf-8"));

    expect(result).toEqual(4_473_403);
  });
});
