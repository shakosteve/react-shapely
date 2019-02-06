import * as React from "react";
import "../styles/ShapeParameters.css";

function Rectangle() {
  return (
    <div className="ParameterDiv">
      <br />
      <textarea className="Parameter" placeholder="Length" />
      <br />
      <textarea className="Parameter" placeholder="Width" />
      <br />
      <textarea className="Parameter" placeholder="Perimeter" />
      <br />
      <textarea className="Parameter" placeholder="Area" />
    </div>
  );
}

export default Rectangle;
