import * as React from "react";
import "../styles/App.css";

export interface IRectangle {
  lega?: number;
  legb?: number;
  hypotenuse?: number;
  perimeter?: number;
  shapeValidation?: string
}

export interface IState{
  state: IRectangle
}

function RightTriangle(props: IRectangle, state: IState) {
  return (
    <div className="ParameterDiv" id="Triangle">
      <input
        type="number"
        min="1"
        name="lega"
        className="form-control"
        placeholder="Leg A"
        value={props.lega}
      />
      <br />
      <input
        type="number"
        min="1"
        name="legb"
        className="form-control"
        placeholder="Leg B"
        value={props.legb}
      />
      <br />
      <input
        type="number"
        min="1"
        name="hypotenuse"
        className="form-control"
        placeholder="Hypotenuse"
        value={props.hypotenuse}
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
    </div>
  );
}

export default RightTriangle;
