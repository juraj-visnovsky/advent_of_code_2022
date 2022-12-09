import { readFileSync } from "fs";

import { countPositionsVisitedByTail } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = countPositionsVisitedByTail(readFileSync("./09/example_input_part_one.txt", "utf-8"));

    expect(result).toEqual(13);
  });

  test("input", () => {
    const result = countPositionsVisitedByTail(readFileSync("./09/input.txt", "utf-8"));

    expect(result).toEqual(5_907);
  });
});
