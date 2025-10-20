import styles from "./formTextArea.module.css";
import { selectOptions } from "../../utils/userSelectOptions";

export default function FormTextArea({
  label,
  id,
  name,
  type,
  field,
  input,
  data,
  view,
  onChange,
}) {
  console.log(input);
  console.log(view);

  return (
    <div className={styles.formGroup}>
      {input === 1 && (
        <>
          <label htmlFor={id}>{label}:</label>
          <input
            id={id}
            name={name}
            type={type}
            value={data?.[field] || ""}
            disabled={view}
            onChange={onChange}
            required
          />
        </>
      )}

      {input === 2 && (
        <>
          <label htmlFor={id}>{label}:</label>
          <select
            id={id}
            name={name}
            value={data?.[field] || ""}
            onChange={onChange}
            disabled={view}
            required
          >
            <option value="">Selecione...</option>
            {Object.entries(selectOptions[id]).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
