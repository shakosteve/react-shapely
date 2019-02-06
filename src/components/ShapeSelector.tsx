import * as React from "react";
import "../styles/ShapeSelector.css";
import Circle from "./Circle";
// import Rectangle from "./Rectangle";
// import RightTriangle from "./RightTriangle";

function ShapeSelector() {
  return (
    <div className="ShapeSelector">
      <select className="Selection">
        <option value="" disabled={true} selected={true} hidden={true}>
          Choose a shape
        </option>
        <option value="Rectangle">Rectangle</option>
        <option value="Cicle">Circle</option>
        <option value="Triangle">Triangle</option>
      </select>
      <Circle />
    </div>
  );
}

export default ShapeSelector;
