import styles from "./cardActivitySelect.module.css";
import { selectOptions } from "../../../utils/userSelectOptions";
import usersServices from "../../../services/usersServices";
import { useEffect } from "react";

export default function CardActivitySelect({ data }) {
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
        <h1>{data.activity_title}</h1>
        <p>Quantidade de usuários: <strong>{userListActivies.length}</strong></p>
        <p>Inicio: <strong>{data.activity_time_start}</strong> - Fim <strong>{data.activity_time_end}</strong></p>
        <p>
          {Array.isArray(data.activity_days)
            ? data.activity_days
              .map(day => getFormattedValue("activity_days", day).slice(3))
              .join(" | ")
            : getFormattedValue("activity_days", data.activity_days).slice(3)}
        </p>
      </div>
    </div>
  );
}
