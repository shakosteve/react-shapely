import { describe, expect, it } from "vitest";
import { solveCircle } from "./circle";
import { solveRectangle } from "./rectangle";
import { solveRightTriangle } from "./rightTriangle";
import type { SolveResult } from "./types";

function values<K extends string>(result: SolveResult<K>) {
  if (!result.ok) {
    throw new Error(`Expected a solution but got: ${result.message}`);
  }
  return result.values;
}

function expectClose<K extends string>(actual: Record<K, number>, expected: Record<K, number>) {
  for (const key of Object.keys(expected) as K[]) {
    expect(actual[key], key).toBeCloseTo(expected[key], 9);
  }
}

describe("solveCircle", () => {
  const unit = { radius: 1, diameter: 2, circumference: 2 * Math.PI, area: Math.PI };

  it.each(Object.entries(unit))("solves from %s alone", (name, value) => {
    expectClose(values(solveCircle({ [name]: value })), unit);
  });

  it("asks for a measurement when given none", () => {
    expect(solveCircle({}).ok).toBe(false);
  });
});

describe("solveRectangle", () => {
  const threeByFour = { length: 4, width: 3, perimeter: 14, area: 12 };

  it.each([
    ["length", "width"],
    ["length", "perimeter"],
    ["length", "area"],
    ["width", "perimeter"],
    ["width", "area"],
    ["perimeter", "area"]
  ] as const)("solves from %s and %s", (first, second) => {
    const input = { [first]: threeByFour[first], [second]: threeByFour[second] };
    expectClose(values(solveRectangle(input)), threeByFour);
  });

  it("needs two measurements", () => {
    expect(solveRectangle({ area: 12 }).ok).toBe(false);
  });

  it("rejects a perimeter too small for the side", () => {
    expect(solveRectangle({ length: 5, perimeter: 10 }).ok).toBe(false);
  });

  it("rejects a perimeter and area no rectangle can have", () => {
    expect(solveRectangle({ perimeter: 4, area: 10 }).ok).toBe(false);
  });
});

describe("solveRightTriangle", () => {
  const threeFourFive = { legA: 3, legB: 4, hypotenuse: 5, perimeter: 12 };

  it.each([
    ["legA", "legB"],
    ["legA", "hypotenuse"],
    ["legB", "hypotenuse"],
    ["legA", "perimeter"],
    ["legB", "perimeter"]
  ] as const)("solves from %s and %s", (first, second) => {
    const input = { [first]: threeFourFive[first], [second]: threeFourFive[second] };
    expectClose(values(solveRightTriangle(input)), threeFourFive);
  });

  it("solves from hypotenuse and perimeter, longer leg first", () => {
    const result = values(solveRightTriangle({ hypotenuse: 5, perimeter: 12 }));
    expectClose(result, { legA: 4, legB: 3, hypotenuse: 5, perimeter: 12 });
  });

  it("needs two measurements", () => {
    expect(solveRightTriangle({ hypotenuse: 5 }).ok).toBe(false);
  });

  it("rejects a hypotenuse no longer than a leg", () => {
    expect(solveRightTriangle({ legA: 5, hypotenuse: 5 }).ok).toBe(false);
  });

  it("rejects a perimeter too small for the leg", () => {
    expect(solveRightTriangle({ legA: 5, perimeter: 10 }).ok).toBe(false);
  });

  it("rejects a hypotenuse and perimeter no right triangle can have", () => {
    expect(solveRightTriangle({ hypotenuse: 5, perimeter: 20 }).ok).toBe(false);
    expect(solveRightTriangle({ hypotenuse: 5, perimeter: 10 }).ok).toBe(false);
  });
});
