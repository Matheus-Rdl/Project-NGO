import { useEffect, useState } from "react";
import coursesServices from "../../../services/coursesServices";
import styles from "./courseManagement.module.css";
import List from "../../../components/list/list";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDropleftCircle } from "react-icons/io";

export default function CourseManagement() {
  const navigate = useNavigate();
  const [courseActive, setCourseActive] = useState(null);
  const { getCourses, refetchCourses, coursesList } = coursesServices();

  useEffect(() => {
    if (refetchCourses) {
      getCourses();
    }
  }, [refetchCourses]);

  console.log(coursesList);

    //Função para voltar a tela
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <IoIosArrowDropleftCircle className="arrowBack" onClick={handleBack} />
      <h1 className={styles.title}>Gerenciar Cursos</h1>
      <div className={styles.cardButtons}>
        <Link
          to={"/CourseManagement/add"}
          state={{
            courseId: courseActive,
            courseData: coursesList.find((u) => u._id === courseActive),
            currentMode: "A",
          }}
        >
          <button>Inserir</button>
        </Link>

        <Link
          to={"/CourseManagement/view"}
          state={{
            courseId: courseActive,
            courseData: coursesList.find((u) => u._id === courseActive),
            currentMode: "V",
          }}
        >
          <button disabled={courseActive === null}>
            {/*className={courseActive ? `${styles.btnOn}` : `${styles.btnOff}`}*/}
            Visualizar
          </button>
        </Link>

        <Link
          to={"/CourseManagement/alter"}
          state={{
            courseId: courseActive,
            courseData: coursesList.find((u) => u._id === courseActive),
            currentMode: "E",
          }}
        >
          <button disabled={courseActive === null}>Alterar</button>
        </Link>

        <button>Outras Opções</button>
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
            {coursesList.map((data) => (
              <List
                key={data._id}
                data={data}
                ativo={courseActive === data._id}
                onClick={() => setCourseActive(data._id)}
                page={"CourseManagement"}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
