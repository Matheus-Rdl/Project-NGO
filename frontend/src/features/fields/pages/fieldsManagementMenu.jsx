/*
    Type: Page
    Name: FieldsManagementMenu
    Description:
      Página FieldsManagementMenu, mostra os menus dos campos
    Author: Matheus Rodrigues
    Last Edit: 18/06/2026
*/

import HandleBack from "../../../components/handleBack/handleBack";
import styles from "../styles/fieldsManagementMenu.module.css";

export default function FieldsManagementMenu() {

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <HandleBack />
      <h1 className="title-page">Campos - {label}</h1>
      <h2>Menu</h2>

    </div>
  );
}
