import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/activityManagementUsers.module.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import {
  formatProperNoun,
} from "../../../utils/formatters";
import CardActivity from "../../../components/cards/cardActivity/cardActivity";
import usersServices from "../../../services/usersServices";
import { useEffect, useState } from "react";
import List from "../../../components/list/list";

export default function ActivityManagementUsers() {
  const navigate = useNavigate();
  const location = useLocation();
  const { activityData } = location.state || {};
  const { getUsersByActivity, userListActivies, refetchUsers } = usersServices()
  const [userActivityActive, setUserActivityActive] = useState(null);

  useEffect(() => {
    if (refetchUsers) {
      getUsersByActivity(activityData.activity_mat);
    }
  }, [refetchUsers]);

  console.log(userListActivies)

  //Função para voltar a tela
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <IoIosArrowDropleftCircle className="arrowBack" onClick={handleBack} />
      <h1 className={styles.title}>Alunos {formatProperNoun(activityData.activity_title)}</h1>
      <h2 className={styles.subtitle}>Turma:</h2>
      <CardActivity
        data={activityData}
      />
      <div className={styles.cardList}>
        <table>
          <thead>
            <tr>
              <td>Matrícula</td>
              <td>Nome</td>
              <td>Data Admissão</td>
              <td>Data Nasc.</td>
            </tr>
          </thead>
          <tbody>
            {userListActivies.map((data) => (
              <List
                key={data._id}
                data={data}
                ativo={userActivityActive === data._id}
                onClick={() => setUserActivityActive(data._id)}
                page={"activityManagementUsers"}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
