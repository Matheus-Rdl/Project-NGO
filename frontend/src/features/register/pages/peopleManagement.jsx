import { useEffect, useRef, useState } from "react";
import CardUser from "../../../components/cards/cardUser/cardUser";
import List from "../../../components/list/list";
import styles from "../styles/peopleManagement.module.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/page";
import usersServices from "../../../services/usersServices";
import { peopleManagementTR } from "../../../utils/HeaderList.json";
import HeaderFilter from "../../../components/table/headerFilter/headerFilter";
import useTableFilter from "../../../hooks/useTableFilter";

export default function PeopleManagement() {

  const navigate = useNavigate();
  const [userActive, setuserActive] = useState(null);
  const { getUsers, refetchUsers, usersList, usersLoading } = usersServices();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [filters, setFilters] = useState({});
  const selectedUser = usersList?.find((u) => u._id === userActive);

  const toggleMenu = () => setOpen((prev) => !prev);

  // Fecha o menu se clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //leva uma mensagem para o services, a função getUsers
  useEffect(() => {
    getUsers();
  }, [refetchUsers]);

  //Função para voltar a tela
  const handleBack = () => {
    navigate(-1);
  };

  //Função para atualizar filtros
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  //Função principal que vai filtrar na tela
  const filteredUsers = useTableFilter(
    usersList,
    filters,
    peopleManagementTR
  );


  //Ele carrega a pagina até encontrar os estudantes
  if (usersLoading) {
    return <Loading />;
  }


  return (
    <div className={`${styles.pageContainer} main-page`}>
      <IoIosArrowDropleftCircle className="arrowBack" onClick={handleBack} />

      <h1 className="title-page">Gestão de pessoas</h1>

      {/*
      <div className={styles.cardUserBox}>
        <CardUser title="Funcionários" quantity="145" />
        <CardUser title="Alunos" quantity="1.345" />
        <CardUser title="Responsáveis" quantity="545" />
        <CardUser title="Voluntários" quantity="399" />
      </div>
      */}

      <div className="card-buttons">
        <Link
          to={"/PeopleManagement/add"}
          state={{
            userId: userActive,
            userData: selectedUser,
            currentMode: "A",
          }}
        >
          <button>Inserir</button>
        </Link>

        <Link
          to={"/PeopleManagement/view"}
          state={{
            userId: userActive,
            userData: selectedUser,
            currentMode: "V",
          }}
        >
          <button disabled={userActive === null}>
            Visualizar
          </button>
        </Link>

        <Link
          to={"/PeopleManagement/alter"}
          state={{
            userId: userActive,
            userData: selectedUser,
            currentMode: "E",
          }}
        >
          <button disabled={userActive === null}>Alterar</button>
        </Link>

        <div ref={menuRef}>
          <button disabled={userActive === null} onClick={toggleMenu}>
            Outras opções ▼
          </button>

          {open && (
            <ul className="other-option-btns">
              <Link
                to={"/PeopleManagementActivities"}
                state={{
                  userData: selectedUser
                }}
              >
                <li>Atividades</li>
              </Link>
            </ul>
          )}
        </div>
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
