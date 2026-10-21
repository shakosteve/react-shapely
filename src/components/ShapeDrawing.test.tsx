import { act } from "react";
import { createRoot } from "react-dom/client";
import { expect, it } from "vitest";
import type { ShapeKey } from "../geometry";
import ShapeDrawing from "./ShapeDrawing";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

// Returns the labels drawn on the shape and the ones moved to the list beside it.
function draw(shape: ShapeKey, values: Record<string, number>) {
  const div = document.createElement("div");
  const root = createRoot(div);
  act(() => root.render(<ShapeDrawing shape={shape} values={values} />));
  const texts = (selector: string) =>
    [...div.querySelectorAll(selector)].map(element => element.textContent);
  const result = {
    onShape: texts("text.ShapeLabel:not(.ShapeListItem)"),
    listed: texts("text.ShapeListItem")
  };
  act(() => root.unmount());
  return result;
}

it("keeps every measurement on a rectangle with room for them", () => {
  expect(draw("rectangle", { length: 4, width: 3, perimeter: 14, area: 12 })).toEqual({
    onShape: ["Length 4", "Width 3", "Area 12", "Perimeter 14"],
    listed: []
  });
});

it("lists the measurements that don't fit on a thin rectangle", () => {
  expect(draw("rectangle", { length: 20, width: 1, perimeter: 42, area: 20 })).toEqual({
    onShape: ["Length 20"],
    listed: ["Width 1", "Area 20", "Perimeter 42"]
  });
});

it("keeps every measurement on a typical right triangle", () => {
  expect(draw("rightTriangle", { legA: 3, legB: 4, hypotenuse: 5, perimeter: 12 }).listed).toEqual(
    []
  );
});

it("lists a short leg that is too small for its label", () => {
  const { onShape, listed } = draw("rightTriangle", {
    legA: 20,
    legB: 0.5,
    hypotenuse: 20.01,
    perimeter: 40.51
  });
  expect(listed).toEqual(["Leg B 0.50"]);
  expect(onShape).toContain("Hypotenuse 20.01");
});

it("lists a circle's radius and area when their numbers are too long to fit inside", () => {
  const { listed } = draw("circle", {
    radius: 123456.78,
    diameter: 246913.56,
    circumference: 775701.35,
    area: 47880235965.08
  });
  expect(listed).toEqual(["Radius 123456.78", "Area 47880235965.08"]);
});
