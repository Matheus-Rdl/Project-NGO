import { useEffect, useState } from "react";
import CardUser from "../../../components/cards/cardUser/cardUser";
import List from "../../../components/list/list";
import styles from "./peopleManagement.module.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../loading/page";
import usersServices from "../../../services/usersServices";

export default function PeopleManagement() {
  const navigate = useNavigate();
  const [userActive, setuserActive] = useState(null);
  const { getUsers, refetchUsers, usersList, usersLoading } = usersServices();
  const userSelected = usersList.find((user) => user._id === userActive);

  //leva uma mensagem para o services, a função getAvailablePlates
  useEffect(() => {
    if (refetchUsers) {
      getUsers();
    }
  }, [refetchUsers]);

  //Função para voltar a tela
  const handleBack = () => {
    navigate(-1);
  };

  //Ele carrega a pagina até encontrar os estudantes
  if (usersLoading) {
    return <Loading />;
  }

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <IoIosArrowDropleftCircle className="arrowBack" onClick={handleBack} />

      <h1 className={styles.title}>Gestão de pessoas</h1>

      <div className={styles.cardUserBox}>
        <CardUser title="Funcionários" quantity="145" />
        <CardUser title="Alunos" quantity="1.345" />
        <CardUser title="Responsáveis" quantity="545" />
        <CardUser title="Voluntários" quantity="399" />
      </div>

      <div className={styles.cardButtons}>
        <Link
          to={"/PeopleManagement/add"}
          state={{
            userId: userActive,
            userData: usersList.find((u) => u._id === userActive),
            mode: "inserir",
          }}
        >
          <button>Inserir</button>
        </Link>

        <Link
          to={"/PeopleManagement/view"}
          state={{
            userId: userActive,
            userData: usersList.find((u) => u._id === userActive),
            mode: "visualizar",
          }}
        >
          <button disabled={userActive === null}>
            {/*className={userActive ? `${styles.btnOn}` : `${styles.btnOff}`}*/}
            Visualizar
          </button>
        </Link>

        <Link
          to={"/PeopleManagement/alter"}
          state={{
            userId: userActive,
            userData: usersList.find((u) => u._id === userActive),
            mode: "alterar",
          }}
        >
          <button disabled={userActive === null}>Alterar</button>
        </Link>

        <button>Outras Opções</button>
      </div>

      <div className={styles.cardList}>
        <table>
          <thead>
            <tr>
              <td>Matrícula</td>
              <td>Nome</td>
              <td>CPF</td>
              <td>RG</td>
              <td>Data Admissão</td>
              <td>Data Nasc.</td>
              <td>Email</td>
              <td>Bairro</td>
              <td>Rua</td>
              <td>Nome da mãe</td>
            </tr>
          </thead>
          <tbody>
            {usersList.map((data) => (
              <List
                key={data._id}
                data={data}
                ativo={userActive === data._id}
                onClick={() => setuserActive(data._id)}
                page={"PeopleManagement"}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
