import styles from "./list.module.css";
import {
  formatCPF,
  formatDate,
  formatName,
  formatRG,
  formatProperNoun,
} from "../../utils/formatters";
import { selectOptions } from "../../utils/userSelectOptions";

export default function List({ data, ativo, onClick, page }) {
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
    <>
      {page === "PeopleManagement" ? (
        <tr
          className={ativo ? `${styles.listActive}` : `${styles.list}`}
          onClick={onClick}
        >
          <td>{data.user_mat}</td>
          <td>{formatName(data.user_name)}</td>
          <td>
            {data.user_type
              .map((id) => getFormattedValue("user_type", id))
              .join(" | ")}
          </td>
          <td>{formatCPF(data.user_cpf)}</td>
          <td>{formatRG(data.user_rg)}</td>
          <td>{formatDate(data.user_registration_date)}</td>
          <td>{formatDate(data.user_date_nasc)}</td>
          <td>{formatProperNoun(data.user_email)}</td>
          <td>{formatProperNoun(data.user_district)}</td>
          <td>{formatProperNoun(data.user_street)}</td>
          <td>{formatName(data.user_mother_name)}</td>
        </tr>
      ) : page === "CourseManagement" ? (
        <tr
          className={ativo ? `${styles.listActive}` : `${styles.list}`}
          onClick={onClick}
        >
          <td>{data.course_mat}</td>
          <td>{data.course_title}</td>
          <td>{getFormattedValue("course_type", data.course_type)}</td>
          <td>{data.course_time_start}</td>
          <td>{data.course_time_end}</td>
          <td>100</td>
        </tr>
      ) : (
        <>Desconhecido</>
      )}
    </>
  );
}
