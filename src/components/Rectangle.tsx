import * as React from "react";
import "../styles/ShapeParameters.css";

function Rectangle() {
  return (
    <div className="ParameterDiv">
      <br />
      <textarea id="length" className="Parameter" placeholder="Length" />
      <br />
      <textarea id="width" className="Parameter" placeholder="Width" />
      <br />
      <textarea id="perimeter" className="Parameter" placeholder="Perimeter" />
      <br />
      <textarea id="area" className="Parameter" placeholder="Area" />
    </div>
  );
}

export default Rectangle;
