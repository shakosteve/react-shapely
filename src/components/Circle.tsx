import * as React from "react";
import "../styles/ShapeParameters.css";

function Circle() {
  return (
    <div className="ParameterDiv">
      <br />
      <textarea id="radius" className="Parameter" placeholder="Radius" />
      <br />
      <textarea id="diameter" className="Parameter" placeholder="Diameter" />
      <br />
      <textarea
        id="circumference"
        className="Parameter"
        placeholder="Circumference"
      />
      <br />
      <textarea id="area" className="Parameter" placeholder="Area" />
      <br />
    </div>
  );
}

export default Circle;
