import { sum } from "./sum";

describe("test sum function", () => {
  it("4 + 4 equal 8", () => {
    const result = sum(4, 5);

    expect(result).toBe(8);
  });
});
