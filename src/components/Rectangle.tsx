import * as React from "react";
import "../styles/App.css";

export interface IRectangle {
  height?: number; // length is a reserved word
  width?: number;
  perimeter?: number;
  area?: number;
  shapeValidation?: string;
}

export interface IState {
  rectangle: IRectangle;
}

function Rectangle(props: IRectangle, state: IState) {
  return (
    <div className="ParameterDiv" id="Rectangle">
      <input
        type="number"
        min="1"
        name="length"
        className="form-control"
        placeholder="Length"
        value={props.height}
      />
      <br />
      <input
        type="number"
        min="1"
        name="width"
        className="form-control"
        placeholder="Width"
        value={props.width}
      />
      <br />
      <input
        type="number"
        min="1"
        name="perimeter"
        className="form-control"
        placeholder="Perimeter"
        value={props.perimeter}
      />
      <br />
      <input
        type="number"
        min="1"
        name="area"
        className="form-control"
        placeholder="Area"
        value={props.area}
      />
    </div>
  );
}

export default Rectangle;
