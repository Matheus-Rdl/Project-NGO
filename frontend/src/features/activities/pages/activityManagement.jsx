/*
    Type: Page
    Name: ActivityManagement
    Description:
      Página activityManagement responsável por orquestrar a tela, seus estados locais, integrações e componentes visuais.
    Author: Matheus Rodrigues
    Last Edit: 01/04/2026
*/

import { useEffect, useRef, useState } from "react";
import activitiesServices from "../../../services/activitiesServices";
import { Link } from "react-router-dom";
import List from "../../../components/list/list";
import { activitiesManagementTR } from "../../../utils/HeaderList.json";
import HeaderFilter from "../../../components/headerFilter";
import useTableFilter from "../../../hooks/useTableFilter";
import HandleBack from "../../../components/handleBack";
import { Table, Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";

export default function ActivityManagement() {
  const [activityActive, setActivityActive] = useState(null); // Estado local responsável por controlar "activityActive" durante o ciclo de vida do componente.
  const { getActivities, refetchActivities, activitiesList } = activitiesServices(); // Serviço/hook de integração com a API, centralizando busca, envio e atualização de dados.
  const [open, setOpen] = useState(false); // Estado local responsável por controlar "open" durante o ciclo de vida do componente.
  const menuRef = useRef(null); // Referência persistente usada para acessar "menuRef" sem provocar nova renderização.
  const toggleMenu = () => setOpen((prev) => !prev); // Função utilitária "toggleMenu" usada para alternar estados booleanos na interface.
  const [filters, setFilters] = useState({}); // Estado local responsável por controlar "filters" durante o ciclo de vida do componente.

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

  useEffect(() => {
    if (refetchActivities) {
      getActivities();
    }
  }, [refetchActivities]);

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
  const filteredActivities = useTableFilter(
    activitiesList,
    filters,
    activitiesManagementTR
  );

  return (
    <VStack gap={4} align="stretch">
      <HandleBack/>
      
      <Heading size="lg" color="gray.600">Gerenciar Atividades</Heading>

      {/* Ações principais da tela: inserir, visualizar, alterar e demais operações relacionadas ao registro selecionado. */}
      <HStack gap={2}>
        <Link
          to={"/ActivityManagement/add"}
          state={{
            activityId: activityActive,
            activityData: activitiesList.find((u) => u._id === activityActive),
            currentMode: "A",
          }}
        >
          <Button size="xs" variant="surface">Inserir</Button>
        </Link>

        <Link
          to={"/ActivityManagement/view"}
          state={{
            activityId: activityActive,
            activityData: activitiesList.find((u) => u._id === activityActive),
            currentMode: "V",
          }}
        >
          <Button size="xs" variant="surface" disabled={activityActive === null}>
            Visualizar
          </Button>
        </Link>

        <Link
          to={"/ActivityManagement/alter"}
          state={{
            activityId: activityActive,
            activityData: activitiesList.find((u) => u._id === activityActive),
            currentMode: "E",
          }}
        >
          <Button size="xs" variant="surface" disabled={activityActive === null}>Alterar</Button>
        </Link>

        <Box ref={menuRef} position="relative">
          <Button size="xs" variant="surface" disabled={activityActive === null} onClick={toggleMenu}>
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
              <Link to={'/ActivityManagementUsers'} state={{
                activityData: activitiesList.find((u) => u._id === activityActive)
              }}>
                <Box as="li" cursor="pointer" py={1} px={2} borderRadius="sm" _hover={{ filter: "brightness(0.92)" }}>
                  Alunos
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
            columns={activitiesManagementTR}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Corpo da tabela: percorre os dados já filtrados e instancia uma linha por item. */}
          <Table.Body>
            {/* Mapeamento da lista para JSX: cada elemento do array gera um componente visual independente. */}
            {filteredActivities.map((data) => (
              <List
                key={data._id}
                data={data}
                columns={activitiesManagementTR}
                ativo={activityActive === data._id}
                onClick={() => setActivityActive(data._id)}
              />
            ))}
          </Table.Body>

        </Table.Root>
      </Box>
    </VStack>
  );
}
