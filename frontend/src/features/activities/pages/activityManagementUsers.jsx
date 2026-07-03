import { Link, useLocation } from "react-router-dom";
import { formatProperNoun } from "../../../utils/formatters";
import CardActivity from "../../../components/cards/cardActivity";
import usersServices from "../../../services/usersServices";
import { useEffect, useRef, useState } from "react";
import List from "../../../components/list/list";
import ActivityManagementUserActivity from "./activityManagementUserActivity";
import HeaderFilter from "../../../components/headerFilter";
import { peopleManagementTR } from "../../../utils/HeaderList.json";
import useTableFilter from "../../../hooks/useTableFilter";
import HandleBack from "../../../components/handleBack";
import { generateExcelPresences } from "../../../services/reports/presences/excelPresences";
import Presence from "../../../components/presence";
import { Table, Box, Button, Flex, Heading, HStack, Text } from "@chakra-ui/react";

export default function ActivityManagementUsers() {
  const location = useLocation();
  const { activityData } = location.state || {};
  const { getUsersByActivity, userListActivies, refetchUsers, } =
    usersServices();
  const [userActivityActive, setUserActivityActive] = useState(null);
  const [filters, setFilters] = useState({});
  const selectedUser = userListActivies?.find((u) => u._id === userActivityActive);
  const menuRef = useRef(null);

  useEffect(() => {
    if (refetchUsers && activityData?.activity_mat) {
      getUsersByActivity(activityData.activity_mat);
    }
  }, [refetchUsers, activityData]);

  //Função para atualizar filtros
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

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

  const [open, setOpen] = useState(false);
  // Função utilitária "toggleMenu" usada para alternar estados booleanos na interface.
  const toggleMenu = () => setOpen((prev) => !prev);

  //Função principal que vai filtrar na tela
  const filteredUsers = useTableFilter(
    userListActivies,
    filters,
    peopleManagementTR
  );

  const [presence, setPresence] = useState(null);
  // function that open the dialog of presences
  const handlePresence = () => {
    setPresence(true)
  }

  return (
    <Flex>
      <Box flex="1" minW={0}>
        <HandleBack />
        <Heading size="lg" color="gray.600">
          {formatProperNoun(activityData.activity_title)}
        </Heading>
        <Text color="gray.500" fontSize="md" mt={1}>Informações da atividade:</Text>

        <CardActivity data={activityData} />

        <HStack gap={2} mt={2}>
          <Link
            to={"/PeopleManagement/view"}
            state={{
              userId: userActivityActive,
              userData: selectedUser,
              currentMode: "V",
            }}
          >
            <Button size="xs" variant="surface" disabled={userActivityActive === null}>
              Visualizar
            </Button>
          </Link>

          <Link
            to={"/PeopleManagement/alter"}
            state={{
              userId: userActivityActive,
              userData: selectedUser,
              currentMode: "E",
            }}
          >
            <Button size="xs" variant="surface" disabled={userActivityActive === null}>Alterar</Button>
          </Link>

          <Box ref={menuRef} position="relative">
            <Button size="xs" variant="surface" onClick={toggleMenu}>
              Relatórios ▼
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
                <Box as="li" cursor="pointer" py={1} px={2} borderRadius="sm" _hover={{ filter: "brightness(0.92)" }}>Geral da turma</Box>
                <Box as="li" cursor="pointer" py={1} px={2} borderRadius="sm" _hover={{ filter: "brightness(0.92)" }}>Lista de alunos</Box>
                <Box as="li" cursor="pointer" py={1} px={2} borderRadius="sm" _hover={{ filter: "brightness(0.92)" }}>Frequência</Box>
                <Box as="li" cursor="pointer" py={1} px={2} borderRadius="sm" _hover={{ filter: "brightness(0.92)" }} onClick={handlePresence}>Presenças</Box>
                <Box as="li" cursor="pointer" py={1} px={2} borderRadius="sm" _hover={{ filter: "brightness(0.92)" }}>Prestação de contas</Box>
              </Box>
            )}
          </Box>

        </HStack>

        <Box overflowX="auto" border="1px solid" borderColor="gray.200" borderRadius="md" mt={3}>
          <Table.Root variant="line" size="sm" whiteSpace="nowrap">
            <HeaderFilter
              columns={peopleManagementTR}
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            <Table.Body>
              {filteredUsers.map((data) => (
                <List
                  key={data._id}
                  data={data}
                  columns={peopleManagementTR}
                  ativo={userActivityActive === data._id}
                  onClick={() => setUserActivityActive(data._id)}
                />
              ))}
            </Table.Body>
          </Table.Root>
        </Box>

      </Box>
      <Box w="50%" ml={4} mt="-65px" mr="-1em">
        <ActivityManagementUserActivity />
      </Box>

      <Presence
        open={presence}
        onClose={() => setPresence(null)}
        activityData={activityData}
        usersList={userListActivies.map((user) => ({
          matricula: user.user_mat,
          nome: user.user_name,
        }))}
      />
    </Flex>
  );
}
