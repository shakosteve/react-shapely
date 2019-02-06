import * as React from "react";
import "../styles/ShapeParameters.css";

function RightTriangle() {
  return (
    <div className="ParameterDiv">
      <br />
      <textarea id="lega" className="Parameter" placeholder="Leg A" />
      <br />
      <textarea id="legb" className="Parameter" placeholder="Leg B" />
      <br />
      <textarea
        id="hypotenuse"
        className="Parameter"
        placeholder="Hypotenuse"
      />
      <br />
      <textarea id="perimeter" className="Parameter" placeholder="Perimeter" />
      <br />
    </div>
  );
}

export default RightTriangle;
