import * as React from "react";
import "../styles/App.css";

export interface IRightTriangle {
  lega?: number;
  legb?: number;
  hypotenuse?: number;
  perimeter?: number;
  shapeValidation?: string
}

export interface IState{
  state: IRightTriangle
}

class RightTriangle extends React.Component<IRightTriangle, IState> {
  public render() {
    return (
      <div className="ParameterDiv" id="Triangle">
        <input
          type="number"
          min="1"
          name="lega"
          className="form-control"
          placeholder="Leg A"
          value={this.state.rightTriangle.lega}
        />
        <br />
        <input
          type="number"
          min="1"
          name="legb"
          className="form-control"
          placeholder="Leg B"
          value={this.state.rightTriangle.legb}
        />
        <br />
        <input
          type="number"
          min="1"
          name="hypotenuse"
          className="form-control"
          placeholder="Hypotenuse"
          value={this.state.rightTriangle.hypotenuse}
        />
        <br />
        <input
          type="number"
          min="1"
          name="perimeter"
          className="form-control"
          placeholder="Perimeter"
          value={this.state.rightTriangle.perimeter}
        />
        <br />
      </div>
    );
  }
}

export default RightTriangle;
