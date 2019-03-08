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

class Rectangle extends React.Component<IRectangle, IState>{
  public render() {
    return (
      <div className="ParameterDiv" id="Rectangle">
        <input
          type="number"
          min="1"
          name="height"
          className="form-control"
          placeholder="Length"
          value={this.state.rectangle.height}
        />
        <br />
        <input
          type="number"
          min="1"
          name="width"
          className="form-control"
          placeholder="Width"
          value={this.state.rectangle.width}
        />
        <br />
        <input
          type="number"
          min="1"
          name="perimeter"
          className="form-control"
          placeholder="Perimeter"
          value={this.state.rectangle.perimeter}
        />
        <br />
        <input
          type="number"
          min="1"
          name="area"
          className="form-control"
          placeholder="Area"
          value={this.state.rectangle.area}
        />
      </div>
    );
  }
}

export default Rectangle;
