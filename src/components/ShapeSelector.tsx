import * as React from "react";
import "../styles/ShapeSelector.css";
import Circle from "./Circle";
// import Rectangle from "./Rectangle";
// import RightTriangle from "./RightTriangle";

function ShapeSelector() {
  return (
    <div className="ShapeSelector">
      <form>
        <select className="Selection">
          <option value="" disabled={true} selected={true} hidden={true}>
            Choose a shape
          </option>
          <option value="Rectangle">Rectangle</option>
          <option value="Cicle">Circle</option>
          <option value="Triangle">Triangle</option>
        </select>
        <Circle />
        <input type="button" className="btn btn-dark" value="Submit" />{" "}
        <input type="button" className="btn btn-dark" value="Clear" />
      </form>
    </div>
  );
}

export default ShapeSelector;
