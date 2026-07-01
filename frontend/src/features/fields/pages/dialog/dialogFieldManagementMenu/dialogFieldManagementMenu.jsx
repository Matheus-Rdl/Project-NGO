//import { Dialog } from "@mui/material";
import styles from "./dialogFieldManagementMenu.module.css"
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import fieldsServices from "../../../../../services/fieldsServices";
import { selectOptions } from "../../../../../utils/userSelectOptions";
import { formatProperNoun } from "../../../../../utils/formatters";

export default function DialogFieldManagementMenu({ open, onClose, typeDialog, field, fieldList, page, refreshFields, menusList }) {

  const [fieldsOrdered, setFieldsOrdered] = useState([]);
  const { updateFieldsOrder } = fieldsServices();

  useEffect(() => {
    if (!field) return;

    setFieldsOrdered(
      fieldList
        .filter(data => data.menuId === field.menuId)
        .sort((a, b) => a.order - b.order)
    );
  }, [fieldList, field]);

  //Move o campo selecionado para cima ou para baixo
  const moveUp = (index) => {
    if (index === 0) return;
    const newList = [...fieldsOrdered];
    [newList[index - 1], newList[index]] = [
      newList[index],
      newList[index - 1]
    ];
    setFieldsOrdered(newList);
  };
  const moveDown = (index) => {
    if (index === fieldsOrdered.length - 1) return;
    const newList = [...fieldsOrdered];
    [newList[index], newList[index + 1]] = [
      newList[index + 1],
      newList[index]
    ];
    setFieldsOrdered(newList);
  };
  //Salva a alteração de menu
  const saveOrder = async () => {

    const updatedFields = fieldsOrdered.map((item, index) => ({
      _id: item._id,
      order: index + 1
    }));

    const result = await updateFieldsOrder(updatedFields);

    if (result?.success) {
      refreshFields();
      onClose();
    }
  };

  // Configurações de como vai mostrar na tela, tem dois para mostrar os dados e informação de posição
  // Dados
  const fieldSettings = [
    {
      label: "Título",
      name: "title",
      type: "text"
    },
    {
      label: "Id",
      name: "field",
      type: "text"
    },
    {
      label: "Tipo",
      name: "type",
      type: "select"
    },
    {
      label: "Obrigátorio",
      name: "required",
      type: "select"
    },
    {
      label: "Tamanho mínimo",
      name: "minLength",
      type: "text"
    },
    {
      label: "Tamanho maximo",
      name: "maxLength",
      type: "text"
    },
    {
      label: "Modo de exibição",
      name: "mode",
      type: "mode"
    }
  ];

  //Posição
  const fieldSettingsMenu = [
    {
      label: "Menu",
      name: "menuId",
      type: "select"
    },
    {
      label: "Ordem",
      name: "order",
      type: "number"
    }
  ];

  //Monta um select com o tipo de menus
  const menuOptions = menusList
    .filter(menu => menu.pageId === page)
    .reduce((acc, menu) => {
      acc[menu.id] = menu.name;
      return acc;
    }, {});
  //Pega o valor dos menu para colocar no campo menuID
  const getDisplayValue = (setting, value) => {
    if (setting.name === "menuId") {
      return menuOptions[value] || value;
    }

    if (setting.type === "select") {
      return getFormattedValue(setting.name, value);
    }

    return value;
  };

  // Função segura para obter as opções
  const getSelectOptions = (nameField) => {
    return selectOptions?.[nameField] || {};
  };
  // Função segura para obter o valor formatado
  const getFormattedValue = (nameField, value) => {
    if (!nameField || value === undefined || value === null) return "";
    const options = getSelectOptions(nameField);
    return options?.[value] || value || "";
  };

  //Configuração personalizada para o mode, que é o campo de modo que define a alteração nos modos
  // Opções do menu
  const modeOptions = {
    V: "Visualização",
    E: "Edição",
    A: "Adicionar"
  };
  //Formata de acordo com o dado recebido
  const formatMode = (mode) => {
    if (!mode) return "Sem alteração";
    return mode
      .split("")
      .map(letter => modeOptions[letter])
      .filter(Boolean)
      .join(" | ");
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ className: styles.dialogPaper }}>
      <div>
        {typeDialog === "menu" && (
          <div className={styles.dialogMenu}>
            <div className={styles.textTitle}>
              <h2 className="subtitle-page">Alteração de posição do campo:</h2>
              <h3 className="subtitle-page">{field.title}</h3>
            </div>

            <div className={styles.fieldListBox}>
              {fieldsOrdered.map((data, index) => (
                <div
                  key={data._id}
                  className={
                    data._id === field._id
                      ? `${styles.field} ${styles.fieldActive}`
                      : styles.field
                  }
                >
                  <p>{data.title}</p>

                  <div className={styles.btnArrows}>
                    <FaArrowAltCircleUp
                      onClick={() => moveUp(index)}
                    />
                    <FaArrowAltCircleDown
                      onClick={() => moveDown(index)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button onClick={saveOrder}>Alterar ordenação</button>
          </div>
        )}

        {typeDialog === "view" && (
          <div className={styles.dialogView}>
            <div className={styles.textTitle}>
              <h2 className="subtitle-page">Visualização do campo</h2>
              <h3 className="subtitle-page">{field.title}</h3>
            </div>

            <div>
              <h4>&bull; Dados do campo:</h4>
              <div className={styles.dialogViewContent}>
                {fieldSettings.map(setting => {
                  if (field[setting.name] === undefined) {
                    return null;
                  }
                  return (
                    <div key={setting.name}>
                      <label>{setting.label}:</label>

                      {setting.type === "text" && (
                        <input
                          type="text"
                          disabled
                          value={field[setting.name]}
                          style={{
                            width: `${Math.max(
                              String(field[setting.name]).length + 2,
                              10
                            )}ch`
                          }}
                        />
                      )}
                      {setting.type === "select" && (
                        <input
                          type="text"
                          disabled
                          value={formatProperNoun(getFormattedValue(setting.name, field[setting.name]).slice(3))}
                          style={{
                            width: `${Math.max(
                              String(field[setting.name]).length + 2,
                              20
                            )}ch`
                          }}
                        />
                      )}
                      {setting.type === "multiselect" && (
                        <input
                          type="text"
                          disabled
                          value={field[setting.name]}
                          style={{
                            width: `${Math.max(
                              String(field[setting.name]).length + 2,
                              10
                            )}ch`
                          }}
                        />
                      )}
                      {setting.type === "mode" && (
                        <input
                          type="text"
                          disabled
                          value={formatMode(field[setting.name])}
                          style={{
                            width: `${Math.max(
                              String(field[setting.name]).length + 2,
                              20
                            )}ch`
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <h4>&bull; Dados do menu e ordem:</h4>
              <div className={styles.dialogViewContent}>
                {fieldSettingsMenu.map(setting => {
                  if (field[setting.name] === undefined) {
                    return null;
                  }
                  return (
                    <div key={setting.name}>
                      <label>{setting.label}:</label>

                      {setting.type === "text" && (
                        <input
                          type="text"
                          disabled
                          value={field[setting.name]}
                          style={{
                            width: `${Math.max(
                              String(field[setting.name]).length + 2,
                              10
                            )}ch`
                          }}
                        />
                      )}
                      {setting.type === "number" && (
                        <input
                          type="text"
                          disabled
                          value={field[setting.name]}
                          style={{
                            width: `${Math.max(
                              String(field[setting.name]).length + 2,
                              10
                            )}ch`
                          }}
                        />
                      )}
                      {setting.type === "select" && (
                        <input
                          type="text"
                          disabled
                          value={getDisplayValue(setting, field[setting.name])}
                          style={{
                            width: `${Math.max(
                              String(field[setting.name]).length + 2,
                              10
                            )}ch`
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {typeDialog === "alter" && (
          <div>
            <div>
              <h2 className="subtitle-page">Edição do campo</h2>
              <h3 className="subtitle-page">{field.title}</h3>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  )

}