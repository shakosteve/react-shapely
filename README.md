# Shapely: Making Geometry Sassy Again!

Shapely is a playful little geometry calculator. Pick a shape, type in what you know about it, and Shapely works out the rest. Then it draws the shape for you, with every measurement labelled.

**Try it:** https://shakosteve.github.io/react-shapely/

## What it does

Geometry homework often goes like this: "A circle has a radius of 2. What's its area?" Shapely answers that kind of question for three shapes:

| Shape | What you enter | What Shapely works out |
|---|---|---|
| **Circle** | Any **one** of radius, diameter, circumference or area | All the others |
| **Rectangle** | Any **two** of length, width, perimeter or area | All the others |
| **Right triangle** | Any **two** of the two legs, the hypotenuse or the perimeter | All the others |

For example, give Shapely a rectangle's perimeter and area, and it will work out how long and how wide the rectangle must be.

## How to use it

1. **Choose a shape** from the dropdown.
2. **Fill in** the measurements you know. A hint under the buttons says how many you need.
3. **Press Submit** (or Enter). The empty boxes fill in with the answers, rounded to two decimal places.
4. **Watch the drawing.** Above the form, the shape draws itself as if sketched by an invisible pencil, true to its proportions. Then each measurement appears along its edge. If a shape is too thin to hold a label, that label is listed beside the drawing instead.
5. **Press Clear** to start over.

If something doesn't add up, Shapely tells you why. For example, a triangle's hypotenuse has to be its longest side, and some perimeter and area combinations can't make a rectangle.

## Meet the hosts

Two retro characters keep you company on either side of the calculator. Each has a cheeky line for every shape you pick: puns about curves, edges, legs and right angles. That's the "sassy" in *Making Geometry Sassy Again*.

## A few things to know

- **There are no units.** Shapely works the same whether you're thinking in inches, feet or centimetres. Just use the same unit for everything you enter. Lengths come out in that unit, and areas in square units (for example, square inches).
- **It works on phones.** On a small screen, the layout rearranges itself to fit, and number boxes bring up a number keypad.
- **Only positive numbers.** Shapes can't have zero or negative sides.

## For developers

Shapely is a small React and TypeScript web app, built with Vite. To run it on your own computer, you'll need [Node.js](https://nodejs.org/). Then run:

```bash
npm install
npm run dev
```

Then open http://localhost:5173. `npm test` runs the tests, and `npm run build` makes a production build.

Every push to the `master` branch is automatically tested and published to the live site through GitHub Pages.
