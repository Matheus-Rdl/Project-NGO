import styles from "./list.module.css";
import { formatCPF, formatDate, formatName, formatRG, formatProperNoun } from "../../utils/formatters";

export default function List({ data, ativo, onClick, page }) {

  return (
    <>
      {page === "PeopleManagement" ? (
        <tr
          className={ativo ? `${styles.listUserActive}` : `${styles.listUser}`}
          onClick={onClick}
        >
          <td>{data.user_mat}</td>
          <td>{formatName(data.user_name)}</td>
          <td>{formatCPF(data.user_cpf)}</td>
          <td>{formatRG(data.user_rg)}</td>
          <td>{formatDate(data.user_registration_date)}</td>
          <td>{formatDate(data.user_date_nasc)}</td>
          <td>{data.user_email}</td>
          <td>{formatProperNoun(data.user_district)}</td>
          <td>{formatProperNoun(data.user_street)}</td>
          <td>{formatName(data.user_mother_name)}</td>
        </tr>
      ) : page === "Classes" ? (
        <tr>
          <td>000001</td>
          <td>afsafs</td>
          <td>sdadasd</td>
          <td>dsadasdas</td>
          <td>dasdasda</td>
        </tr>
      ) : (
        <>Desconhecido</>
      )}
    </>
  );
}
