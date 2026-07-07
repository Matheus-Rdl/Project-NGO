import { useState } from "react";
import { apiFetch } from "../utils/api.js";

export default function pagesServices() {
  const [pagesLoading, setPagesLoading] = useState(false);
  const [refetchPages, setRefetchPages] = useState(true);
  const [pagesList, setPagesList] = useState([]);

  const addPage = (pageData) => {
    apiFetch("/pages", {
      method: "POST",
      body: JSON.stringify(pageData),
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

  const getPages = () => {
    setPagesLoading(true);

    apiFetch("/pages")
      .then((result) => {
        if (result.success) {
          setPagesList(result.body);
        } else {
          //console.log(result);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
        setPagesLoading(false);
        setRefetchPages(false);
      });
  };

  const updatePage = (pageId, pageData) => {

    console.log(pageData)
    console.log(JSON.stringify(pageData))

    apiFetch(`/pages/${pageId}`, {
      method: "PUT",
      body: JSON.stringify(pageData)
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
    addPage,
    getPages,
    updatePage,
    pagesLoading,
    refetchPages,
    pagesList
  };
}
