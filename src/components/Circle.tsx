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
  circle: ICircle;
}

class Circle extends React.Component<{}, IState> {
  public render() {
    return (
      <div className="ParameterDiv" id="Circle">
        <input
          type="number"
          min="1"
          name="radius"
          className="form-control"
          placeholder="Radius"
          value={this.state.circle.radius}
        />
        <br />
        <input
          type="number"
          min="1"
          name="diameter"
          className="form-control"
          placeholder="Diameter"
          value={this.state.circle.diameter}
        />
        <br />
        <input
          type="number"
          min="1"
          name="circumference"
          className="form-control"
          placeholder="Circumference"
          value={this.state.circle.circumference}
        />
        <br />
        <input
          type="number"
          min="1"
          name="area"
          className="form-control"
          placeholder="Area"
          value={this.state.circle.area}
        />
        <br />
      </div>
    );
  }
}

export default Circle;
