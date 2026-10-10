import type { Field } from "../geometry/types";
import "../styles/App.css";

interface Props {
  fields: readonly Field[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

function ShapeFields({ fields, values, onChange }: Props) {
  return (
    <div className="ParameterDiv">
      {fields.map(field => (
        <div key={field.name}>
          <div className="ShapeField">
            <label htmlFor={`shape-field-${field.name}`} className="ShapeFieldLabel">
              {field.label}
            </label>
            <input
              id={`shape-field-${field.name}`}
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              name={field.name}
              className="form-control"
              value={values[field.name] ?? ""}
              onChange={e => onChange(field.name, e.target.value)}
            />
          </div>
          <br />
        </div>
      ))}
    </div>
  );
}

export default ShapeFields;
