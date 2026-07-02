/*
    Type: Page
    Name: FieldsManagementDetailed
    Description:
      Página FieldsManagementDetailed, mostra os campos detalhados com informações sobre o mesmo.
    Author: Matheus Rodrigues
    Last Edit: 21/04/2026
*/

import HandleBack from "../../../components/handleBack";
import styles from "../styles/fieldsManagementDetailed.module.css";

export default function FieldsManagementDetailed() {

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <HandleBack />
      <h1 className="title-page">Campo - - </h1>
    </div>
  );
}
