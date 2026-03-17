/*
    Type: Fonte
    User: Matheus Rodrigues
    Description: Tela de Cadastro de Usuários
    Date: 03/03/2026
*/

import { IoIosArrowDropleftCircle } from "react-icons/io";
import styles from "../styles/signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import HeaderFilter from "../../../components/table/headerFilter/headerFilter";
import List from "../../../components/list/list";
import { peopleManagementTR } from "../../../utils/HeaderList.json";
import { useEffect, useState } from "react";
import usersServices from "../../../services/usersServices";

export default function SignUp() {

  const navigate = useNavigate();
  const [userActive, setuserActive] = useState(null);
  const { getUsers, refetchUsers, usersLoading, getUsersByType, usersByType } = usersServices();
  const [filters, setFilters] = useState({
    situation: "",
    mat: "",
    name: "",
    type: [],
    cpf: "",
    rg: "",
    admissionDate: "",
    birthDate: "",
    district: "",
    street: "",
    mother: ""
  });

  //leva uma mensagem para o services, a função getUsers
  useEffect(() => {
    if (refetchUsers) {
      getUsers();
    }
  }, [refetchUsers]);

  useEffect(() => {
    getUsersByType([2, 4]); // Funcionário e Voluntário
  }, []);

  //Função para atualizar filtros
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  //Função principal que vai filtrar na tela
  const filteredUsers = usersByType.filter((user) => {
    return peopleManagementTR.every((col) => {

      const filterValue = filters[col.dataKey];
      const userValue = user[col.dataKey];

      if (!filterValue || filterValue.length === 0) return true;

      if (col.type === "select") {

        if (Array.isArray(userValue)) {
          return userValue.includes(Number(filterValue)) || userValue.includes(filterValue);
        }

        return String(userValue) === String(filterValue);
      }

      if (col.type === "multiselect") {
        return userValue?.some(v =>
          filterValue.includes(String(v))
        );
      }

      if (col.type === "date") {
        return String(userValue)
          .replaceAll("-", "/")
          .includes(filterValue);
      }

      return String(userValue)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());
    });
  });

  //Função para voltar a tela
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <IoIosArrowDropleftCircle className="arrowBack" onClick={handleBack} />

      <h1 className="title-page">Cadastro de usuários do sistema</h1>

      <div className="card-buttons">
        {/*
        <Link
          to={"/SignUp/add"}
          state={{
            userId: userActive,
            userData: usersByType.find((u) => u._id === userActive),
            currentMode: "A",
          }}
        >
          <button>Inserir</button>
        </Link>
        */}

        <Link
          to={"/SignUp/view"}
          state={{
            userId: userActive,
            userData: usersByType.find((u) => u._id === userActive),
            currentMode: "V",
          }}
        >
          <button disabled={userActive === null}>
            {/*className={userActive ? `${styles.btnOn}` : `${styles.btnOff}`}*/}
            Visualizar
          </button>
        </Link>

        <Link
          to={"/SignUp/alter"}
          state={{
            userId: userActive,
            userData: usersByType.find((u) => u._id === userActive),
            currentMode: "E",
          }}
        >
          <button disabled={userActive === null}>Alterar</button>
        </Link>
      </div>

      <div className="cardList">
        <div className="tableWrapper">
          <table>
            <HeaderFilter
              columns={peopleManagementTR}
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            <tbody>
              {filteredUsers.map((data) => (
                <List
                  key={data._id}
                  data={data}
                  columns={peopleManagementTR}
                  ativo={userActive === data._id}
                  onClick={() => setuserActive(data._id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
