import { Dialog } from "@mui/material";
import styles from "./dialogFieldManagementMenu.module.css"
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import fieldsServices from "../../../../../services/fieldsServices";
import { selectOptions } from "../../../../../utils/userSelectOptions";
import { formatProperNoun } from "../../../../../utils/formatters";
import DialogMenu from "./DialogMenu";

export default function DialogFieldManagementMenu({ open, onClose, typeDialog, field, fieldList, page, refreshFields, menusList }) {

  const [fieldsOrdered, setFieldsOrdered] = useState([]);
  const { updateFieldsOrder } = fieldsServices();

  //Estado para armazenar o campo editado
  const [editedField, setEditedField] = useState({});
  //Atualiza o estado do campo editado quando o campo selecionado muda
  useEffect(() => {
    if (open && field) {
      setEditedField(field);
    }
  }, [open, field]);

  useEffect(() => {
    if (!open) {
      setEditedField({});
    }
  }, [open]);
  //Função para atualizar o estado do campo editado quando o usuário altera um valor
  const handleChange = (name, value) => {
    setEditedField(prev => ({
      ...prev,
      [name]: value
    }));
  };

  //Atualiza a lista de campos ordenados quando o campo selecionado ou a lista de campos muda
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
      type: "number"
    },
    {
      label: "Tamanho maximo",
      name: "maxLength",
      type: "number"
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
      type: "menu"
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

  //Verifica se é para visualização ou alteração
  const isView = typeDialog === "view";
  const isAlter = typeDialog === "alter";
  //Mostra o estilo de acordo com a tela, se é para visualização ou alteração
  const currentStyles = isView
    ? styles.dialogViewContent
    : styles.dialogAlterContent;

  //Renderiza o input de acordo com o tipo de campo, se é texto, número ou seleção
  const renderInput = (setting, value) => {

    const canEdit =
      ["field", "order"].includes(setting.name) ||
      isView;

    console.log(getSelectOptions(  ));
    switch (setting.type) {

      case "text":
        return (
          <input
            type="text"
            value={editedField[setting.name] ?? ""}
            onChange={(e) => handleChange(setting.name, e.target.value)}
            disabled={canEdit}
            readOnly={canEdit}
            style={{
              width: `${Math.max(
                String(field[setting.name]).length + 2,
                10
              )}ch`
            }}
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={editedField[setting.name] ?? ""}
            onChange={(e) => handleChange(setting.name, Number(e.target.value))}
            disabled={canEdit}
            readOnly={canEdit}
          />
        );

      case "select":
        return (
          <>
            {isView ? (
              <input
                type="text"
                value={editedField[setting.name] ?? ""}
                disabled={canEdit}
                readOnly={canEdit}
              />
            ) : (
              <select
                id={field.field}
                name={field.field}
                value={editedField[setting.name] ?? ""}
                onChange={(e) => handleChange(setting.name, e.target.value)}
                disabled={canEdit}
                readOnly={canEdit}
              >
                <option value="">Selecione uma opção</option>
                {Object.entries(getSelectOptions(setting.name)).map(
                  ([key, value]) => (
                    <option key={key} value={key}>
                      {formatProperNoun(value)}
                    </option>
                  )
                )}
              </select>
            )}
          </>
        );

      case "mode":
        return (
          <input
            type="text"
            value={formatMode(value)}
            disabled={isView}
            readOnly={isView}
          />
        );

      case "menu":
        return (
          <input
            type="text"
            value={editedField[setting.name] ?? ""}
            onChange={(e) => handleChange(setting.name, e.target.value)}
            disabled={canEdit}
            readOnly={canEdit}
            style={{
              width: `${Math.max(
                String(field[setting.name]).length + 2,
                10
              )}ch`
            }}
          />
        );
      default:

        return null;

    }

  };

  //Renderiza a sessão nessa caso são as informações do campo e do menu, com os dados de cada um
  const renderSection = (title, settings) => (
    <>
      <h4>&bull; {title}</h4>

      <div className={currentStyles}>
        {settings.map(setting => {

          if (field[setting.name] === undefined) return null;

          return (
            <div key={setting.name}>
              <label>{setting.label}:</label>
              {renderInput(setting, field[setting.name])}
            </div>
          );

        })}
      </div>
    </>
  );

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ className: styles.dialogPaper }}>
      <div>
        {typeDialog === "menu" && (
          <DialogMenu
            field={field}
            fieldList={fieldList}
            page={page}
            menusList={menusList}
            refreshFields={refreshFields}
            onClose={onClose}
          />
        )}

        {(isView || isAlter) && (
          <div className={isView ? styles.dialogView : styles.dialogAlter}>

            <div className={styles.textTitle}>
              <h2>
                {isView ? "Visualização do campo" : "Alteração do campo"}
              </h2>

              <h3>
                {field.title}
              </h3>
            </div>

            {renderSection("Dados do campo", fieldSettings)}

            {renderSection("Dados do menu e ordem", fieldSettingsMenu)}

          </div>
        )}
      </div>
    </Dialog>
  )

}