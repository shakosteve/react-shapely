# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev            # Vite dev server at http://localhost:5173 (also: npm start)
npm run build          # tsc -b (type-check) then vite build → dist/
npm run lint           # oxlint
npm test               # vitest in watch mode
npx vitest run         # all tests once
npx vitest run src/geometry/geometry.test.ts      # one file
npx vitest run -t "lists a short leg"             # tests whose name matches
npx tsc -b             # type-check only
```

CI (`.github/workflows/deploy.yml`) runs lint, `vitest run` and build on every push to `master`, then publishes `dist/` to GitHub Pages at https://shakosteve.github.io/react-shapely/. That's why `vite.config.ts` sets `base: '/react-shapely/'` for builds only; the dev server stays at `/`. If the repo name or domain changes, update `base` to match.

## Stack notes

- React 19, Vite 8, Vitest 5 with jsdom, oxlint.
- TypeScript is pinned to `~6.0` on purpose. The 7.x native compiler isn't supported by the surrounding tooling yet; this matches Vite's own react-ts template.
- `tsconfig.app.json` is strict and sets `erasableSyntaxOnly` (no enums or parameter properties) and `noUnusedParameters`.
- Use React 19 event types: `SubmitEvent`, not the deprecated `FormEvent`.
- Bootstrap 4 CSS and the Tangerine Google font are loaded from CDNs in `index.html`, not npm. The "Making Geometry Sassy Again!" title is also in `index.html`, outside React.

## Architecture

The app solves a shape from partial measurements, then draws it.

**Geometry (`src/geometry/`)** is pure and has no React.
- Each shape has a solver (`solveCircle`, `solveRectangle`, `solveRightTriangle`). A solver takes whichever measurements were entered, as `Partial<Record<Field, number>>`, and returns `{ ok: true, values }` with every measurement filled in, or `{ ok: false, message }` with a user-facing reason.
- If more measurements are given than needed, the solver uses the first workable combination and ignores the rest.
- `geometry/index.ts` holds the `shapes` registry: label, hint, field list and solver for each shape. `ShapeKey` comes from its keys.
- The form fields and the `<select>` options are generated from this registry.

**Form (`src/components/ShapeSelector.tsx`)** owns all form state.
- Input values are kept as **strings**, and parsed and validated (positive numbers only) on Submit. The form uses `noValidate`, so the app's messages replace the browser's.
- Results are written back into the inputs, formatted by `src/format.ts`: two decimal places, but whole numbers stay whole.
- It reports to `App` through two callbacks:
  - `onShapeChange` fires on select and on Clear.
  - `onSolve` fires with the solved values, or with `null` on failure.

**App (`src/App.tsx`)**
- Tracks the selected shape, which picks the retro man's and woman's lines from `Record<ShapeKey | "", string>` maps. `""` means no shape is selected.
- Tracks the last successful solve, which feeds `ShapeDrawing`. Each solve gets a new `id`, used as the React `key`, so the drawing remounts and its CSS animation replays.
- Changing shape, Clear or a failed Submit removes the drawing.
- `.ShapeStage` always reserves the drawing's space, so the layout doesn't jump when a drawing appears.

**Drawing (`src/components/ShapeDrawing.tsx`)** is an SVG in a fixed 360×220 viewBox.
- Each shape has a layout function that scales the shape to its true proportions within a box. It returns the outline path, any detail paths, and a list of labels, each marked with whether it `fits` where it belongs.
- `layOut()` moves labels that don't fit into a list on the right. It narrows the box to make room for the list and repeats until the set of listed labels stops growing.
- Whether a label fits is estimated from its character count (`CHAR_WIDTH`), not measured in the DOM.
- The pencil animation is pure CSS in `src/styles/App.css`. Paths use `pathLength={1}` with a dash offset animation.
  - `.DrawStroke` is the outline.
  - `.DrawDetail` draws after the outline: the circle's radius line and the triangle's right-angle mark.
  - `.ShapeLabel` and `.DrawLabel` fade in last.
  - A `prefers-reduced-motion` rule turns the animation off.

**Adding a shape** touches all of these:
- a solver and an entry in the `shapes` registry;
- a layout function in `ShapeDrawing.tsx`;
- both line maps in `App.tsx`.

Because the maps are typed `Record<ShapeKey | ...>`, a missing entry is a type error.

## Styling and responsive layout

All styles are in `src/index.css`, which covers the page shell, vertical centering and title, and `src/styles/App.css`. There are two breakpoints:
- **≤1060px:** the form's side margins tighten so all three columns fit.
- **≤760px:** phone layout. The two characters sit side by side above a full-width form.
  - Inputs and the select use 16px text so iOS doesn't zoom in on focus.
  - The fields area loses its fixed height.

Each field's name ("Leg A" and so on) is a real `<label>` laid over the left of its input, so it stays visible after a value is entered. Values are right-aligned.

## Tests

The tests use React's `act` and `createRoot` directly; there's no Testing Library.
- Set `globalThis.IS_REACT_ACT_ENVIRONMENT = true` in each component test file.
- To change a controlled input, call the native value setter (`Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set`), then dispatch an `input` event. For a `<select>`, dispatch a `change` event.
- The render container must be attached to `document.body`, or jsdom won't submit the form.
- Component tests find fields through their visible `<label>` text (`label.control`).
