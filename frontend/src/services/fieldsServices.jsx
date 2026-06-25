import { useState } from "react";

export default function fieldsServices() {
  const [refetchFields, setRefetchFields] = useState(true);
  const [fieldsList, setFieldsList] = useState([]);

  const url = `${import.meta.env.VITE_API_URL}/fields`;

  const getFieldsByTitle = (fieldTitle) => {

    fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          const fields = result.body.filter(
            (item) => item.collection === fieldTitle
          );
          setFieldsList(fields);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
        setRefetchFields(false)
      });
  };

  const updateFieldsOrder = async (fields) => {
    const response = await fetch(`${url}/order`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const result = await response.json();

    return result;
  };

  return { getFieldsByTitle, updateFieldsOrder, refetchFields, fieldsList };
}
