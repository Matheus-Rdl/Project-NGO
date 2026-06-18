/*
    Type: Page
    Name: FieldsManagementMenu
    Description:
      Página FieldsManagementMenu, mostra os menus dos campos da página Gestão de usuários
    Author: Matheus Rodrigues
    Last Edit: 18/06/2026
*/

import { useLocation } from "react-router-dom";
import HandleBack from "../../../components/handleBack/handleBack";
import styles from "../styles/fieldsManagementMenu.module.css";
import menusServices from "../../../services/menusServices";
import { useEffect } from "react";

export default function FieldsManagementMenu() {
  const location = useLocation();
  const { page, name } = location.state || {};

  //Service que pega os dados da coleção -> "menus"
  const { getMenus, refetchMenus, menusList } = menusServices();

  useEffect(() => {
    if (refetchMenus) {
      getMenus();
    }
  }, [refetchMenus]);
  console.log(menusList)

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <HandleBack />
      <h1 className="title-page">Campos - {name}</h1>
      <p>Menus da página</p>
      <div>

      </div>
    </div>
  );
}
