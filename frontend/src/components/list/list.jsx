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
          <td>{data.mat}</td>
          <td>{formatName(data.name)}</td>
          <td>{formatCPF(data.cpf)}</td>
          <td>{formatRG(data.rg)}</td>
          <td>{formatDate(data.registration_date)}</td>
          <td>{formatDate(data.date_nasc)}</td>
          <td>{data.email}</td>
          <td>{formatProperNoun(data.district)}</td>
          <td>{formatProperNoun(data.street)}</td>
          <td>{formatName(data.mother_name)}</td>
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
