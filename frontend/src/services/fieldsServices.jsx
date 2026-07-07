import { useState } from "react";
import { apiFetch } from "../utils/api.js";

export default function fieldsServices() {
  const [refetchFields, setRefetchFields] = useState(true);
  const [fieldsList, setFieldsList] = useState([]);

  const getFieldsByTitle = (fieldTitle) => {

    apiFetch("/fields")
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
    return apiFetch("/fields/order", {
      method: "PUT",
      body: JSON.stringify(fields),
    });
  };

  return { getFieldsByTitle, updateFieldsOrder, refetchFields, fieldsList };
}
