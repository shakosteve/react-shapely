import * as React from "react";
import "../styles/ShapeSelector.css";
import Circle from "./Circle";
// import Rectangle from './Rectangle';
// import RightTriangle from "./RightTriangle";

class ShapeSelector extends React.Component {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = { selectedShape: "" };
  }

  public render() {
    return (
      <div className="ShapeSelector">
        <form>
          <select defaultValue="" className="custom-select custom-select-bg">
            <option value="" disabled={true} hidden={true}>
              Choose a shape
            </option>
            <option value="Rectangle">Rectangle</option>
            <option value="Cicle">Circle</option>
            <option value="Triangle">Triangle</option>
          </select>
          <Circle />
          <input type="button" className="btn btn-dark" value="Submit" />{" "}
          <input type="button" className="btn btn-dark" value="Clear" />
          <div className="ShapeValidation"><label>shape validation</label></div>
        </form>
      </div>
    );
  }
}

export default ShapeSelector;
