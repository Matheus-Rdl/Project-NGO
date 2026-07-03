import { useEffect, useState } from "react";
import fieldsServices from "../../../../services/fieldsServices";
import { selectOptions } from "../../../../utils/userSelectOptions";
import { formatProperNoun } from "../../../../utils/formatters";
import DialogMenu from "./dialogMenu";
import {
  Dialog,
  Box,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  NativeSelect,
  Portal
} from "@chakra-ui/react";

export default function DialogFieldManagementMenu({ open, onClose, typeDialog, field, fieldList, page, refreshFields, menusList }) {

  const [fieldsOrdered, setFieldsOrdered] = useState([]);
  const { updateFieldsOrder } = fieldsServices();

  //Estado para armazenar o campo editado
  const [editedField, setEditedField] = useState({});
  //Atualiza o estado do campo editado quando o campo selecionado muda
  useEffect(() => {
    if (field) {
      setEditedField(field);
    }
  }, [field]);
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
    { label: "Título", name: "title", type: "text" },
    { label: "Id", name: "field", type: "text" },
    { label: "Tipo", name: "type", type: "select" },
    { label: "Obrigátorio", name: "required", type: "select" },
    { label: "Tamanho mínimo", name: "minLength", type: "number" },
    { label: "Tamanho maximo", name: "maxLength", type: "number" },
    { label: "Modo de exibição", name: "mode", type: "mode" },
  ];

  //Posição
  const fieldSettingsMenu = [
    { label: "Menu", name: "menuId", type: "select" },
    { label: "Ordem", name: "order", type: "number" },
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

  //Renderiza o input de acordo com o tipo de campo
  const renderInput = (setting, value) => {
    const canEdit = ["field", "order"].includes(setting.name) || isView;

    switch (setting.type) {
      case "text":
        return (
          <Input
            size="xs"
            value={editedField[setting.name] ?? ""}
            onChange={(e) => handleChange(setting.name, e.target.value)}
            disabled={canEdit}
            readOnly={canEdit}
            bg="blackAlpha.100"
            borderRadius="md"
            w={`${Math.max(String(field[setting.name]).length + 2, 10)}ch`}
          />
        );

      case "number":
        return (
          <Input
            size="xs"
            type="number"
            value={editedField[setting.name] ?? ""}
            onChange={(e) => handleChange(setting.name, Number(e.target.value))}
            disabled={canEdit}
            readOnly={canEdit}
            bg="blackAlpha.100"
            borderRadius="md"
          />
        );

      case "select":
        return (
          <Input
            size="xs"
            value={formatProperNoun(getFormattedValue(setting.name, value))}
            disabled={isView}
            readOnly={isView}
            bg="blackAlpha.100"
            borderRadius="md"
          />
        );

      case "mode":
        return (
          <Input
            size="xs"
            value={formatMode(value)}
            disabled={isView}
            readOnly={isView}
            bg="blackAlpha.100"
            borderRadius="md"
          />
        );

      default:
        return null;
    }
  };

  //Renderiza a sessão
  const renderSection = (title, settings) => (
    <Box>
      <Text fontWeight="medium" ml={4} mt={6}>&bull; {title}</Text>

      <Flex flexWrap="wrap" alignItems="flex-start" gap={2} mt={2}>
        {settings.map(setting => {
          if (field[setting.name] === undefined) return null;
          return (
            <Box key={setting.name} display="flex" flexDirection="column">
              <Text as="label" fontWeight="bold" fontSize="xs">{setting.label}:</Text>
              {renderInput(setting, field[setting.name])}
            </Box>
          );
        })}
      </Flex>
    </Box>
  );

  return (
    <Dialog.Root open={!!open} onOpenChange={(details) => { if (!details.open) onClose(); }}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="90vw">

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
              <Box w="80%" py={4} px="5%" mx="5%" mb={8}>
                <Box textAlign="center">
                  <Heading size="md" color="gray.600">
                    {isView ? "Visualização do campo" : "Alteração do campo"}
                  </Heading>
                  <Text color="brand.primary" fontSize="md" mt={1}>
                    {field.title}
                  </Text>
                </Box>

                {renderSection("Dados do campo", fieldSettings)}
                {renderSection("Dados do menu e ordem", fieldSettingsMenu)}
              </Box>
            )}

          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}