/*
    Type: Fonte
    User: Matheus Rodrigues
    Description: Tela de Cadastro de Usuários Detalhada
    Date: 03/03/2026
*/

import styles from "../styles/signup.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import CardList from "../../../components/cards/cardList";
import { useEffect, useState } from "react";
import fieldsServices from "../../../services/fieldsServices";
import FormTextArea from "../../../components/formTextArea/formTextArea";
import userSystemServices from "../../../services/usersSystemServices";
import {
  formatCPF,
  formatDate,
  formatName,
  formatRG,
  formatProperNoun,
} from "../../../utils/formatters";
import HandleBack from "../../../components/handleBack/handleBack";

export default function SignUpDetailed() {

  const navigate = useNavigate();
  const location = useLocation();
  const { userId, userData, currentMode } = location.state || {};
  const { getFieldsByTitle, fieldsList } = fieldsServices();
  const { getUserSystemByMat, upsertUserSystem } = userSystemServices();
  const [formData, setFormData] = useState({});

  //Lista de menus
  const [listActive, setListActive] = useState(1 /*"Cadastrais"*/);

  const isViewMode = currentMode === "V";
  const isEditMode = currentMode === "E";
  const isAddMode = currentMode === "A";

  const listItems = {
    1: "Cadastrais",
    2: "Documentos"
  };

  useEffect(() => {
    getFieldsByTitle("users_system");
  }, []);

  useEffect(() => {
    if (userData?.user_mat) {
      getUserSystemByMat(userData.user_mat)
        .then(result => {
          if (result.success && result.body) {
            setFormData(result.body);
          }
        })
    }
  }, [userData])

  //Função para voltar a tela
  const handleBack = (e) => {
    e.preventDefault();
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

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!userData?.user_mat) return;

    const payload = {
      ...formData,
      user_system_mat: userData.user_mat
    };

    const result = await upsertUserSystem(userData.user_mat, payload);

    if (result.success) {
      navigate(-1)
    }

  };

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <HandleBack/>

      <h1 className="title-page">
        {isViewMode && "Cadastro de usuários do sistema - Visualizar"}
        {isAddMode && "Cadastro de usuários do sistema - Inserir"}
        {isEditMode && "Cadastro de usuários do sistema - Alterar"}
      </h1>

      <h2 className="subtitle-page">{userData.user_mat} - {formatName(userData.user_name)}</h2>

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
        className="management-form"
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
        <div className="form-card">
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

          <div className="button-box">
            <button onClick={handleBack}>Cancelar</button>
            {!isViewMode && <button type="submit">Salvar</button>}
          </div>
        </div>
      </form>



    </div>
  );
}
