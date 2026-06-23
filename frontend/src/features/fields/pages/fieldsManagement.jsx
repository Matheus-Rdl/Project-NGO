/*
    Type: Page
    Name: FieldsManagement
    Description:
      Página FieldsManagement, responsável por organizar os campos das coleções.
    Author: Matheus Rodrigues
    Last Edit: 21/04/2026
*/

import { Link } from "react-router-dom";
import HandleBack from "../../../components/handleBack/handleBack";
import styles from "../styles/fieldsManagement.module.css";
import pagesServices from "../../../services/pagesServices"
import { useEffect } from "react";

export default function FieldsManagement() {
  //Service que pega os dados da coleção -> "pages"
  const { getPages, refetchPages, pagesList } = pagesServices();

  useEffect(() => {
    if (refetchPages) {
      getPages();
    }
  }, [refetchPages]);

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <HandleBack />
      <h1 className="title-page">Coleções dos campos</h1>

      {pagesList.map((page) => (
        <div key={page._id} className="card-list-box-form">

          <Link
            to={"/FieldsManagementMenu"}
            state={{ page: page.page, name: page.name , collection: page.collection}}
          >
            <h2>&bull; {page.name}</h2>
          </Link>

        </div>
      ))}
    </div>
  );
}