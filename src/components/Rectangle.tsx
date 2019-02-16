import * as React from "react";
import "../styles/ShapeParameters.css";

export interface IProps {
  length?: number;
  width?: number;
  perimeter?: number;
  area?: number;
  shapeValidation: string
}

function Rectangle() {
  return (
    <div className="ParameterDiv">
      <input
        type="number"
        min="1"
        name="length"
        className="form-control"
        placeholder="Length"
      />
      <br />
      <input
        type="number"
        min="1"
        name="width"
        className="form-control"
        placeholder="Width"
      />
      <br />
      <input
        type="number"
        min="1"
        name="perimeter"
        className="form-control"
        placeholder="Perimeter"
      />
      <br />
      <input
        type="number"
        min="1"
        name="area"
        className="form-control"
        placeholder="Area"
      />
    </div>
  );
}

export default Rectangle;
