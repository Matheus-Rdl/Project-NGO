import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/peopleManagementDetailed.module.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import CardList from "../../../components/cards/cardList/cardList";
import { useEffect, useState } from "react";
import {
  formatCPF,
  formatDate,
  formatName,
  formatRG,
  formatProperNoun,
} from "../../../utils/formatters";
import { fieldsUsers } from "../../../utils/fields.json";
import { selectOptions } from "../../../utils/userSelectOptions";
import usersServices from "../../../services/usersServices";
import TextArea from "../../../components/formTextArea/formTextArea";
import FormTextArea from "../../../components/formTextArea/formTextArea";
import Select from "react-select";
import { getCurrentDate } from "../../../utils/dateFunctions";
import { Snackbar, Alert } from "@mui/material";
import fieldsServices from "../../../services/fieldsServices";
import { validateField } from "../../../utils/fieldValidators";

export default function PeopleManagementDetailed() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, userData, currentMode } = location.state || {};

  //Lista de menus
  const [listActive, setListActive] = useState(1 /*"Cadastrais"*/);

  //Utils
  const formattedDate = getCurrentDate();

  //Services
  const { addUser, getUserNextMat, updateUser, refetchUsers, userNextMat } =
    usersServices();
  const { getFieldsByTitle, fieldsList } = fieldsServices();

  //SnackBar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const isViewMode = currentMode === "V";
  const isEditMode = currentMode === "E";
  const isAddMode = currentMode === "A";

  // Lista dos menus do cadastro de usuários
  const listItems = {
    1: "Cadastrais",
    2: "Funcionais",
    3: "Documentos",
    4: "Endereço",
    5: "Contatos",
    6: "Outros",
  };

  // PeopleManagementDetailed.js

  const initializeFormData = () => {
    const initialData = {};

    fieldsList.forEach((field) => {
      switch (field.field) {
        case "user_mat":
          initialData[field.field] = userNextMat || "";
          break;
        //case "user_registration_date":
        //initialData[field.field] = formattedDate || "";
        //break;
        default:
          // Inicializa com string vazia para garantir que o campo exista
          initialData[field.field] = "";
      }
    });

    return initialData;
  };

  // No useEffect
  useEffect(() => {
    if (!isAddMode && userData) {
      setFormData({ ...userData });
    } else if (isAddMode) {
      setFormData(initializeFormData());
    }
  }, [isAddMode, userData, userNextMat, formattedDate, fieldsList]);

  // Leva uma mensagem para o services, a função getUserNextMat caso seja para adicionar usuário
  if (isAddMode) {
    useEffect(() => {
      if (refetchUsers) {
        getUserNextMat();
      }
    }, [refetchUsers]);
  }

  useEffect(() => {
    getFieldsByTitle("users");
  }, []);

  useEffect(() => {
  // valor que representa "SIM"
  const YES_VALUE = "1"; // ajuste se for "S", true, etc.

  if (formData.user_physically_disabled !== YES_VALUE) {
    setFormData((prev) => {
      // se já estiver vazio, não faz nada
      if (!prev.user_type_physically_disabled) return prev;

      return {
        ...prev,
        user_type_physically_disabled: "",
      };
    });
  }
}, [formData.user_physically_disabled]);


  //FUNÇõES
  /* COLOCA PARA MAIUSCULO, É MELHOR COLOCAR EM MAIUSCULO NA JHORA QUE ENVIAR O FORMULÁRIO
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: typeof value === "string" ? value.toUpperCase() : value,
    }));
  };
  */

  //Valida os campos
  const validateFields = (fieldsList, formData) => {
    const newErrors = {};

    
    fieldsList.forEach((field) => {
      
      if (field.dependsOn) {
        const { field: dependsField, value } = field.dependsOn;
  
        if (formData[dependsField] !== value) {
          return; // 🔥 não valida este campo
        }
      }

      const value = formData[field.field];
      const errors = validateField(field, value);

      if (errors.length > 0) {
        newErrors[field.field] = errors.join(", ");
      }
    });

    return newErrors;
  };

  //Aparece o snackbar
  const showSnackbar = (message, severity = "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Verifica a mudança dos inputs
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "user_cep" && value.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const dataCep = await res.json();

        if (!dataCep.erro) {
          setFormData((prev) => ({
            ...prev,
            user_street: dataCep.logradouro || "",
            user_district: dataCep.bairro || "",
            user_country: dataCep.localidade || "",
            user_state: dataCep.uf || "",
          }));
        } else {
          console.warn("CEP inválido!");
        }
      } catch (err) {
        console.warn("Erro ao consultar CEP: ", err);
      }
    }
  };

  /*
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  */

  /*
    const [mat, setMat] = useState("");
  
    useEffect(() => {
      if (!isAddMode && userData) {
        setMat(userData.mat|| "");
      }
    }, [isAddMode, userData]);
  */

  //Função para voltar a tela
  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  //CRUD
  //Função finalizando o formulário, inserir
  const handleSubmitForm = (e) => {
    e.preventDefault();

    const validationErrors = validateFields(fieldsList, formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      const fields = Object.keys(validationErrors)
        .map((key) => fieldsList.find((f) => f.field === key)?.title)
        .join(", ");

      if (fields.length <= 50) {
        showSnackbar(
          `Preencha todos os campos corretamente : ${fields}`,
          "error"
        );
      } else {
        showSnackbar(`Preencha todos os campos corretamente!`, "error");
      }
      return;
    }

    // Garante que todos os campos estejam presentes antes de enviar
    const completeFormData = { ...formData };

    // Verifica se algum campo da fieldsList está faltando e adiciona com valor vazio
    fieldsList.forEach((field) => {
      if (!(field.field in completeFormData)) {
        completeFormData[field.field] = "";
      }
    });

    // Verifica se vai atualizar ou adicionar
    if (currentMode === "A") {
      setErrors({});
      addUser(completeFormData);
      showSnackbar("Usuário adicionado com sucesso!", "success");
      setTimeout(() => navigate(-1), 1500);
    } else {
      setErrors({});
      let updateData = {};
      for (const key in formData) {
        if (!(formData[key] === userData[key])) {
          updateData[key] = formData[key];
        }
      }

      //Verifica o tamanho do Objeto de atualização
      if (!updateData || Object.keys(updateData).length === 0) {
        showSnackbar("Nenhum dado foi atualizado", "error");
      } else {
        updateUser(formData._id, updateData);
        showSnackbar("Usuário atualizado com sucesso!", "success");
        setTimeout(() => navigate(-1), 1500);
      }

      /* OPÇÃO MAIS MODERNA ESTUDAR!!!!
        const updateData = Object.entries(formData).reduce((acc, [key, value]) => {
          if (value !== userData[key]) {
            acc[key] = value; // adiciona a propriedade que mudou
          }
          return acc;
        }, {});
      */
    }
  };

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <IoIosArrowDropleftCircle className="arrowBack" onClick={handleBack} />
      <h1 className={styles.title}>
        {isViewMode && "Gestão de pessoas - Visualizar"}
        {isAddMode && "Gestão de pessoas - Inserir"}
        {isEditMode && "Gestão de pessoas - Alterar"}
      </h1>

      <div className={styles.cardListBox}>
        {Object.entries(listItems).map(([key, label]) => (
          <CardList
            key={key}
            text={label}
            active={listActive === Number(key)}
            onClick={() => setListActive(Number(key))}
          />
        ))}
      </div>

      <div>
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
            {fieldsList.map((field) => {

              // ✅ REGRA DE DEPENDÊNCIA (GENÉRICA)
              if (field.dependsOn) {
                const { field: dependsField, value } = field.dependsOn;

                if (formData[dependsField] !== value) {
                  return null; // 🔥 não renderiza o campo
                }
              }

              return (
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
                    nextMat={userNextMat}
                    errors={errors}
                    dateRegister={formattedDate}
                  />
                </div>
              );
            })}


            <div className={styles.btnForm}>
              <button onClick={handleBack}>Cancelar</button>
              {!isViewMode && <button type="submit">Salvar</button>}
            </div>
          </div>
        </form>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{
            width: "100%",
            fontSize: "1.1rem",
            fontWeight: "600",
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            ...(snackbarSeverity === "success" && {
              backgroundColor: "#00B050", // verde forte tipo Excel
              color: "white",
            }),
            ...(snackbarSeverity === "error" && {
              backgroundColor: "#D32F2F", // vermelho padrão do Material UI
            }),
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
