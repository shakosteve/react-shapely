import { format } from "../format";
import { shapes, type ShapeKey } from "../geometry";
import "../styles/App.css";

interface Props {
  shape: ShapeKey;
  values: Record<string, number>;
}

type Values = Record<string, number>;

// Drawing area in SVG units; the SVG scales to fit its container.
const VIEW_WIDTH = 360;
const VIEW_HEIGHT = 220;
// Room around the shape for the edge labels, plus a caption line below it.
const PAD = { top: 28, right: 44, bottom: 52, left: 44 };

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

const BOX: Box = {
  x: PAD.left,
  y: PAD.top,
  width: VIEW_WIDTH - PAD.left - PAD.right,
  height: VIEW_HEIGHT - PAD.top - PAD.bottom
};

// Label metrics for the 13px label font, close enough to decide what fits where.
const CHAR_WIDTH = 6.6;
const LINE_HEIGHT = 18;
const textWidth = (text: string) => text.length * CHAR_WIDTH;

// Space between the shape and the list of measurements that don't fit on it.
const LIST_GAP = 20;

// Scale a width × height shape to fit the box, keeping its true proportions, and center it.
function fit(width: number, height: number, box: Box) {
  const scale = Math.min(box.width / width, box.height / height);
  const w = width * scale;
  const h = height * scale;
  return { x: box.x + (box.width - w) / 2, y: box.y + (box.height - h) / 2, w, h };
}

interface PlacedLabel {
  text: string;
  // False when the shape is too small to hold the label where it belongs; it goes in the list.
  fits: boolean;
  x: number;
  y: number;
  rotate?: number;
  baseline?: "middle" | "auto";
}

interface Layout {
  outline: string;
  details: string[];
  dot?: { x: number; y: number };
  labels: PlacedLabel[];
  // Horizontal extent of the shape and its edge labels, for placing the list beside it.
  left: number;
  right: number;
}

function rectangleLayout(values: Values, box: Box): Layout {
  const { x, y, w, h } = fit(values.length, values.width, box);
  const length = `Length ${format(values.length)}`;
  const width = `Width ${format(values.width)}`;
  const area = `Area ${format(values.area)}`;
  const perimeter = `Perimeter ${format(values.perimeter)}`;
  // Area and Perimeter are stacked in the middle, so both need room inside.
  const insideFits =
    Math.max(textWidth(area), textWidth(perimeter)) <= w - 12 && h >= 2 * LINE_HEIGHT + 4;
  const widthFits = textWidth(width) <= h + 16;

  return {
    outline: `M ${x} ${y} h ${w} v ${h} h ${-w} Z`,
    details: [],
    labels: [
      { text: length, fits: textWidth(length) <= w + 16, x: x + w / 2, y: y + h + 18 },
      { text: width, fits: widthFits, x: x + w + 12, y: y + h / 2, rotate: 90, baseline: "middle" },
      { text: area, fits: insideFits, x: x + w / 2, y: y + h / 2 - 9, baseline: "middle" },
      { text: perimeter, fits: insideFits, x: x + w / 2, y: y + h / 2 + 9, baseline: "middle" }
    ],
    left: x,
    right: x + w + (widthFits ? 20 : 0)
  };
}

function circleLayout(values: Values, box: Box): Layout {
  const r = Math.min(box.width, box.height) / 2;
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  const radius = `Radius ${format(values.radius)}`;
  const area = `Area ${format(values.area)}`;
  // Area sits below the center; it has to fit across the circle at the bottom of its text.
  const areaBottom = 30;
  const chord = r > areaBottom ? 2 * Math.sqrt(r * r - areaBottom * areaBottom) : 0;

  return {
    // Two half-circle arcs, starting at the left and going clockwise over the top
    outline: `M ${cx - r} ${cy} a ${r} ${r} 0 1 1 ${2 * r} 0 a ${r} ${r} 0 1 1 ${-2 * r} 0`,
    details: [`M ${cx} ${cy} h ${r}`],
    dot: { x: cx, y: cy },
    labels: [
      { text: radius, fits: textWidth(radius) <= r - 6, x: cx + r / 2, y: cy - 6 },
      { text: area, fits: textWidth(area) <= chord - 10, x: cx, y: cy + 24 },
      {
        text: `Circumference ${format(values.circumference)}`,
        fits: true,
        x: cx,
        y: cy - r - 8
      },
      { text: `Diameter ${format(values.diameter)}`, fits: true, x: cx, y: cy + r + 22 }
    ],
    left: cx - r,
    right: cx + r
  };
}

