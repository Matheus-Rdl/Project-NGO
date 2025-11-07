import { useState } from "react";

export default function fieldsServices() {
  const [fieldsList, setFieldsList] = useState([]);

  const url = "http://localhost:3000/fields";

  const getFieldsByTitle = (fieldTitle) => {

    fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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
      });
  };

  return { getFieldsByTitle, fieldsList };
}
