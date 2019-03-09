import * as React from "react";
import "../styles/App.css";

export interface IRightTriangle {
  lega?: number;
  legb?: number;
  hypotenuse?: number;
  perimeter?: number;
  shapeValidation?: string;
}

export interface IState {
  lega?: number;
  legb?: number;
  hypotenuse?: number;
  perimeter?: number;
  shapeValidation?: string;
}

const INITIAL_STATE: IRightTriangle = {
  hypotenuse: undefined,
  lega: undefined,
  legb: undefined,
  perimeter: undefined,
  shapeValidation: ''
};
class RightTriangle extends React.Component<IRightTriangle, IState> {
  public readonly state: IState = { ...INITIAL_STATE };
  constructor(props: IRightTriangle, state: IState) {
    super(props);
  }
  public render() {
    return (
      <div className="ParameterDiv" id="Triangle">
        <input
          type="number"
          min="1"
          name="lega"
          className="form-control"
          placeholder="Leg A"
          value={this.props.lega}
        />
        <br />
        <input
          type="number"
          min="1"
          name="legb"
          className="form-control"
          placeholder="Leg B"
          value={this.props.legb}
        />
        <br />
        <input
          type="number"
          min="1"
          name="hypotenuse"
          className="form-control"
          placeholder="Hypotenuse"
          value={this.props.hypotenuse}
        />
        <br />
        <input
          type="number"
          min="1"
          name="perimeter"
          className="form-control"
          placeholder="Perimeter"
          value={this.props.perimeter}
        />
        <br />
      </div>
    );
  }
}

export default RightTriangle;
