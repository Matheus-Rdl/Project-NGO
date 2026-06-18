import { useState } from "react";

export default function collectionsServices() {
  const [collectionsLoading, setCollectionsLoading] = useState(false);
  const [refetchCollections, setRefetchCollections] = useState(true);
  const [collectionsList, setCollectionsList] = useState([]);

  const url = `${import.meta.env.VITE_API_URL}/collections`;

  const addCollection = (collectionData) => {

    fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collectionData),
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

  const getCollections = () => {
    setCollectionsLoading(true);

    fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setCollectionsList(result.body);
        } else {
          //console.log(result);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
        setCollectionsLoading(false);
        setRefetchCollections(false);
      });
  };

  const updateCollection = (collectionId, collectionData) => {

    console.log(collectionData)
    console.log(JSON.stringify(collectionData))

    fetch(`${url}/${collectionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collectionData)
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
    addCollection,
    getCollections,
    updateCollection,
    collectionsLoading,
    refetchCollections,
    collectionsList
  };
}
