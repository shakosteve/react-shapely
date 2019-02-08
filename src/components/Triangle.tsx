import * as React from "react";
import "../styles/ShapeParameters.css";

function RightTriangle() {
  return (
    <div className="ParameterDiv">
      <input
        type="number"
        min="1"
        name="lega"
        className="Parameter"
        placeholder="Leg A"
      />
      <br />
      <input
        type="number"
        min="1"
        name="legb"
        className="Parameter"
        placeholder="Leg B"
      />
      <br />
      <input
        type="number"
        min="1"
        name="hypotenuse"
        className="Parameter"
        placeholder="Hypotenuse"
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
    </div>
  );
}

export default RightTriangle;
