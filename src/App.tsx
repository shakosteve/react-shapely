import { useState } from "react";
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

function App() {
  const [selectedShape, setSelectedShape] = useState<ShapeKey | "">("");

  return (
    <div className="App">
      <div className="AppComponentStyle">
        <div className="RetroMan">
          <img className="RetroManImage" src={RetroManImage} />
          "{retroManLines[selectedShape]}"
    </div>
        <ShapeSelector onShapeChange={setSelectedShape} />

        <div className="RetroWoman">
          "{retroWomanLines[selectedShape]}"
      <img className="RetroWomanImage" src={RetroWomanImage} />
        </div>
      </div>
    </div>
  );
}

export default App;
