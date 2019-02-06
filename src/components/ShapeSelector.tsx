import * as React from "react";
import "../styles/ShapeSelector.css";
import Rectangle from "./Rectangle";

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
      <Rectangle />
    </div>
  );
}

export default ShapeSelector;
