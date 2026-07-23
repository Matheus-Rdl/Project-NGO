import { selectOptions } from "../utils/userSelectOptions";
import Select from "react-select";
import {
  Field,
  Input,
  NativeSelect,
  Box,
  Text,
} from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io";

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

  console.log(field.required);

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
  const getFieldWidth = (maxLength) => {
    if (!maxLength) return "600px";

    const width = maxLength * 8; // aproximadamente 8px por caractere

    return `${Math.min(Math.max(width, 300), 600)}px`;
  };

  // Estilos padronizados
  const commonInputProps = {
    bg: "rgba(156, 155, 155, 0.3)",
    borderColor: "gray.500",
    _hover: { bg: "rgba(156, 155, 155, 0.4)" },
    _focus: {
      bg: "rgba(156, 155, 155, 0.5)",
      borderColor: "black",
      boxShadow: "1px 1px 2px black",
    },
  };

  return (
    <>
      {/* Frente 1: Input de Texto e Datas */}
      {field.input === 1 && (
        <Field.Root invalid={!!errors[field.field]}>
          <Box
            w={`${field.maxLength}ch`}
            minW="250px"
            maxW="500px">
            <Field.Label fontWeight="bold" htmlFor={field.field}>
              {field.title}{field.required && <Text color="red.500">*</Text>}
            </Field.Label>
            <Input
              id={field.field}
              name={field.field}
              type={field.type}
              maxLength={field.maxLength}
              value={
                addMode && field.field === "user_mat"
                  ? nextMat
                  : data?.[field.field] || ""
              }
              onChange={handleChange}
              disabled={!isFieldEnabled}
              {...commonInputProps}
            />
            {errors[field.field] && (
              <Field.ErrorText fontSize="0.8rem" mt="4px">
                {errors[field.field]}
              </Field.ErrorText>
            )}
          </Box>
        </Field.Root>
      )}

      {/* Frente 2: Select Simples */}
      {field.input === 2 && (
        <Field.Root invalid={!!errors[field.field]}>
          <Box w="100%" maxW={getFieldWidth(field.maxLength)}>
            <Field.Label fontWeight="bold" htmlFor={field.field}>
              {field?.title}{field.required && <Text color="red.500">*</Text>}
            </Field.Label>
            {viewMode ? (
              <Input
                type="text"
                disabled
                value={getFormattedValue(field?.field, data?.[field?.field]).slice(3)}
                {...commonInputProps}
              />
            ) : (
              <NativeSelect.Root position="relative">
                <Box
                  position="absolute"
                  right="10px"
                  top="50%"
                  transform="translateY(-50%)"
                  pointerEvents="none"
                >
                  <IoIosArrowDown />
                </Box>
                <NativeSelect.Field
                  id={field.field}
                  name={field.field}
                  value={data?.[field.field] || ""}
                  onChange={handleChange}
                  disabled={!isFieldEnabled}
                  {...commonInputProps}
                >
                  <option value="">Selecione uma opção</option>
                  {Object.entries(getSelectOptions(field?.field)).map(
                    ([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    )
                  )}
                </NativeSelect.Field>
              </NativeSelect.Root>
            )}
            {errors[field.field] && (
              <Field.ErrorText fontSize="0.8rem" mt="4px">
                {errors[field.field]}
              </Field.ErrorText>
            )}
          </Box>
        </Field.Root>
      )}

      {/* Frente 3: React Select (Multi Select) */}
      {field.input === 3 && (
        <Field.Root invalid={!!errors[field.field]}>
          <Box w="100%" maxW={getFieldWidth(field.maxLength)}>
            <Field.Label fontWeight="bold" htmlFor={field.field}>
              {field?.title}{field.required && <Text color="red.500">*</Text>}
            </Field.Label>
            {viewMode ? (
              <Input
                type="text"
                disabled
                value={
                  Array.isArray(data?.[field.field])
                    ? data[field.field]
                      .map((id) => getFormattedValue(field.field, id).slice(3))
                      .join("  |  ")
                    : getFormattedValue(field.field, data?.[field.field])
                }
                {...commonInputProps}
              />
            ) : (
              <Box>
                <Select
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
                    .map(([value, label]) => ({
                      value: String(value),
                      label,
                    }))}
                  isDisabled={!isFieldEnabled}
                  placeholder="Selecione uma ou mais opções..."
                  classNamePrefix="react-select"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused
                        ? "rgba(156, 155, 155, 0.5)"
                        : "rgba(156, 155, 155, 0.3)",
                      borderColor: state.isFocused ? "black" : "gray",
                      boxShadow: state.isFocused ? "1px 1px 2px black" : "none",
                      borderRadius: "0.3em",
                    }),
                  }}
                />
              </Box>
            )}
            {errors[field.field] && (
              <Field.ErrorText fontSize="0.8rem" mt="4px">
                {errors[field.field]}
              </Field.ErrorText>
            )}
          </Box>
        </Field.Root>
      )}
    </>
  );
}