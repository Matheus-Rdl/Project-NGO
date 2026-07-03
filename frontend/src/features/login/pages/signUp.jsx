/*
    Type: Fonte
    User: Matheus Rodrigues
    Description: Tela de Cadastro de Usuários
    Date: 03/03/2026
*/

import { Link } from "react-router-dom";
import HeaderFilter from "../../../components/headerFilter";
import List from "../../../components/list/list";
import { peopleManagementTR } from "../../../utils/HeaderList.json";
import { useEffect, useState } from "react";
import usersServices from "../../../services/usersServices";
import HandleBack from "../../../components/handleBack";
import { Table, Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";

export default function SignUp() {
  const [userActive, setuserActive] = useState(null);
  const { getUsers, refetchUsers, usersLoading, getUsersByType, usersByType } = usersServices();
  const [filters, setFilters] = useState({
    situation: "",
    mat: "",
    name: "",
    type: [],
    cpf: "",
    rg: "",
    admissionDate: "",
    birthDate: "",
    district: "",
    street: "",
    mother: ""
  });

  //leva uma mensagem para o services, a função getUsers
  useEffect(() => {
    if (refetchUsers) {
      getUsers();
    }
  }, [refetchUsers]);

  useEffect(() => {
    getUsersByType([2, 4]); // Funcionário e Voluntário
  }, []);

  //Função para atualizar filtros
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  //Função principal que vai filtrar na tela
  const filteredUsers = usersByType.filter((user) => {
    return peopleManagementTR.every((col) => {

      const filterValue = filters[col.dataKey];
      const userValue = user[col.dataKey];

      if (!filterValue || filterValue.length === 0) return true;

      if (col.type === "select") {

        if (Array.isArray(userValue)) {
          return userValue.includes(Number(filterValue)) || userValue.includes(filterValue);
        }

        return String(userValue) === String(filterValue);
      }

      if (col.type === "multiselect") {
        return userValue?.some(v =>
          filterValue.includes(String(v))
        );
      }

      if (col.type === "date") {
        return String(userValue)
          .replaceAll("-", "/")
          .includes(filterValue);
      }

      return String(userValue)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());
    });
  });


  return (
    <VStack gap={4} align="stretch">
      <HandleBack/>

      <Heading size="lg" color="gray.600">Cadastro de usuários do sistema</Heading>

      <HStack gap={2}>
        <Link
          to={"/SignUp/view"}
          state={{
            userId: userActive,
            userData: usersByType.find((u) => u._id === userActive),
            currentMode: "V",
          }}
        >
          <Button size="xs" variant="surface" disabled={userActive === null}>
            Visualizar
          </Button>
        </Link>

        <Link
          to={"/SignUp/alter"}
          state={{
            userId: userActive,
            userData: usersByType.find((u) => u._id === userActive),
            currentMode: "E",
          }}
        >
          <Button size="xs" variant="surface" disabled={userActive === null}>Alterar</Button>
        </Link>
      </HStack>

      <Box overflowX="auto" border="1px solid" borderColor="gray.200" borderRadius="md" mt={4}>
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
