import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { expect, it } from 'vitest';
import App from './App';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  act(() => root.render(<App />));
  act(() => root.unmount());
});

it("changes the retro man's and woman's lines to match the chosen shape", () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  act(() => root.render(<App />));
  const lines = () => [
    div.querySelector('.RetroMan')!.textContent,
    div.querySelector('.RetroWoman')!.textContent
  ];
  const select = div.querySelector('select')!;
  const choose = (shape: string) => {
    select.value = shape;
    act(() => select.dispatchEvent(new Event('change', { bubbles: true })));
  };
  const noShape = ['"Pick a shape, any shape."', '"Which shape is your favorite?"'];

  expect(lines()).toEqual(noShape);
  choose('circle');
  expect(lines()).toEqual([
    '"Show me your circumference and I will show you my radius"',
    `"You're going to like these curves."`
  ]);
  choose('rectangle');
  expect(lines()).toEqual([`"You've got all the right angles."`, `"I didn't know you were so edgy."`]);
  choose('rightTriangle');
  expect(lines()).toEqual([
    '"I may be obtuse, but I know a right angle when I see one."',
    '"Did you know triangles have legs too?"'
  ]);

  act(() => div.querySelector<HTMLInputElement>('input[value="Clear"]')!.click());
  expect(lines()).toEqual(noShape);

  act(() => root.unmount());
});

it('draws the solved shape, and removes the drawing when it no longer applies', () => {
  const div = document.createElement('div');
  // Forms only submit when they're in the document
  document.body.appendChild(div);
  const root = createRoot(div);
  act(() => root.render(<App />));
  const drawing = () => div.querySelector('svg.ShapeDrawing');
  const select = div.querySelector('select')!;
  const choose = (shape: string) => {
    select.value = shape;
    act(() => select.dispatchEvent(new Event('change', { bubbles: true })));
  };
  const type = (name: string, value: string) => {
    const input = div.querySelector<HTMLInputElement>(`input[name="${name}"]`)!;
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, value);
    act(() => input.dispatchEvent(new Event('input', { bubbles: true })));
  };
  const click = (value: string) =>
    act(() => div.querySelector<HTMLInputElement>(`input[value="${value}"]`)!.click());

  expect(drawing()).toBeNull();

  choose('rectangle');
  type('length', '4');
  type('width', '3');
  click('Submit');
  expect(drawing()!.getAttribute('aria-label')).toBe(
    'Rectangle: Length 4, Width 3, Perimeter 14, Area 12'
  );
  const labels = [...drawing()!.querySelectorAll('text')].map(t => t.textContent);
  expect(labels).toEqual(['Length 4', 'Width 3', 'Area 12', 'Perimeter 14']);

  type('width', '-1');
  click('Submit');
  expect(drawing()).toBeNull();

  choose('rightTriangle');
  type('legA', '3');
  type('legB', '4');
  click('Submit');
  expect(drawing()!.getAttribute('aria-label')).toBe(
    'Right Triangle: Leg A 3, Leg B 4, Hypotenuse 5, Perimeter 12'
  );

  choose('circle');
  expect(drawing()).toBeNull();

  type('radius', '2');
  click('Submit');
  expect(drawing()).not.toBeNull();
  click('Clear');
  expect(drawing()).toBeNull();

  act(() => root.unmount());
  div.remove();
});
