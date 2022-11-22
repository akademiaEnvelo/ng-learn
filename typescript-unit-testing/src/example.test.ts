import { sum } from "./sum";

describe("test sum function", () => {
  it("4 + 4 equal 8", () => {
    const result = sum(4, 4);

    expect(result).toBe(8);
  });

  it("5 + 10 should equal 15", () => {
    const result = sum(5, 10);

    expect(result).not.toBe(14);
  });
});
