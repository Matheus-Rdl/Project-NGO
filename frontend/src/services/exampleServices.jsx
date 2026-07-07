import { useState } from "react";
import { apiFetch } from "../utils/api.js";

export default function examplesServices() {
  const [examplesLoading, setExamplesLoading] = useState(false);
  const [refetchExamples, setRefetchExamples] = useState(true);
  const [examplesList, setExamplesList] = useState([]);

  const addExample = (exampleData) => {
    apiFetch("/examples", {
      method: "POST",
      body: JSON.stringify(exampleData),
    })
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

    apiFetch("/examples")
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

    apiFetch(`/examples/${exampleId}`, {
      method: "PUT",
      body: JSON.stringify(exampleData)
    })
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
