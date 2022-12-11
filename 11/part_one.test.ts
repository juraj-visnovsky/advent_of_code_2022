import { readFileSync } from "fs";

import { calculateMonkeyBusiness } from "./part_one";

describe("part one", () => {
  test("example input", () => {
    const result = calculateMonkeyBusiness(readFileSync("./11/example_input.txt", "utf-8"));

    expect(result).toEqual(10_605);
  });

  test("input", () => {
    const result = calculateMonkeyBusiness(readFileSync("./11/input.txt", "utf-8"));

    expect(result).toEqual(69_918);
  });
});
