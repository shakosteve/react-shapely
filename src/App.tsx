import { useState } from "react";
import ShapeDrawing from "./components/ShapeDrawing";
import ShapeSelector from './components/ShapeSelector';
import type { ShapeKey } from "./geometry";
import "./styles/App.css";
import RetroWomanImage from "./images/retrowoman.svg";
import RetroManImage from "./images/retroman.svg";

const retroManLines: Record<ShapeKey | "", string> = {
  "": "Pick a shape, any shape.",
  rightTriangle: "I may be obtuse, but I know a right angle when I see one.",
  circle: "Show me your circumference and I will show you my radius",
  rectangle: "You've got all the right angles."
};

const retroWomanLines: Record<ShapeKey | "", string> = {
  "": "Which shape is your favorite?",
  rightTriangle: "Did you know triangles have legs too?",
  circle: "You're going to like these curves.",
  rectangle: "I didn't know you were so edgy."
};

interface Drawing {
  shape: ShapeKey;
  values: Record<string, number>;
  // Changes on every solve so the drawing remounts and its animation replays.
  id: number;
}

function App() {
  const [selectedShape, setSelectedShape] = useState<ShapeKey | "">("");
  const [drawing, setDrawing] = useState<Drawing | null>(null);

  const handleShapeChange = (shape: ShapeKey | "") => {
    setSelectedShape(shape);
    setDrawing(null);
  };

  const handleSolve = (values: Record<string, number> | null) => {
    setDrawing(previous =>
      values && selectedShape !== ""
        ? { shape: selectedShape, values, id: (previous?.id ?? 0) + 1 }
        : null
    );
  };

  return (
    <div className="App">
      {/* Always present, so the layout doesn't jump when a drawing appears */}
      <div className="ShapeStage">
        {drawing && <ShapeDrawing key={drawing.id} shape={drawing.shape} values={drawing.values} />}
      </div>
      <div className="AppComponentStyle">
        <div className="RetroMan">
          <img className="RetroManImage" src={RetroManImage} />
          "{retroManLines[selectedShape]}"
    </div>
        <ShapeSelector onShapeChange={handleShapeChange} onSolve={handleSolve} />

        <div className="RetroWoman">
          "{retroWomanLines[selectedShape]}"
      <img className="RetroWomanImage" src={RetroWomanImage} />
        </div>
      </div>
    </div>
  );
}

export default App;
