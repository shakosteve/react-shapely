import * as React from "react";
import "../styles/App.css";
import Circle from "./Circle";
import Rectangle from "./Rectangle";
import RightTriangle from "./RightTriangle";

interface IState {
  selectedShape?: keyof(typeof shapes);
}

const shapes = {
  circle: <Circle />,  
  noShape: <div className="NoShape" id="NoShape" />,
  rectangle: <Rectangle />,
  rightTriangle: <RightTriangle />  
};

interface IProps {
  selectedShape?: keyof(typeof shapes);
}

const INITIAL_STATE: IState = {
  selectedShape: undefined
};

class ShapeSelector extends React.Component<IState> {
  public readonly state: IState = { ...INITIAL_STATE };
  constructor(props: IProps, state: IState) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.resetShapeSelection = this.resetShapeSelection.bind(this);
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
            <option value="Rectangle">Rectangle</option>
            <option value="Circle">Circle</option>
            <option value="RightTriangle">Right Triangle</option>
          </select>
          {shapes[this.state.selectedShape || 'noShape']}
          <input type="button" className="btn btn-dark" value="Submit" />
          {" "}
          <input
            type="reset"
            className="btn btn-dark"
            value="Clear"
            onClick={this.resetShapeSelection}
          />
          <div className="ShapeValidation">
            <label id="ShapeValidationMessage">shape validation</label>
          </div>
        </form>
      </div>
    );
  }

  private resetShapeSelection() {
    this.setState(INITIAL_STATE);
  }

  private handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "RightTriangle": {
        this.setState({
          selectedShape: 'rightTriangle'
        });
        break;
      }
      case "Circle": {
        this.setState({
          selectedShape: 'circle'
        });
        break;
      }
      case "Rectangle": {
        this.setState({
          selectedShape: 'rectangle'
        });
        break;
      }
      default: {
        this.setState({ selectedShape: INITIAL_STATE });
      }
    }
  };
}

export default ShapeSelector;
