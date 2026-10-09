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
          <input
            type="number"
            min="0"
            step="any"
            name={field.name}
            aria-label={field.label}
            className="form-control"
            placeholder={field.label}
            value={values[field.name] ?? ""}
            onChange={e => onChange(field.name, e.target.value)}
          />
          <br />
        </div>
      ))}
    </div>
  );
}

export default ShapeFields;
