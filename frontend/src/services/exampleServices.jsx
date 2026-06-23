import { useState } from "react";

export default function examplesServices() {
  const [examplesLoading, setExamplesLoading] = useState(false);
  const [refetchExamples, setRefetchExamples] = useState(true);
  const [examplesList, setExamplesList] = useState([]);

  const url = `${import.meta.env.VITE_API_URL}/examples`;

  const addExample = (exampleData) => {

    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exampleData),
    })
      .then((response) => response.json())
      .then((result) => {
        //if (result.success) {
        //  setTablesList(result.body);
        //} else {
        //console.log(result);
        //}
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
      });
  };

  const getExamples = () => {
    setExamplesLoading(true);

    fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setExamplesList(result.body);
        } else {
          //console.log(result);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
        setExamplesLoading(false);
        setRefetchExamples(false);
      });
  };

  const updateExample = (exampleId, exampleData) => {

    console.log(exampleData)
    console.log(JSON.stringify(exampleData))

    fetch(`${url}/${exampleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exampleData)
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
        } else {
          //console.log(result);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
      });
  };

  return {
    addExample,
    getExamples,
    updateExample,
    examplesLoading,
    refetchExamples,
    examplesList
  };
}
