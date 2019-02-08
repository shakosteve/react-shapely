import * as React from "react";
import "../styles/ShapeParameters.css";

function Rectangle() {
  return (
    <div className="ParameterDiv">
      <input
        type="number"
        min="1"
        name="length"
        className="Parameter"
        placeholder="Length"
      />
      <br />
      <input
        type="number"
        min="1"
        name="width"
        className="Parameter"
        placeholder="Width"
      />
      <br />
      <input
        type="number"
        min="1"
        name="perimeter"
        className="Parameter"
        placeholder="Perimeter"
      />
      <br />
      <input
        type="number"
        min="1"
        name="area"
        className="Parameter"
        placeholder="Area"
      />
    </div>
  );
}

export default Rectangle;
