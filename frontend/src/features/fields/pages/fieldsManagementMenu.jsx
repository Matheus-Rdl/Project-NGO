/*
    Type: Page
    Name: FieldsManagementMenu
    Description:
      Página FieldsManagementMenu, mostra os menus dos campos da página Gestão de usuários
    Author: Matheus Rodrigues
    Last Edit: 18/06/2026
*/

import { useLocation } from "react-router-dom";
import HandleBack from "../../../components/handleBack";
import styles from "../styles/fieldsManagementMenu.module.css";
import menusServices from "../../../services/menusServices";
import { useEffect, useState } from "react";
import fieldsServices from "../../../services/fieldsServices";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { MdEditSquare, MdOutlinePreview, MdOutlineViewList } from "react-icons/md";
import DialogFieldManagementMenu from "./dialog/dialogFieldManagementMenu/dialogFieldManagementMenu";

export default function FieldsManagementMenu() {
  const location = useLocation();
  const { page, name, collection } = location.state || {};


  //Service que pega os dados das coleções -> "menus", "fields"
  const { getMenus, refetchMenus, menusList } = menusServices();
  const { getFieldsByTitle, refetchFields, fieldsList } = fieldsServices();

  useEffect(() => {
    if (refetchMenus) {
      getMenus();
    }
  }, [refetchMenus]);

  useEffect(() => {
    if (collection) {
      getFieldsByTitle(collection);
    }
  }, [collection, refetchFields]);

  //Dialog dos campos
  const [fieldDialog, setFieldDialog] = useState(null);
  const handleShowDialog = () => {
    setFieldDialog(true)
  }

  //Tipo de dialog que vai aparecer -> "menu", "view" ou "alter"
  const [typeDialog, setTypeDialog] = useState("");

  //Campo que está sendo clicado para interação
  const [fieldSelected, setFieldSelected] = useState(null);

  //Verifica qual lista foi atualizada, esperando um retorno do DialogFieldManagementMenu
  const refreshFields = () => {
    getFieldsByTitle(collection);
  };

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <HandleBack />
      <h1 className="title-page">Campos - {name}</h1>
      <h2 className="subtitle-page">Menus da página</h2>

      <div className={styles.listMenu}>
        {menusList
          .filter(menu => menu.pageId === page)
          .sort((a, b) => {
            if (a.order === 0) return 1;
            if (b.order === 0) return -1;
            return a.order - b.order;
          })
          .map((menu) => (
            <details key={menu._id} className={styles.menu}>
              <summary className={styles.menuSummary}>
                <span>{menu.name}</span>
                <IoMdArrowDroprightCircle className={styles.arrow} />
              </summary>

              <div className={styles.menuContent}>
                <table className={styles.fieldsList}>
                  <tbody>
                    {fieldsList
                      .filter(field => field.menuId === menu.id)
                      .map(field => (
                        <tr key={field._id}>
                          <td>
                            <p>{field.title}</p>
                            <div>
                              <MdOutlineViewList
                                onClick={() => {
                                  setTypeDialog("menu");
                                  setFieldSelected(field);
                                  handleShowDialog();
                                }}
                              />

                              <MdOutlinePreview
                                onClick={() => {
                                  setTypeDialog("view");
                                  setFieldSelected(field);
                                  handleShowDialog();
                                }}
                              />

                              <MdEditSquare
                                onClick={() => {
                                  setTypeDialog("alter");
                                  setFieldSelected(field);
                                  handleShowDialog();
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

              </div>

            </details>
          ))}
      </div>

      <DialogFieldManagementMenu
        open={fieldDialog}
        onClose={() => setFieldDialog(null)}
        typeDialog={typeDialog}
        field={fieldSelected}
        fieldList={fieldsList}
        page={page}
        refreshFields={refreshFields}
        menusList={menusList}
      />

    </div>
  );
}
