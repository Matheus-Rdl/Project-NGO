/*
    Type: Page
    Name: PeopleManagement
    Description:
      Página peopleManagement responsável por orquestrar a tela, seus estados locais, integrações e componentes visuais.
    Author: Matheus Rodrigues
    Last Edit: 01/04/2026
*/

import { useEffect, useRef, useState } from "react";
import List from "../../../components/list/list";
import { Link } from "react-router-dom";
import Loading from "../../../components/loading";
import usersServices from "../../../services/usersServices";
import { peopleManagementTR } from "../../../utils/HeaderList.json";
import HeaderFilter from "../../../components/headerFilter";
import useTableFilter from "../../../hooks/useTableFilter";
import HandleBack from "../../../components/handleBack";
import { Table, Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";

export default function PeopleManagement() {

  const [userActive, setuserActive] = useState(null); // Estado local responsável por controlar "userActive" durante o ciclo de vida do componente.
  const { getUsers, refetchUsers, usersList, usersLoading } = usersServices(); // Serviço/hook de integração com a API, centralizando busca, envio e atualização de dados.
  const [open, setOpen] = useState(false); // Estado local responsável por controlar "open" durante o ciclo de vida do componente.
  const menuRef = useRef(null); // Referência persistente usada para acessar "menuRef" sem provocar nova renderização.
  const [filters, setFilters] = useState({}); // Estado local responsável por controlar "filters" durante o ciclo de vida do componente.
  const selectedUser = usersList?.find((u) => u._id === userActive);

  // Função utilitária "toggleMenu" usada para alternar estados booleanos na interface.
  const toggleMenu = () => setOpen((prev) => !prev);

  // Fecha o menu se clicar fora
  useEffect(() => {
  // Função de evento "handleClickOutside". Normalmente é acionada por clique, submit ou interação do usuário.
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //leva uma mensagem para o services, a função getUsers
  useEffect(() => {
    getUsers();
  }, [refetchUsers]);

  //Função para atualizar filtros
  // Função de evento "handleFilterChange". Normalmente é acionada por clique, submit ou interação do usuário.
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  //Função principal que vai filtrar na tela
  // Aplica a regra de filtro em memória antes da renderização, mantendo a tabela desacoplada da lógica de busca.
  const filteredUsers = useTableFilter(
    usersList,
    filters,
    peopleManagementTR
  );


  //Ele carrega a pagina até encontrar os estudantes
  if (usersLoading) {
    return <Loading />;
  }


  return (
    <VStack gap={4} align="stretch">
      <HandleBack/>

      <Heading size="lg" color="gray.600">Gestão de pessoas</Heading>

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

      <Box overflowX="auto" border="1px solid" borderColor="gray.200" borderRadius="md" mt={4}>
        <Table.Root variant="line" size="sm" whiteSpace="nowrap">
          {/* Estrutura tabular principal onde o cabeçalho e as linhas são montados dinamicamente. */}
          <HeaderFilter
            columns={peopleManagementTR}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Corpo da tabela: percorre os dados já filtrados e instancia uma linha por item. */}
          <Table.Body>
            {/* Mapeamento da lista para JSX: cada elemento do array gera um componente visual independente. */}
            {filteredUsers.map((data) => (
              <List
                key={data._id}
                data={data}
                columns={peopleManagementTR}
                ativo={userActive === data._id}
                onClick={() => setuserActive(data._id)}
              />
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </VStack>
  );
}
