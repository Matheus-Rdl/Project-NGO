import styles from "./formTextArea.module.css";
import { selectOptions } from "../../utils/userSelectOptions";
import Select from "react-select";

export default function FormTextArea({
  field,
  addMode,
  viewMode,
  handleChange,
  data,
  currentMode,
  nextMat,
  errors,
  dateRegister,
}) {

  // Função segura para obter as opções
  const getSelectOptions = (fieldName) => {
    return selectOptions?.[fieldName] || {};
  };

  // Função segura para obter o valor formatado
  const getFormattedValue = (fieldName, value) => {
    if (!fieldName || value === undefined || value === null) return "";
    const options = getSelectOptions(fieldName);
    return options?.[value] || value || "";
  };

  // Verifica se o campo está habilitado
  const isFieldEnabled = field.mode?.includes(currentMode);

  // Define a largura com base no tamanho máximo do campo
  const getFieldWidth = (maxLength, isViewMode) => {
    if (isViewMode) return "500px";
    if (!maxLength) return "auto"; // tamanho padrão se não tiver maxLength
    if (maxLength < 10) return "150px";
    if (maxLength <= 20) return "300px";
    if (maxLength <= 40) return "450px";
    if (maxLength <= 80) return "500px";
    return "500px"; // para casos muito grandes
  };

  return (
    <>
      {field.input === 1 && (
        <div
          className={`${styles.formGroup} ${
            errors[field.field] ? styles.errorGroup : ""
          }`}
          style={{ width: getFieldWidth(field.maxLength) }}
        >
          <div className={styles.formGroup}>
            <label htmlFor={field.field}>{field.title}</label>
            <input
              id={field.field}
              name={field.field}
              type={field.type}
              value={
                addMode && field.field === "user_mat"
                  ? nextMat
                  //: addMode && field.field === "user_registration_date"
                  //? dateRegister
                  : data?.[field.field] || ""
              }
              onChange={handleChange}
              disabled={!isFieldEnabled}
              className={
                errors[field.field] ? styles.errorInput : styles.formInput
              }
            />

            {errors[field.field] && (
              <span className={styles.errorMessage}>{errors[field.field]}</span>
            )}
          </div>
        </div>
      )}

      {field.input === 2 && (
        <div
          className={`${styles.formGroup} ${
            errors[field.field] ? styles.errorGroup : ""
          }`}
        >
          <div className={styles.formGroup}>
            <label htmlFor={field.field}>{field?.title}</label>
            {viewMode ? (
              <input
                type="text"
                disabled
                value={getFormattedValue(field?.field, data?.[field?.field]).slice(3)}
                className={styles.formInput}
              />
            ) : (
              <select
                id={field.field}
                name={field.field}
                value={data?.[field.field] || ""}
                onChange={handleChange}
                disabled={!isFieldEnabled}
                className={
                  errors[field.field] ? styles.errorInput : styles.formSelect
                }
              >
                <option value="">Selecione uma opção</option>
                {Object.entries(getSelectOptions(field?.field)).map(
                  ([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  )
                )}
              </select>
            )}
            {errors[field.field] && (
              <span className={styles.errorMessage}>{errors[field.field]}</span>
            )}
          </div>
        </div>
      )}

      {field.input === 3 && (
        <div
          className={`${styles.formGroup3} ${
            errors[field.field] ? styles.errorGroup : ""
          }`}
          style={{ width: getFieldWidth(field.maxLength, viewMode) }}
        >
          <label htmlFor={field.field}>{field?.title}</label>
          {viewMode ? (
            <input
              type="text"
              disabled
              value={
                Array.isArray(data?.[field.field])
                  ? data[field.field]
                      .map((id) => getFormattedValue(field.field, id).slice(3))
                      .join("  |  ")
                  : getFormattedValue(field.field, data?.[field.field])
              }
              className={styles.formInput}
            />
          ) : (
            <Select
              className={styles.multiSelect}
              id={field.field}
              name={field.field}
              isMulti
              value={
                Array.isArray(data?.[field.field])
                  ? data[field.field]
                    .sort((a, b) => a - b)
                    .map((id) => ({
                      value: String(id),
                      label: getFormattedValue(field.field, id),
                    }))
                  : []
              }
              onChange={(selectedOptions) => {
                const values = selectedOptions
                  ? selectedOptions.map((option) => Number(option.value))
                  : [];

                // Cria um evento sintético para o handleChange
                const syntheticEvent = {
                  target: {
                    name: field.field,
                    value: values,
                    type: "select-multiple",
                  },
                };

                handleChange(syntheticEvent);
              }}
              options={Object.entries(getSelectOptions(field.field))
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(
                ([value, label]) => ({
                  value: String(value),
                  label,
                })
              )}
              isDisabled={!isFieldEnabled}
              placeholder="Selecione uma ou mais opções..."
              classNamePrefix="react-select"
            />
          )}
          {errors[field.field] && (
            <span className={styles.errorMessage}>{errors[field.field]}</span>
          )}
        </div>
      )}
    </>
  );
}
