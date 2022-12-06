import { readFileSync } from "fs";

import { findStartOfPacketMarker } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = findStartOfPacketMarker(readFileSync("./06/example_input.txt", "utf-8"));

    expect(result).toEqual(7);
  });

  test("input", () => {
    const result = findStartOfPacketMarker(readFileSync("./06/input.txt", "utf-8"));

    expect(result).toEqual(1_892);
  });
});
