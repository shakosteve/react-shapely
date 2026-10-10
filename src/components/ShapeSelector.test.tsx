import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it } from "vitest";
import ShapeSelector from "./ShapeSelector";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => root.render(<ShapeSelector />));
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

const field = (label: string) =>
  ([...container.querySelectorAll("label")].find(l => l.textContent === label)?.control ??
    null) as HTMLInputElement;
const message = () => container.querySelector('[role="status"]')!.textContent;

// React tracks input values itself, so set them through the native setter to trigger onChange.
function change(element: HTMLInputElement | HTMLSelectElement, value: string) {
  const prototype = Object.getPrototypeOf(element);
  Object.getOwnPropertyDescriptor(prototype, "value")!.set!.call(element, value);
  const type = element instanceof HTMLSelectElement ? "change" : "input";
  act(() => element.dispatchEvent(new Event(type, { bubbles: true })));
}

function click(value: string) {
  const button = container.querySelector<HTMLInputElement>(`input[value="${value}"]`)!;
  act(() => button.click());
}

const shapeSelect = () => container.querySelector<HTMLSelectElement>("select")!;

it("fills in a circle's other measurements from its radius", () => {
  change(shapeSelect(), "circle");
  change(field("Radius"), "2");
  expect(field("Radius").value).toBe("2");

  click("Submit");

  expect(field("Diameter").value).toBe("4");
  expect(field("Circumference").value).toBe("12.57");
  expect(field("Area").value).toBe("12.57");
  expect(message()).toBe("Solved!");
});

it("explains why a measurement set has no solution", () => {
  change(shapeSelect(), "rightTriangle");
  change(field("Leg A"), "5");
  change(field("Hypotenuse"), "4");

  click("Submit");

  expect(message()).toBe("The hypotenuse must be longer than either leg");
});

it("rejects non-positive measurements", () => {
  change(shapeSelect(), "rectangle");
  change(field("Length"), "-3");
  change(field("Width"), "2");

  click("Submit");

  expect(message()).toBe("Measurements must be positive numbers");
});

it("clears the shape, its measurements and the message", () => {
  change(shapeSelect(), "rectangle");
  change(field("Length"), "4");
  change(field("Width"), "3");
  click("Submit");

  click("Clear");

  expect(shapeSelect().value).toBe("");
  expect(field("Length")).toBeNull();
  expect(message()).toBe("Choose a shape");

  change(shapeSelect(), "rectangle");
  expect(field("Length").value).toBe("");
});

it("shows two decimal places, except for whole numbers", () => {
  change(shapeSelect(), "rectangle");
  change(field("Length"), "2.5");
  change(field("Width"), "3");

  click("Submit");

  expect(field("Length").value).toBe("2.50");
  expect(field("Width").value).toBe("3");
  expect(field("Perimeter").value).toBe("11");
  expect(field("Area").value).toBe("7.50");
});

it("drops the decimals when a value rounds to a whole number", () => {
  change(shapeSelect(), "circle");
  change(field("Diameter"), "7.999");

  click("Submit");

  expect(field("Diameter").value).toBe("8");
  expect(field("Radius").value).toBe("4");
});
