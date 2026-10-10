import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { shapes, type ShapeKey } from "../geometry";
import "../styles/App.css";
import ShapeFields from "./ShapeFields";

const NO_SHAPE_MESSAGE = "Choose a shape";

// Show two decimal places, except for whole numbers (including ones that round to whole).
const format = (n: number) => {
  const rounded = Number(n.toFixed(2));
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
};

interface Props {
  onShapeChange?: (shape: ShapeKey | "") => void;
}

function ShapeSelector({ onShapeChange }: Props) {
  const [selectedShape, setSelectedShapeState] = useState<ShapeKey | "">("");
  const setSelectedShape = (shape: ShapeKey | "") => {
    setSelectedShapeState(shape);
    onShapeChange?.(shape);
  };
  const [values, setValues] = useState<Record<string, string>>({});
  const [message, setMessage] = useState(NO_SHAPE_MESSAGE);

  const handleShapeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const shape = e.target.value as ShapeKey;
    setSelectedShape(shape);
    setValues({});
    setMessage(shapes[shape].hint);
  };

  const handleValueChange = (name: string, value: string) => {
    setValues(previous => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedShape === "") {
      setMessage(NO_SHAPE_MESSAGE);
      return;
    }

    const entered: Record<string, number> = {};
    for (const [name, text] of Object.entries(values)) {
      if (text.trim() === "") {
        continue;
      }
      const number = Number(text);
      if (!Number.isFinite(number) || number <= 0) {
        setMessage("Measurements must be positive numbers");
        return;
      }
      entered[name] = number;
    }

    const result = shapes[selectedShape].solve(entered);
    if (!result.ok) {
      setMessage(result.message);
      return;
    }
    setValues(
      Object.fromEntries(Object.entries(result.values).map(([name, n]) => [name, format(n)]))
    );
    setMessage("Solved!");
  };

  const handleClear = () => {
    setSelectedShape("");
    setValues({});
    setMessage(NO_SHAPE_MESSAGE);
  };

  return (
    <div className="ShapeSelector">
      <form noValidate={true} onSubmit={handleSubmit}>
        <select
          id="shapeSelector"
          aria-label="Shape"
          value={selectedShape}
          className="custom-select custom-select-bg"
          onChange={handleShapeChange}
        >
          <option value="" disabled={true} hidden={true}>
            Choose a shape
          </option>
          {Object.entries(shapes).map(([key, shape]) => (
            <option key={key} value={key}>
              {shape.label}
            </option>
          ))}
        </select>
        {selectedShape === "" ? (
          <div className="NoShape" />
        ) : (
          <ShapeFields
            fields={shapes[selectedShape].fields}
            values={values}
            onChange={handleValueChange}
          />
        )}
        <input type="submit" className="btn btn-dark" value="Submit" />{" "}
        <input type="button" className="btn btn-dark" value="Clear" onClick={handleClear} />
        <div className="ShapeValidation">
          <label id="ShapeValidationMessage" role="status">
            {message}
          </label>
        </div>
      </form>
    </div>
  );
}

export default ShapeSelector;
