import * as React from "react";
import "../styles/App.css";

export interface IRightTriangle {
  lega?: number;
  legb?: number;
  hypotenuse?: number;
  perimeter?: number;
}

const INITIAL_STATE: IRightTriangle = {
  hypotenuse: undefined,
  lega: undefined,
  legb: undefined,
  perimeter: undefined
};
class RightTriangle extends React.Component<IRightTriangle> {
  public readonly state: IRightTriangle = { ...INITIAL_STATE };
  constructor(props: IRightTriangle, state: IRightTriangle) {
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
          onChange={this.handleOnChange}
        />
        <br />
        <input
          type="number"
          min="1"
          name="legb"
          className="form-control"
          placeholder="Leg B"
          value={this.props.legb}
          onChange={this.handleOnChange}
        />
        <br />
        <input
          type="number"
          min="1"
          name="hypotenuse"
          className="form-control"
          placeholder="Hypotenuse"
          value={this.props.hypotenuse}
          onChange={this.handleOnChange}
        />
        <br />
        <input
          type="number"
          min="1"
          name="perimeter"
          className="form-control"
          placeholder="Perimeter"
          value={this.props.perimeter}
          onChange={this.handleOnChange}
        />
        <br />
      </div>
    );
  }
  
  private handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "lega": {
        this.setState({ lega: e.target.valueAsNumber });
        break;
      }
      case "legb": {
        this.setState({ legb: e.target.valueAsNumber });
        break;
      }
      case "hypotenuse": {
        this.setState({ hypotenuse: e.target.valueAsNumber });
        break;
      }
      case "perimeter": {
        this.setState({ perimeter: e.target.valueAsNumber });
        break;
      }
    }
  };
}

export default RightTriangle;
