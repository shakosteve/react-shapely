import * as React from "react";
import "../styles/ShapeParameters.css";

export interface IProps {
  lega?: number;
  legb?: number;
  hypotenuse?: number;
  perimeter?: number;
  shapeValidation: string
}

function RightTriangle() {
  return (
    <div className="ParameterDiv">
      <input
        type="number"
        min="1"
        name="lega"
        className="form-control"
        placeholder="Leg A"
      />
      <br />
      <input
        type="number"
        min="1"
        name="legb"
        className="form-control"
        placeholder="Leg B"
      />
      <br />
      <input
        type="number"
        min="1"
        name="hypotenuse"
        className="form-control"
        placeholder="Hypotenuse"
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
    </div>
  );
}

export default RightTriangle;
