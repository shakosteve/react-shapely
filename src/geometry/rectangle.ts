import { failed, solved, type SolveResult } from "./types";

export type RectangleField = "length" | "width" | "perimeter" | "area";

// Any two measurements determine the length and width, which determine the rest.
export function solveRectangle(
  v: Partial<Record<RectangleField, number>>
): SolveResult<RectangleField> {
  const { length: l, width: w, perimeter: p, area: a } = v;
  let length: number;
  let width: number;

  if (l !== undefined && w !== undefined) {
    [length, width] = [l, w];
  } else if (l !== undefined && p !== undefined) {
    [length, width] = [l, p / 2 - l];
  } else if (l !== undefined && a !== undefined) {
    [length, width] = [l, a / l];
  } else if (w !== undefined && p !== undefined) {
    [length, width] = [p / 2 - w, w];
  } else if (w !== undefined && a !== undefined) {
    [length, width] = [a / w, w];
  } else if (p !== undefined && a !== undefined) {
    // length + width = p/2 and length * width = a, so they are the roots of x² - (p/2)x + a = 0
    const halfP = p / 2;
    const discriminant = halfP * halfP - 4 * a;
    if (discriminant < 0) {
      return failed("No rectangle has that perimeter and area");
    }
    length = (halfP + Math.sqrt(discriminant)) / 2;
    width = (halfP - Math.sqrt(discriminant)) / 2;
  } else {
    return failed("Enter any two measurements");
  }

  if (length <= 0 || width <= 0) {
    return failed("The perimeter is too small for that side");
  }

  return solved({
    length,
    width,
    perimeter: 2 * (length + width),
    area: length * width
  });
}