function rightTriangleLayout(values: Values, box: Box): Layout {
  // Leg A along the bottom, Leg B up the left side, right angle at the bottom left.
  const { x, y, w, h } = fit(values.legA, values.legB, box);
  const bottom = y + h;
  const mark = Math.min(10, w / 3, h / 3);
  const legA = `Leg A ${format(values.legA)}`;
  const legB = `Leg B ${format(values.legB)}`;
  const hypotenuse = `Hypotenuse ${format(values.hypotenuse)}`;
  const legBFits = textWidth(legB) <= h + 10;

  // Hypotenuse label: centered on the edge, pushed outward, and rotated to run along it.
  const length = Math.hypot(w, h);
  const offset = 6;

  return {
    outline: `M ${x} ${y} L ${x} ${bottom} L ${x + w} ${bottom} Z`,
    details: [`M ${x} ${bottom - mark} h ${mark} v ${mark}`],
    labels: [
      { text: legA, fits: textWidth(legA) <= w + 10, x: x + w / 2, y: bottom + 18 },
      { text: legB, fits: legBFits, x: x - 12, y: y + h / 2, rotate: -90, baseline: "middle" },
      {
        text: hypotenuse,
        fits: textWidth(hypotenuse) <= length - 10,
        x: x + w / 2 + (h / length) * offset,
        y: y + h / 2 - (w / length) * offset,
        rotate: (Math.atan2(h, w) * 180) / Math.PI
      },
      { text: `Perimeter ${format(values.perimeter)}`, fits: true, x: x + w / 2, y: bottom + 38 }
    ],
    left: x - (legBFits ? 22 : 0),
    right: x + w
  };
}

const layouts = {
  rectangle: rectangleLayout,
  circle: circleLayout,
  rightTriangle: rightTriangleLayout
};

/**
 * Lays the shape out in the full box. If some labels don't fit, the shape is narrowed to make
 * room for a list of them on the right. A smaller shape may push more labels into the list, so
 * repeat until the list stops growing.
 */
function layOut(shape: ShapeKey, values: Values) {
  let layout = layouts[shape](values, BOX);
  let listedCount = 0;
  for (;;) {
    const listed = layout.labels.filter(label => !label.fits);
    if (listed.length === listedCount) {
      return layout;
    }
    listedCount = listed.length;
    const listWidth = Math.max(...listed.map(label => textWidth(label.text)));
    const width = Math.max(BOX.width - listWidth - LIST_GAP, 40);
    layout = layouts[shape](values, { ...BOX, width });
  }
}

function ShapeDrawing({ shape, values }: Props) {
  const layout = layOut(shape, values);
  const placed = layout.labels.filter(label => label.fits);
  const listed = layout.labels.filter(label => !label.fits);

  // Center the shape together with its list.
  const listX = layout.right + LIST_GAP;
  const listWidth = Math.max(0, ...listed.map(label => textWidth(label.text)));
  const shift = listed.length
    ? (VIEW_WIDTH - (listX + listWidth - layout.left)) / 2 - layout.left
    : 0;
  const listTop = BOX.y + BOX.height / 2 - ((listed.length - 1) * LINE_HEIGHT) / 2;

  const description = shapes[shape].fields
    .map(field => `${field.label} ${format(values[field.name])}`)
    .join(", ");

  return (
    <svg
      className="ShapeDrawing"
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      role="img"
      aria-label={`${shapes[shape].label}: ${description}`}
    >
      <g transform={shift ? `translate(${shift} 0)` : undefined}>
        {/* pathLength="1" lets the CSS draw any path from 0 to 1 regardless of its real length */}
        <path className="DrawStroke" d={layout.outline} pathLength={1} />
        {layout.details.map(d => (
          <path key={d} className="DrawDetail" d={d} pathLength={1} />
        ))}
        {layout.dot && <circle className="DrawLabel" cx={layout.dot.x} cy={layout.dot.y} r={2.5} />}
        {placed.map(({ text, x, y, rotate, baseline = "auto" }) => (
          <text
            key={text}
            className="ShapeLabel"
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline={baseline}
            transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
          >
            {text}
          </text>
        ))}
        {listed.map(({ text }, i) => (
          <text
            key={text}
            className="ShapeLabel ShapeListItem"
            x={listX}
            y={listTop + i * LINE_HEIGHT}
            textAnchor="start"
            dominantBaseline="middle"
          >
            {text}
          </text>
        ))}
      </g>
    </svg>
  );
}

export default ShapeDrawing;
