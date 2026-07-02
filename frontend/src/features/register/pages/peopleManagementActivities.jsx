import { useLocation } from "react-router-dom";
import styles from "../styles/peopleManagementActivities.module.css";
import ActivityManagementUserActivity from "../../activities/pages/activityManagementUserActivity";
import activitiesServices from "../../../services/activitiesServices";
import { useEffect, useState } from "react";
import CardActivity from "../../../components/cards/cardActivity";
import DialogAddActivity from "../../../components/dialog/dialogAddActivity/dialogAddActivity";
import HandleBack from "../../../components/handleBack/handleBack";

export default function PeopleManagementActivities() {
  const location = useLocation();
  const { userData } = location.state || {};
  const { getActivitiesByMat, userActivitiesList, refetchActivities } =
    activitiesServices();
  const [addActivity, setAddActivity] = useState(null);

  useEffect(() => {
    if (refetchActivities) {
      getActivitiesByMat(userData.user_activities);
    }
  }, [refetchActivities]);

  const handleAddActivity = () => {
    setAddActivity(true)
  }

  const handleSavedActivities = (activitiesMat) => {
    getActivitiesByMat(activitiesMat);
  };

  return (
    <>
      <div className={`${styles.pageContainer} main-page`}>
        <div className={styles.pageContainerContent}>
          <HandleBack/>
          <h1 className={styles.title}>Atividades do usuário</h1>

          <button onClick={handleAddActivity}>Adicionar Atividade</button>

          <div className={styles.pageContainerContentActivities}>
            {userActivitiesList.map((activity) => (
              <div key={activity._id} className={styles.activitiesBox}>
                <CardActivity key={activity._id} data={activity} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.pageContainerActivityManagementUserActivity}>
          <ActivityManagementUserActivity />
        </div>
        
      </div>

      <DialogAddActivity
        open={addActivity}
        onClose={() => setAddActivity(null)}
        userData={userData}
        onSaved={handleSavedActivities}
      />

    </>
  );
}
