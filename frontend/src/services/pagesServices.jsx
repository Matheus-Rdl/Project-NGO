import { useState } from "react";

export default function pagesServices() {
  const [pagesLoading, setPagesLoading] = useState(false);
  const [refetchPages, setRefetchPages] = useState(true);
  const [pagesList, setPagesList] = useState([]);

  const url = `${import.meta.env.VITE_API_URL}/pages`;

  const addPage = (pageData) => {

    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pageData),
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

  const getPages = () => {
    setPagesLoading(true);

    fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
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

    fetch(`${url}/${pageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pageData)
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
    addPage,
    getPages,
    updatePage,
    pagesLoading,
    refetchPages,
    pagesList
  };
}
