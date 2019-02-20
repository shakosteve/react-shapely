import * as React from "react";
import "../styles/ShapeSelector.css";
// import Circle from "./Circle";
import NoShape from "./NoShape";

interface IProps {
  selectedShape: string;
  defaultShape: string;
}

interface IState {
  selectedShape: string;
  defaultShape: string;
}

let defaultShape = <NoShape />;

function handleOnChange() {
  defaultShape = <NoShape />;
}

class ShapeSelector extends React.Component<any, IState> {
  constructor(props: IProps, state: IState) {
    super(props, state);
    this.state = {
      defaultShape: props.defaultShape,
      selectedShape: props.selectedShape
    };
  }

  public render() {
    this.setState = () => {
      return defaultShape;
    };
    return (
      <div className="ShapeSelector">
        <form>
          <select
            defaultValue=""
            className="custom-select custom-select-bg"
            onChange={handleOnChange}
          >
            <option value="" disabled={true} hidden={true}>
              Choose a shape
            </option>
            <option value="Rectangle">Rectangle</option>
            <option value="Cicle">Circle</option>
            <option value="Triangle">Triangle</option>
          </select>
          {this.state.selectedShape}
          <input type="button" className="btn btn-dark" value="Submit" />{" "}
          <input type="button" className="btn btn-dark" value="Clear" />
          <div className="ShapeValidation">
            <label id="ShapeValidationMessage">shape validation</label>
          </div>
        </form>
      </div>
    );
  }
}

export default ShapeSelector;
