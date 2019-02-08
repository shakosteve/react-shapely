import * as React from "react";
import "../styles/ShapeParameters.css";

function Circle() {
  return (
    <div className="ParameterDiv">
      <input
        type="number"
        min="1"
        name="radius"
        className="Parameter"
        placeholder="Radius"
      />
      <br />
      <input
        type="number"
        min="1"
        name="diameter"
        className="Parameter"
        placeholder="Diameter"
      />
      <br />
      <input
        type="number"
        min="1"
        name="circumference"
        className="Parameter"
        placeholder="Circumference"
      />
      <br />
      <input
        type="number"
        min="1"
        name="area"
        className="Parameter"
        placeholder="Area"
      />
      <br />
    </div>
  );
}

export default Circle;
