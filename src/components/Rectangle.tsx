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
  height?: number; // length is a reserved word
  width?: number;
  perimeter?: number;
  area?: number;
  shapeValidation?: string;
}

const INITIAL_STATE: IState = {
  area: undefined,
  height: undefined,
  perimeter: undefined,
  shapeValidation: "",
  width: undefined
};

class Rectangle extends React.Component<IRectangle, IState> {
  public readonly state: IState = { ...INITIAL_STATE };
  constructor(props: IRectangle, state: IState) {
    super(props);
  }
  public render() {
    return (
      <div className="ParameterDiv" id="Rectangle">
        <input
          type="number"
          min="1"
          name="height"
          className="form-control"
          placeholder="Length"
          value={this.props.height}
        />
        <br />
        <input
          type="number"
          min="1"
          name="width"
          className="form-control"
          placeholder="Width"
          value={this.props.width}
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
        <input
          type="number"
          min="1"
          name="area"
          className="form-control"
          placeholder="Area"
          value={this.props.area}
        />
      </div>
    );
  }
}

export default Rectangle;
