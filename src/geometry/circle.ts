import { failed, solved, type SolveResult } from "./types";

export type CircleField = "radius" | "diameter" | "circumference" | "area";

// Any one measurement determines the radius, and the radius determines the rest.
export function solveCircle(v: Partial<Record<CircleField, number>>): SolveResult<CircleField> {
  let r: number;
  if (v.radius !== undefined) {
    r = v.radius;
  } else if (v.diameter !== undefined) {
    r = v.diameter / 2;
  } else if (v.circumference !== undefined) {
    r = v.circumference / (2 * Math.PI);
  } else if (v.area !== undefined) {
    r = Math.sqrt(v.area / Math.PI);
  } else {
    return failed("Enter a radius, diameter, circumference or area");
  }

  return solved({
    radius: r,
    diameter: 2 * r,
    circumference: 2 * Math.PI * r,
    area: Math.PI * r * r
  });
}
