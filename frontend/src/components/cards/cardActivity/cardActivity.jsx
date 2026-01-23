import styles from "./cardActivity.module.css";
import { selectOptions } from "../../../utils/userSelectOptions";
import usersServices from "../../../services/usersServices";
import { useEffect } from "react";

export default function CardActivity({ data }) {
  const { getUsersByActivity, userListActivies, refetchUsers } =
    usersServices();

  useEffect(() => {
    if (refetchUsers) {
      getUsersByActivity(data.activity_mat);
    }
  }, [refetchUsers]);

  // Função segura para obter as opções
  const getSelectOptions = (fieldName) => {
    return selectOptions?.[fieldName] || {};
  };

  // Função segura para obter o valor formatado
  const getFormattedValue = (fieldName, value) => {
    if (!fieldName || value === undefined || value === null) return "";
    const options = getSelectOptions(fieldName);
    return options?.[value] || value || "";
  };

  return (
    <div className={styles.cardBox}>
      <div className={styles.cardContent}>
        <p>Nome:</p>
        <h1>{data.activity_title}</h1>
        <p>Quantidade de usuários: <strong>{userListActivies.length}</strong></p>
        <p>Inicio: <strong>{data.activity_time_start}</strong> - Fim <strong>{data.activity_time_end}</strong></p>
        <p>Código: <strong>{data.activity_mat}</strong></p>
        <p><strong>{getFormattedValue("activity_type", data.activity_type)}</strong></p>
      </div>
    </div>
  );
}
