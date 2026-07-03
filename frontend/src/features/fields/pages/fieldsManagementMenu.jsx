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
import menusServices from "../../../services/menusServices";
import { useEffect, useState } from "react";
import fieldsServices from "../../../services/fieldsServices";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { MdEditSquare, MdOutlinePreview, MdOutlineViewList } from "react-icons/md";
import DialogFieldManagementMenu from "./dialog/dialogFieldManagementMenu";
import {
  Accordion,
  Box,
  Flex,
  Heading,
  IconButton,
  Table,
  Text,
  VStack
} from "@chakra-ui/react";

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
    <VStack gap={4} align="stretch">
      <HandleBack />
      <Heading size="lg" color="gray.600">Campos - {name}</Heading>
      <Text color="gray.500" fontSize="md">Menus da página</Text>

      <Accordion.Root collapsible mt={4}>
        {menusList
          .filter(menu => menu.pageId === page)
          .sort((a, b) => {
            if (a.order === 0) return 1;
            if (b.order === 0) return -1;
            return a.order - b.order;
          })
          .map((menu) => (
            <Accordion.Item key={menu._id} value={menu._id} border="3px solid" borderColor="brand.primary" borderRadius="lg" bg="white" mb={2}>
              <Accordion.ItemTrigger cursor="pointer" _hover={{ bg: "gray.50" }} borderRadius="lg" px={4} py={2}>
                <Flex align="center" gap={2} fontWeight="semibold" fontSize="lg">
                  <IoMdArrowDroprightCircle style={{ transition: "transform 0.2s ease" }} />
                  <span>{menu.name}</span>
                </Flex>
              </Accordion.ItemTrigger>

              <Accordion.ItemContent>
                <Accordion.ItemBody borderTop="3px solid" borderColor="brand.primary" bg="blackAlpha.100" p={2}>
                  <Box overflowX="auto">
                    <Table.Root size="sm" whiteSpace="nowrap">
                      <Table.Body>
                        {fieldsList
                          .filter(field => field.menuId === menu.id)
                          .map(field => (
                            <Table.Row key={field._id} cursor="pointer" _hover={{ bg: "blackAlpha.100" }}>
                              <Table.Cell display="flex" justifyContent="space-between" alignItems="center" border="1px solid" borderColor="gray.300" px={4} py={2}>
                                <Text>{field.title}</Text>
                                <Flex gap={1} fontSize="1.4rem">
                                  <MdOutlineViewList
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setTypeDialog("menu");
                                      setFieldSelected(field);
                                      handleShowDialog();
                                    }}
                                  />
                                  <MdOutlinePreview
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setTypeDialog("view");
                                      setFieldSelected(field);
                                      handleShowDialog();
                                    }}
                                  />
                                  <MdEditSquare
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setTypeDialog("alter");
                                      setFieldSelected(field);
                                      handleShowDialog();
                                    }}
                                  />
                                </Flex>
                              </Table.Cell>
                            </Table.Row>
                          ))}
                      </Table.Body>
                    </Table.Root>
                  </Box>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
      </Accordion.Root>

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
    </VStack>
  );
}
