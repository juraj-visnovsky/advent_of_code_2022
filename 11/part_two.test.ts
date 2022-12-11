import { readFileSync } from "fs";

import { calculateMonkeyBusiness } from "./part_two";

describe("part two", () => {
  test("example input", () => {
    const result = calculateMonkeyBusiness(readFileSync("./11/example_input.txt", "utf-8"));

    expect(result).toEqual(2_713_310_158);
  });

  test("input", () => {
    const result = calculateMonkeyBusiness(readFileSync("./11/input.txt", "utf-8"));

    expect(result).toEqual(19_573_408_701);
  });
});
