import { solveCircle } from "./circle";
import { solveRectangle } from "./rectangle";
import { solveRightTriangle } from "./rightTriangle";
import type { Shape } from "./types";

export const shapes = {
  rectangle: {
    label: "Rectangle",
    hint: "Enter any two measurements",
    fields: [
      { name: "length", label: "Length" },
      { name: "width", label: "Width" },
      { name: "perimeter", label: "Perimeter" },
      { name: "area", label: "Area" }
    ],
    solve: solveRectangle
  },
  circle: {
    label: "Circle",
    hint: "Enter any one measurement",
    fields: [
      { name: "radius", label: "Radius" },
      { name: "diameter", label: "Diameter" },
      { name: "circumference", label: "Circumference" },
      { name: "area", label: "Area" }
    ],
    solve: solveCircle
  },
  rightTriangle: {
    label: "Right Triangle",
    hint: "Enter any two measurements",
    fields: [
      { name: "legA", label: "Leg A" },
      { name: "legB", label: "Leg B" },
      { name: "hypotenuse", label: "Hypotenuse" },
      { name: "perimeter", label: "Perimeter" }
    ],
    solve: solveRightTriangle
  }
} satisfies Record<string, Shape>;

export type ShapeKey = keyof typeof shapes;
