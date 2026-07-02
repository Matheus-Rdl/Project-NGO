//import { Dialog } from '@mui/material';
import styles from './dialogAddActivity.module.css'
import { selectOptions } from "../../../utils/userSelectOptions";
import Select from "react-select";
import CardList from '../../cards/cardList';
import { useEffect, useState } from 'react';
import activitiesServices from '../../../services/activitiesServices';
import CardActivitySelect from '../../cards/cardActivitySelect';
import usersServices from '../../../services/usersServices';

export default function DialogAddActivity({ open, onClose, userData, onSaved }) {

  const { getActivitiesByType, activityTypeList, refetchActivities } =
    activitiesServices();

  const { getActivities, activitiesList } = activitiesServices();
  const { updateUserActivities } = usersServices();

  useEffect(() => {
    getActivities();
  }, []);


  const [selectedActivities, setSelectedActivities] = useState([]);

  useEffect(() => {
    if (userData?.user_activities) {
      setSelectedActivities(userData.user_activities);
    }
  }, [userData]);

  //Lista de menus
  const [listActive, setListActive] = useState(1 /*"Cadastrais"*/);

  //Lista dos menus do cadastro de usuários
  const activity_type = {
    1: "1 - Inglês",
    2: "2 - Espanhol",
    3: "3 - Fotografia",
    4: "4 - Genérico",
  };

  useEffect(() => {
    if (refetchActivities) {
      getActivitiesByType(["1", "2", "3", "4"]);
    }
  }, [refetchActivities]);

  //Botão do checkBox
  const handleToggle = (activityMat) => {
    setSelectedActivities(prev =>
      prev.includes(activityMat)
        ? prev.filter(mat => mat !== activityMat) // remove
        : [...prev, activityMat] // adiciona
    );
  };

  //Botão para salvar as alterações
  const handleSave = async () => {
    await updateUserActivities(userData._id, selectedActivities);

    // força atualização das atividades
    if (typeof onSaved === "function") {
      onSaved(selectedActivities);
    }

    onClose();
  };



  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <div className={styles.dialogBox}>
        <h1 className={styles.dialogTitle}>Adicionar atividade</h1>
        <div>
          <div className={styles.cardListBox}>
            {Object.entries(activity_type).map(([key, label]) => (
              <CardList
                key={key}
                text={label.slice(3)}
                active={listActive === Number(key)}
                onClick={() => setListActive(Number(key))}
              />
            ))}
          </div>
          {activityTypeList.map((activity) => (
            <div
              key={activity._id}
              className={
                activity.activity_type === String(listActive)
                  ? styles.cardBoxActivity
                  : styles.cardBoxActivityHidden
              }>
              <input
                type="checkbox"
                checked={selectedActivities.includes(activity.activity_mat)}
                onChange={() => handleToggle(activity.activity_mat)}
                className={styles.checkBoxActivity}
              />
              <div className={styles.cardBoxActivityDiv}>
                <CardActivitySelect key={activity._id} data={activity} />
              </div>
            </div>
          ))}

        </div>
        <button className={styles.btnSaveActivity} onClick={handleSave}>
          Salvar
        </button>
      </div>
    </Dialog>
  );
}