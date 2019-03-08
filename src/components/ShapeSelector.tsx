import * as React from "react";
import "../styles/App.css";
import Circle from "./Circle";
import Rectangle from "./Rectangle";
import RightTriangle from "./RightTriangle";

interface IProps {
  selectedShape: keyof (typeof shapes);
}
interface IState {
  selectedShape?: keyof (typeof shapes);
}

const shapes = {
  circle: <Circle />,
  noShape: <div className="NoShape"/>,
  rectangle: <Rectangle />,
  rightTriangle: <RightTriangle />
};

const INITIAL_STATE: IState = {
  selectedShape: 'noShape'
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
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
            <option value="rightTriangle">Right Triangle</option>
          </select>
          {shapes[this.state.selectedShape || 'noShape']}
          <input type="button" className="btn btn-dark" value="Submit" />{" "}
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
      case 'rectangle': {
        this.setState({
          selectedShape: shapes.rectangle
        });
        break;
      }
      case "circle": {
        this.setState({
          selectedShape: shapes.circle
        });
        break;
      }
      case "rightTriangle": {
        this.setState({
          selectedShape: shapes.rightTriangle
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
