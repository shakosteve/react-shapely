import * as React from "react";
import "../styles/ShapeParameters.css";

export interface IProps {
  radius?: number;
  diameter?: number;
  circumference?: number;
  area?: number;
  shapeValidation?: string
}


function Circle() {
  return (
    <div className="ParameterDiv">
      <input
        type="number"
        min="1"
        name="radius"
        className="form-control"
        placeholder="Radius"
      />
      <br />
      <input
        type="number"
        min="1"
        name="diameter"
        className="form-control"
        placeholder="Diameter"
      />
      <br />
      <input
        type="number"
        min="1"
        name="circumference"
        className="form-control"
        placeholder="Circumference"
      />
      <br />
      <input
        type="number"
        min="1"
        name="area"
        className="form-control"
        placeholder="Area"
      />
      <br />
    </div>
  );
}

export default Circle;
