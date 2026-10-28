/*
    Type: Fonte
    User: Matheus Rodrigues
    Description: Tela de Cadastro de Usuários
    Date: 03/03/2026
*/

import { Link } from "react-router-dom";
import HeaderFilter from "../../../components/headerFilter";
import List from "../../../components/list";
import { peopleManagementTR } from "../../../utils/HeaderList.json";
import { useEffect, useRef, useState } from "react";
import usersServices from "../../../services/usersServices";
import HeadingPage from "../../../components/headingPage";
import { Table, Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";
import fieldsServices from "../../../services/fieldsServices";
import useTableFilter from "../../../hooks/useTableFilter";
import Loading from "../../../components/loading";

export default function SignUp() {

  const [userActive, setuserActive] = useState(null);
  const { getUsers, refetchUsers, usersLoading, getUsersByType, usersByType } = usersServices();
  const [open, setOpen] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const menuRef = useRef(null);
  const [filters, setFilters] = useState({});
  const selectedUser = usersByType?.find((u) => u._id === userActive);

  const toggleMenu = () => setOpen((prev) => !prev);
  const toggleMenuSignUp = () => setOpenSignUp((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    getUsersByType([2, 4]);
  }, [refetchUsers]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  //Inicializa a busca de campos do banco de dados
  const {
    fieldsLoading,
    fieldsListByCollectionAndPage,
    getFieldsByCollectionAndPage
  } = fieldsServices();

  //Pega os campos do banco de dados e atualiza a lista de filtros
  useEffect(() => {
    getFieldsByCollectionAndPage(
      "users",
      "peopleManagement"
    );
  }, []);

  const sortedDataFields = [...fieldsListByCollectionAndPage].sort((a, b) => {
    const folderA = a.folder === 0 ? 999 : a.folder;
    const folderB = b.folder === 0 ? 999 : b.folder;

    if (folderA !== folderB) {
      return folderA - folderB;
    }

    return a.order - b.order;
  });

  const sortedFields = [...sortedDataFields]
    .map((field) => ({
      text: field.title,
      type: field.filterType || field.type || "text",
      input: field.input,
      dataKey: field.field,
      optionsKey: field.optionsKey,
      minWidth: field.minWidth || "300px",
      maxWidth: field.maxWidth || "400px",
    }));

  const filteredUsers = useTableFilter(
    usersByType,
    filters,
    sortedFields
  );

  if (usersLoading || fieldsLoading) {
    return <Loading />;
  }

  return (
    <VStack gap={4} align="stretch">

      <HeadingPage content={"Cadastro de usuários do sistema"} />

      {/* Ações principais da tela: inserir, visualizar, alterar e demais operações relacionadas ao registro selecionado. */}
      <HStack gap={2}>
        <Link
          to={"/PeopleManagement/add"}
          state={{
            userId: userActive,
            userData: selectedUser,
            currentMode: "A",
          }}
        >
          <Button size="xs" variant="surface">Inserir</Button>
        </Link>

        <Box ref={menuRef} position="relative">
          <Button size="xs" variant="surface" disabled={userActive === null} onClick={toggleMenuSignUp}>
            Acesso ao sistema ▼
          </Button>

          {/* Renderização condicional: esse bloco só aparece quando o estado correspondente estiver ativo. */}
          {openSignUp && (
            <Box
              as="ul"
              listStyleType="none"
              position="absolute"
              top="100%"
              left={0}
              mt={1}
              py={2}
              px={3}
              borderRadius="md"
              border="1px solid"
              borderColor="brand.primary"
              bg="brand.secondary"
              zIndex={100}
              fontSize="xs"
              color="black"
              whiteSpace="nowrap"
            >
              <Link
                to={"/SignUp/view"}
                state={{ userData: selectedUser, currentMode: "V" }}
              >
                <Box as="li" cursor="pointer" py={1} px={2} borderRadius="sm" _hover={{ filter: "brightness(0.92)" }}>
                  Visualizar Acesso
                </Box>
              </Link>

              <Link
                to={"/SignUp/alter"}
                state={{ userData: selectedUser, currentMode: "E" }}
              >
                <Box as="li" cursor="pointer" py={1} px={2} borderRadius="sm" _hover={{ filter: "brightness(0.92)" }}>
                  Alterar Acesso
                </Box>
              </Link>

              <Link
                to={"/SignUp/view"}
                state={{ userData: selectedUser, currentMode: "D" }}
              >
                <Box as="li" cursor="pointer" py={1} px={2} borderRadius="sm" _hover={{ filter: "brightness(0.92)" }}>
                  Excluir Acesso
                </Box>
              </Link>
            </Box>
          )}
        </Box>

        <Link
          to={"/PeopleManagement/view"}
          state={{
            userId: userActive,
            userData: selectedUser,
            currentMode: "V",
          }}
        >
          <Button size="xs" variant="surface" disabled={userActive === null}>
            Visualizar
          </Button>
        </Link>

        <Link
          to={"/PeopleManagement/alter"}
          state={{
            userId: userActive,
            userData: selectedUser,
            currentMode: "E",
          }}
        >
          <Button size="xs" variant="surface" disabled={userActive === null}>Alterar</Button>
        </Link>

        <Box ref={menuRef} position="relative">
          <Button size="xs" variant="surface" disabled={userActive === null} onClick={toggleMenu}>
            Outras opções ▼
          </Button>

          {/* Renderização condicional: esse bloco só aparece quando o estado correspondente estiver ativo. */}
          {open && (
            <Box
              as="ul"
              listStyleType="none"
              position="absolute"
              top="100%"
              left={0}
              mt={1}
              py={2}
              px={3}
              borderRadius="md"
              border="1px solid"
              borderColor="brand.primary"
              bg="brand.secondary"
              zIndex={100}
              fontSize="xs"
              color="black"
              whiteSpace="nowrap"
            >
              <Link
                to={"/PeopleManagementActivities"}
                state={{ userData: selectedUser }}
              >
                <Box as="li" cursor="pointer" py={1} px={2} borderRadius="sm" _hover={{ filter: "brightness(0.92)" }}>
                  Atividades
                </Box>
              </Link>
            </Box>
          )}
        </Box>
      </HStack>

      <Box
        mt={4}
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        maxW="100%"
        overflow="hidden"
      >
        <Box
          maxH="calc(100vh - 220px)"
          minH="calc(100vh - 220px)"
          overflow="auto"
        >
          <Table.Root variant="line" size="sm" whiteSpace="nowrap">
            {/* Estrutura tabular principal onde o cabeçalho e as linhas são montados dinamicamente. */}
            <HeaderFilter
              fields={sortedFields}
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            {/* Corpo da tabela: percorre os dados já filtrados e instancia uma linha por item. */}
            <Table.Body>
              {/* Mapeamento da lista para JSX: cada elemento do array gera um componente visual independente. */}
              {filteredUsers.map((data) => (
                <List
                  data={data}
                  fields={sortedFields}
                  ativo={userActive === data._id}
                  onClick={() => setuserActive(data._id)}
                  key={data._id}
                />
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Box>
    </VStack>
  );
}
