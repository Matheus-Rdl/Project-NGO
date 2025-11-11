import { useEffect, useRef, useState } from "react";
import activitiesServices from "../../../services/activitiesServices";
import styles from "../styles/activityManagement.module.css";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import List from "../../../components/list/list";

export default function ActivityManagement() {
  const navigate = useNavigate();
  const [activityActive, setActivityActive] = useState(null);
  const { getActivities, refetchActivities, activitiesList } = activitiesServices();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
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

  useEffect(() => {
    if (refetchActivities) {
      getActivities();
    }
  }, [refetchActivities]);

  //Função para voltar a tela
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <IoIosArrowDropleftCircle className="arrowBack" onClick={handleBack} />
      <h1 className={styles.title}>Gerenciar Atividades</h1>
      <div className={styles.cardButtons}>
        <Link
          to={"/ActivityManagement/add"}
          state={{
            activityId: activityActive,
            activityData: activitiesList.find((u) => u._id === activityActive),
            currentMode: "A",
          }}
        >
          <button>Inserir</button>
        </Link>

        <Link
          to={"/ActivityManagement/view"}
          state={{
            activityId: activityActive,
            activityData: activitiesList.find((u) => u._id === activityActive),
            currentMode: "V",
          }}
        >
          <button disabled={activityActive === null}>
            {/*className={activityActive ? `${styles.btnOn}` : `${styles.btnOff}`}*/}
            Visualizar
          </button>
        </Link>

        <Link
          to={"/ActivityManagement/alter"}
          state={{
            activityId: activityActive,
            activityData: activitiesList.find((u) => u._id === activityActive),
            currentMode: "E",
          }}
        >
          <button disabled={activityActive === null}>Alterar</button>
        </Link>

        <div ref={menuRef}>
          <button disabled={activityActive === null} onClick={toggleMenu}>
            Outras opções ▼
          </button>

          {open && (
            <ul className={styles.otherOptionBtns}>
              <Link to={'/ActivityManagementUsers'} state={{
                activityData: activitiesList.find((u) => u._id === activityActive)
              }}>
                <li>Alunos</li>
              </Link>
            </ul>
          )}
        </div>
      </div>

      <div className={styles.cardList}>
        <table>
          <thead>
            <tr>
              <td>Código</td>
              <td>Nome</td>
              <td>Tipo</td>
              <td>Horário de inicio</td>
              <td>Horário final</td>
              <td>Alunos</td>
            </tr>
          </thead>
          <tbody>
            {activitiesList.map((data) => (
              <List
                key={data._id}
                data={data}
                ativo={activityActive === data._id}
                onClick={() => setActivityActive(data._id)}
                page={"activityManagement"}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
