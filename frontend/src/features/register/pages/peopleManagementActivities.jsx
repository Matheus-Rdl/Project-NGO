import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/peopleManagementActivities.module.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import ActivityManagementUserActivity from "../../activities/pages/activityManagementUserActivity";
import activitiesServices from "../../../services/activitiesServices";
import { useEffect } from "react";
import CardActivity from "../../../components/cards/cardActivity/cardActivity";

export default function PeopleManagementActivities() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state || {};
  const { getActivitiesByMat, userActivitiesList, refetchActivities } =
    activitiesServices();

  useEffect(() => {
    if (refetchActivities) {
      getActivitiesByMat(userData.user_activities);
    }
  }, [refetchActivities]);

  //Função para voltar a tela
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <div className={styles.pageContainerContent}>
        <IoIosArrowDropleftCircle className="arrowBack" onClick={handleBack} />
        <h1 className={styles.title}>Atividades do usuário</h1>
        <div className={styles.pageContainerContentActivities}>
          {userActivitiesList.map((activity) => (
            <div className={styles.activitiesBox}>
              <CardActivity key={activity._id} data={activity} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.pageContainerActivityManagementUserActivity}>
        <ActivityManagementUserActivity />
      </div>
    </div>
  );
}
