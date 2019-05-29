import * as React from "react";
import "../styles/App.css";
import Circle from "./Circle";
import Rectangle from "./Rectangle";
import RightTriangle from "./RightTriangle";

interface IProps {
  selectedShape?: keyof (typeof shapes);
  validationMessage?: string;
}
interface IState {
  selectedShape?: keyof (typeof shapes);
  isValid: boolean;
  validationMessage?: string;
}

const shapes = {
  circle: <Circle />,
  noShape: <div className="NoShape" />,
  rectangle: <Rectangle />,
  rightTriangle: <RightTriangle />
};

const INITIAL_STATE: IState = {
  isValid: false,
  selectedShape: "noShape",
  validationMessage: "Choose a shape"
};

class ShapeSelector extends React.Component<IProps, IState> {
  public readonly state: IState = { ...INITIAL_STATE };
  constructor(props: IProps, state: IState) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.resetShapeSelection = this.resetShapeSelection.bind(this);
    this.isValidated = this.isValidated.bind(this);
  }

  public render() {
    return (
      <div className="ShapeSelector">
        <form>
          <select
            id="shapeSelector"
            defaultValue=""
            className="custom-select custom-select-bg"
            onChange={this.handleOnChange}
          >
            <option value="" disabled={true} hidden={true}>
              Choose a shape
            </option>
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
            <option value="rightTriangle">Right Triangle</option>
          </select>
          {shapes[this.state.selectedShape || "noShape"]}
          <input
            type="button"
            className="btn btn-dark"
            value="Submit"
            onClick={this.isValidated}
          />{" "}
          <input
            type="reset"
            className="btn btn-dark"
            value="Clear"
            onClick={this.resetShapeSelection}
          />
          <div className="ShapeValidation">
            <label id="ShapeValidationMessage">
              {this.state.validationMessage}
            </label>
          </div>
        </form>
      </div>
    );
  }

  private isValidated = () => {
    this.state.selectedShape !== "noShape"
      ? this.setState({ validationMessage: "Validated" })
      : this.setState({ validationMessage: "Not Validated" });
  };

  private resetShapeSelection = () => {
    this.setState(INITIAL_STATE);
  };

  private handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "rectangle": {
        this.setState({
          selectedShape: "rectangle"
        });
        break;
      }
      case "circle": {
        this.setState({
          selectedShape: "circle"
        });
        break;
      }
      case "rightTriangle": {
        this.setState({
          selectedShape: "rightTriangle"
        });
        break;
      }
    }
  };
}

export default ShapeSelector;
