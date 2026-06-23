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
import fieldsServices from "../../../services/fieldsServices";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { MdEditSquare, MdOutlinePreview, MdOutlineViewList } from "react-icons/md";

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
  console.log(page)

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <HandleBack />
      <h1 className="title-page">Campos - {name}</h1>
      <h2>Menus da página</h2>

      <div className={styles.listMenu}>
        {menusList
          .filter(menu => menu.pageId === page)
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
                        <tr>
                          <td key={field._id}>
                            <p>{field.title}</p>
                            <div>
                              <MdEditSquare />
                              <MdOutlinePreview />
                              <MdOutlineViewList />
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
    </div>
  );
}
