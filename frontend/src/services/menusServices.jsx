import { useState } from "react";
import { apiFetch } from "../utils/api.js";

export default function menusServices() {
  const [menusLoading, setMenusLoading] = useState(false);
  const [refetchMenus, setRefetchMenus] = useState(true);
  const [menusList, setMenusList] = useState([]);

  const addMenu = (menuData) => {
    apiFetch("/menus", {
      method: "POST",
      body: JSON.stringify(menuData),
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

  const getMenus = () => {
    setMenusLoading(true);

    apiFetch("/menus")
      .then((result) => {
        if (result.success) {
          setMenusList(result.body);
        } else {
          //console.log(result);
        }
      })
      .catch((error) => {
        //console.log(error);
      })
      .finally(() => {
        setMenusLoading(false);
        setRefetchMenus(false);
      });
  };

  const updateMenu = (menuId, menuData) => {

    console.log(menuData)
    console.log(JSON.stringify(menuData))

    apiFetch(`/menus/${menuId}`, {
      method: "PUT",
      body: JSON.stringify(menuData)
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
    addMenu,
    getMenus,
    updateMenu,
    menusLoading,
    refetchMenus,
    menusList
  };
}
