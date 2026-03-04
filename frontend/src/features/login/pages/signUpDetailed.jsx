/*
    Type: Fonte
    User: Matheus Rodrigues
    Description: Tela de Cadastro de Usuários Detalhada
    Date: 03/03/2026
*/

import styles from "../styles/signup.module.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import CardList from "../../../components/cards/cardList/cardList";
import { useEffect, useState } from "react";
import fieldsServices from "../../../services/fieldsServices";
import FormTextArea from "../../../components/formTextArea/formTextArea";

export default function SignUpDetailed() {

  const navigate = useNavigate();
  const location = useLocation();
  const { userId, userData, currentMode } = location.state || {};
  const { getFieldsByTitle, fieldsList } = fieldsServices();
  const [formData, setFormData] = useState({});

  //Lista de menus
  const [listActive, setListActive] = useState(1 /*"Cadastrais"*/);

  const isViewMode = currentMode === "V";
  const isEditMode = currentMode === "E";
  const isAddMode = currentMode === "A";

  console.log(userData)

  const listItems = {
    1: "Cadastrais",
    2: "Documentos"
  };

  useEffect(() => {
    getFieldsByTitle("users_system");
  }, []);

  //Função para voltar a tela
  const handleBack = () => {
    navigate(-1);
  };

  // Verifica a mudança dos inputs
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //CRUD
  //Função finalizando o formulário, inserir
  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <IoIosArrowDropleftCircle className="arrowBack" onClick={handleBack} />

      <h1 className={styles.title}>
        {isViewMode && "Cadastro de usuários do sistema - Visualizar"}
        {isAddMode && "Cadastro de usuários do sistema - Inserir"}
        {isEditMode && "Cadastro de usuários do sistema - Alterar"}
      </h1>

      <div className="cardListBox">
        {Object.entries(listItems).map(([key, label]) => (
          <CardList
            key={key}
            text={label}
            active={listActive === Number(key)}
            onClick={() => setListActive(Number(key))}
          />
        ))}
      </div>

      <form
        className={styles.managementForm}
        onSubmit={handleSubmitForm}
        autoComplete="off"
      >
        {/* ---------- DUMMY FIELDS PARA BLOQUEAR AUTOFILL ---------- */}
        <input
          type="text"
          name="fakeusernameremembered"
          style={{ display: "none" }}
          autoComplete="username"
        />
        <input
          type="password"
          name="fakepasswordremembered"
          style={{ display: "none" }}
          autoComplete="new-password"
        />
        {/* -------------------------------------------------------- */}
        <div className={styles.formCard}>
          {fieldsList.map((field) => (
            <div
              key={field._id}
              className={
                field.folder === listActive
                  ? styles.formField
                  : styles.formFieldHidden
              }
            >
              <FormTextArea
                field={field}
                addMode={isAddMode}
                viewMode={isViewMode}
                handleChange={handleChange}
                data={formData}
                currentMode={currentMode}
                nextMat={""}
                errors={""}
                dateRegister={""}
              />
            </div>
          ))}

          <div className={styles.btnForm}>
            <button onClick={handleBack}>Cancelar</button>
            {!isViewMode && <button type="submit">Salvar</button>}
          </div>
        </div>
      </form>



    </div>
  );
}
