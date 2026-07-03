import { Link, useLocation } from "react-router-dom";
import styles from "../styles/activityManagementUsers.module.css";
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
import { Table, Box } from "@chakra-ui/react";

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
    <div className={`${styles.pageContainer} main-page`}>
      <div className={styles.pageContainerContent}>
        <HandleBack />
        <h1 className="title-page">
          {formatProperNoun(activityData.activity_title)}
        </h1>
        <h2 className="subtitle-page">Informações da atividade:</h2>

        <CardActivity data={activityData} />

        <div className="card-buttons">
          <Link
            to={"/PeopleManagement/view"}
            state={{
              userId: userActivityActive,
              userData: selectedUser,
              currentMode: "V",
            }}
          >
            <button disabled={userActivityActive === null}>
              Visualizar
            </button>
          </Link>

          <Link
            to={"/PeopleManagement/alter"}
            state={{
              userId: userActivityActive,
              userData: selectedUser,
              currentMode: "E",
            }}
          >
            <button disabled={userActivityActive === null}>Alterar</button>
          </Link>

          <div ref={menuRef}>
            <button onClick={toggleMenu}>
              Relatórios ▼
            </button>

            {/* Renderização condicional: esse bloco só aparece quando o estado correspondente estiver ativo. */}
            {open && (
              <ul className="other-option-btns">
                {/*
                <li onClick={() =>
                  generateExcelPresences({
                    turma: activityData,
                    mes: 5,
                    ano: 2026,
                    alunos: userListActivies.map((user) => ({
                      matricula: user.user_mat,
                      nome: user.user_name,
                    })),
                  })
                }>Presenças</li>
                */}
                <li>Geral da turma</li>
                <li>Lista de alunos</li>
                <li>Frequência</li>
                <li onClick={handlePresence}>Presenças</li>
                <li>Prestação de contas</li>
              </ul>
            )}
          </div>

        </div>

        <Box overflowX="auto" border="1px solid" borderColor="gray.200" borderRadius="md">
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

      </div>
      <div className={styles.pageContainerActivityManagementUserActivity}>
        <ActivityManagementUserActivity />
      </div>

      <Presence
        open={presence}
        onClose={() => setPresence(null)}
        activityData={activityData}
        usersList={userListActivies.map((user) => ({
          matricula: user.user_mat,
          nome: user.user_name,
        }))}
      />
    </div>

  );
}
