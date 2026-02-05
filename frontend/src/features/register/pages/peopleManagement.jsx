import { useEffect, useRef, useState } from "react";
import CardUser from "../../../components/cards/cardUser/cardUser";
import List from "../../../components/list/list";
import styles from "../styles/peopleManagement.module.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/page";
import usersServices from "../../../services/usersServices";

export default function PeopleManagement() {
  const navigate = useNavigate();
  const [userActive, setuserActive] = useState(null);
  const { getUsers, refetchUsers, usersList, usersLoading } = usersServices();
  //const userSelected = usersList.find((user) => user._id === userActive);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [filters, setFilters] = useState({
    situation: "",
    mat: "",
    name: "",
    type: "",
    cpf: "",
    rg: "",
    admissionDate: "",
    birthDate: "",
    district: "",
    street: "",
    mother: ""
  });

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
    if (refetchUsers) {
      getUsers();
    }
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
  const filteredUsers = usersList.filter(user => {
    return (
      user.user_situation?.toLowerCase().includes(filters.situation.toLowerCase()) &&
      user.user_mat?.toString().includes(filters.mat) &&
      user.user_name?.toLowerCase().includes(filters.name.toLowerCase()) &&
      user.user_type?.some(t =>
        String(t).toLowerCase().includes(filters.type.toLowerCase())
      ) &&
      user.user_cpf?.includes(filters.cpf) &&
      user.user_rg?.includes(filters.rg) &&
      user.user_registration_date?.includes(filters.admissionDate) &&
      user.user_date_nasc?.includes(filters.birthDate) &&
      user.user_district?.toLowerCase().includes(filters.district.toLowerCase()) &&
      user.user_street?.toLowerCase().includes(filters.street.toLowerCase()) &&
      user.user_mother_name?.toLowerCase().includes(filters.mother.toLowerCase())
    );
  });

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
            currentMode: "A",
          }}
        >
          <button>Inserir</button>
        </Link>

        <Link
          to={"/PeopleManagement/view"}
          state={{
            userId: userActive,
            userData: usersList.find((u) => u._id === userActive),
            currentMode: "V",
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
            <ul className={styles.otherOptionBtns}>
              <Link
                to={"/PeopleManagementActivities"}
                state={{
                  userData: usersList.find((u) => u._id === userActive)
                }}
              >
                <li>Atividades</li>
              </Link>
            </ul>
          )}
        </div>
      </div>

      <div className={styles.cardList}>
        <table>
          <thead>
            <tr className={styles.searchFieldsTr}>
              <td>
                  Situação
              </td>
              <td>Matrícula</td>
              <td>Nome</td>
              <td>Tipo de usuário</td>
              <td>CPF</td>
              <td>RG</td>
              <td>Data Admissão</td>
              <td>Data Nasc.</td>
              <td>Bairro</td>
              <td>Rua</td>
              <td>Nome da mãe</td>
            </tr>

            <tr className={styles.searchFields}>
              <td className={styles.searchFieldsTd}><input onChange={e => handleFilterChange("situation", e.target.value)} /></td>
              <td><input onChange={e => handleFilterChange("mat", e.target.value)} /></td>
              <td><input onChange={e => handleFilterChange("name", e.target.value)} /></td>
              <td><input onChange={e => handleFilterChange("type", e.target.value)} /></td>
              <td><input onChange={e => handleFilterChange("cpf", e.target.value)} /></td>
              <td><input onChange={e => handleFilterChange("rg", e.target.value)} /></td>
              <td><input type="date" onChange={e => handleFilterChange("admissionDate", e.target.value)} /></td>
              <td><input type="date" onChange={e => handleFilterChange("birthDate", e.target.value)} /></td>
              <td><input onChange={e => handleFilterChange("district", e.target.value)} /></td>
              <td><input onChange={e => handleFilterChange("street", e.target.value)} /></td>
              <td><input onChange={e => handleFilterChange("mother", e.target.value)} /></td>
            </tr>
          </thead>

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
  );
}
