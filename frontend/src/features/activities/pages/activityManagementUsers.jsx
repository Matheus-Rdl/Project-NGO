import { Link, useLocation } from "react-router-dom";
import styles from "../styles/activityManagementUsers.module.css";
import { formatProperNoun } from "../../../utils/formatters";
import CardActivity from "../../../components/cards/cardActivity/cardActivity";
import usersServices from "../../../services/usersServices";
import { useEffect, useState } from "react";
import List from "../../../components/list/list";
import ActivityManagementUserActivity from "./activityManagementUserActivity";
import HeaderFilter from "../../../components/table/headerFilter/headerFilter";
import { peopleManagementTR } from "../../../utils/HeaderList.json";
import useTableFilter from "../../../hooks/useTableFilter";
import HandleBack from "../../../components/handleBack/handleBack";

export default function ActivityManagementUsers() {
  const location = useLocation();
  const { activityData } = location.state || {};
  const { getUsersByActivity, userListActivies, refetchUsers, } =
    usersServices();
  const [userActivityActive, setUserActivityActive] = useState(null);
  const [filters, setFilters] = useState({});
  const selectedUser = userListActivies?.find((u) => u._id === userActivityActive);

  useEffect(() => {
    if (refetchUsers) {
      getUsersByActivity(activityData.activity_mat);
    }
  }, [refetchUsers]);

  //Função para atualizar filtros
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  //Função principal que vai filtrar na tela
  const filteredUsers = useTableFilter(
    userListActivies,
    filters,
    peopleManagementTR
  );

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <div className={styles.pageContainerContent}>
        <HandleBack/>
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

        </div>

        <div className="cardList">
          <div className="tableWrapper">
            <table>
              <HeaderFilter
                columns={peopleManagementTR}
                filters={filters}
                onFilterChange={handleFilterChange}
              />

              <tbody>
                {filteredUsers.map((data) => (
                  <List
                    key={data._id}
                    data={data}
                    columns={peopleManagementTR}
                    ativo={userActivityActive === data._id}
                    onClick={() => setUserActivityActive(data._id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <div className={styles.pageContainerActivityManagementUserActivity}>
        <ActivityManagementUserActivity />
      </div>
    </div>
  );
}
