import * as React from "react";
import "../styles/App.css";

export interface ICircle {
  radius?: number;
  diameter?: number;
  circumference?: number;
  area?: number;
  shapeValidation?: string;
}

export interface IState {
  state: ICircle;
}

function Circle(props: ICircle, state: IState) {
  return (
    <div className="ParameterDiv" id="Circle">
      <input
        type="number"
        min="1"
        name="radius"
        className="form-control"
        placeholder="Radius"
        value={props.radius}
      />
      <br />
      <input
        type="number"
        min="1"
        name="diameter"
        className="form-control"
        placeholder="Diameter"
        value={props.diameter}
      />
      <br />
      <input
        type="number"
        min="1"
        name="circumference"
        className="form-control"
        placeholder="Circumference"
        value={props.circumference}
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
      <br />
    </div>
  );
}

export default Circle;
