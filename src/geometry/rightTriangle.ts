import { failed, solved, type SolveResult } from "./types";

export type RightTriangleField = "legA" | "legB" | "hypotenuse" | "perimeter";

// Any two measurements determine both legs, which determine the rest.
export function solveRightTriangle(
  v: Partial<Record<RightTriangleField, number>>
): SolveResult<RightTriangleField> {
  const { legA: a, legB: b, hypotenuse: c, perimeter: p } = v;
  let legA: number;
  let legB: number;

  if (a !== undefined && b !== undefined) {
    [legA, legB] = [a, b];
  } else if (c !== undefined && (a !== undefined || b !== undefined)) {
    const leg = (a ?? b) as number;
    if (c <= leg) {
      return failed("The hypotenuse must be longer than either leg");
    }
    const other = Math.sqrt(c * c - leg * leg);
    [legA, legB] = a !== undefined ? [a, other] : [other, leg];
  } else if (p !== undefined && (a !== undefined || b !== undefined)) {
    // other + c = p - leg and c² - other² = leg², so c - other = leg² / (p - leg)
    const leg = (a ?? b) as number;
    const sum = p - leg;
    const difference = (leg * leg) / sum;
    const other = (sum - difference) / 2;
    if (sum <= 0 || other <= 0) {
      return failed("The perimeter is too small for that leg");
    }
    [legA, legB] = a !== undefined ? [a, other] : [other, leg];
  } else if (c !== undefined && p !== undefined) {
    // legA + legB = p - c and legA² + legB² = c², so the legs are roots of a quadratic
    const sum = p - c;
    const discriminant = 2 * c * c - sum * sum;
    if (sum <= c || discriminant < 0) {
      return failed("No right triangle has that hypotenuse and perimeter");
    }
    legA = (sum + Math.sqrt(discriminant)) / 2;
    legB = (sum - Math.sqrt(discriminant)) / 2;
  } else {
    return failed("Enter any two measurements");
  }

  const hypotenuse = Math.sqrt(legA * legA + legB * legB);
  return solved({
    legA,
    legB,
    hypotenuse,
    perimeter: legA + legB + hypotenuse
  });
}
