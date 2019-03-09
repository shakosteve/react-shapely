import * as React from 'react';
import '../styles/App.css';

export interface ICircle {
  radius?: number;
  diameter?: number;
  circumference?: number;
  area?: number;
  shapeValidation?: string;
}

export interface IState {
  area?: number;
  circumference?: number;
  diameter?: number;
  radius?: number;
  shapeValidation?: '';
}

const INITIAL_STATE: IState = {
  area: undefined,
  circumference: undefined,
  diameter: undefined,
  radius: undefined,
  shapeValidation: ''
};

class Circle extends React.Component<ICircle, IState> {
  public readonly state: IState = { ...INITIAL_STATE };
  constructor(props: ICircle, state: IState) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  public render() {
    return (
      <div className='ParameterDiv' id='Circle'>
        <input
          type='number'
          min='1'
          name='radius'
          className='form-control'
          placeholder='Radius'
          value={this.props.radius}
          onChange={this.handleOnChange}
        />
        <br />
        <input
          type='number'
          min='1'
          name='diameter'
          className='form-control'
          placeholder='Diameter'
          value={this.props.diameter}
          onChange={this.handleOnChange}
        />
        <br />
        <input
          type='number'
          min='1'
          name='circumference'
          className='form-control'
          placeholder='Circumference'
          value={this.props.circumference}
          onChange={this.handleOnChange}
        />
        <br />
        <input
          type='number'
          min='1'
          name='area'
          className='form-control'
          placeholder='Area'
          value={this.props.area}
          onChange={this.handleOnChange}
        />
        <br />
      </div>
    );
  }

  private handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'radius': {
        this.setState({ radius: e.target.valueAsNumber });
        break;
      }
      case 'diameter': {
        this.setState({ diameter: e.target.valueAsNumber });
        break;
      }
      case 'circumference': {
        this.setState({ circumference: e.target.valueAsNumber });
        break;
      }
      case 'area': {
        this.setState({ area: e.target.valueAsNumber });
        break;
      }
    }
  };
}

export default Circle;
