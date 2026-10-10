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
