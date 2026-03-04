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
  const filteredUsers = usersByType.filter(user => {
    return (
      (filters.situation === "" ||
        String(user.user_situation) === filters.situation) &&

      user.user_mat?.toString().includes(filters.mat) &&
      user.user_name?.toLowerCase().includes(filters.name.toLowerCase()) &&

      (
        filters.type.length === 0 ||
        user.user_type?.some(t =>
          filters.type.includes(String(t))
        )
      ) &&

      user.user_cpf?.includes(filters.cpf) &&
      user.user_rg?.includes(filters.rg) &&

      user.user_registration_date
        ?.replaceAll("-", "/")
        .includes(filters.admissionDate) &&

      user.user_date_nasc
        ?.replaceAll("-", "/")
        .includes(filters.birthDate) &&

      user.user_district?.toLowerCase().includes(filters.district.toLowerCase()) &&
      user.user_street?.toLowerCase().includes(filters.street.toLowerCase()) &&
      user.user_mother_name?.toLowerCase().includes(filters.mother.toLowerCase())
    );
  });

  //Função para voltar a tela
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <IoIosArrowDropleftCircle className="arrowBack" onClick={handleBack} />

      <h1 className={styles.title}>Cadastro de usuários do sistema</h1>

      <div className={styles.cardButtons}>
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
                  ativo={userActive === data._id}
                  onClick={() => setuserActive(data._id)}
                  page={"peopleManagement"}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
