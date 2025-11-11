import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/activityManagementDetailed.module.css";
import fieldsServices from "../../../services/fieldsServices";
import { useEffect, useState } from "react";
import CardList from "../../../components/cards/cardList/cardList";
import FormTextArea from "../../../components/formTextArea/formTextArea";
import { validateField } from "../../../utils/fieldValidators";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import activitiesServices from "../../../services/activitiesServices";
import { Snackbar, Alert } from "@mui/material";

export default function ActivityManagementDetailed() {
  const [formData, setFormData] = useState({});
  const [listActive, setListActive] = useState(1);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const { activityId, activityData, currentMode } = location.state || {};
  const { getFieldsByTitle, fieldsList } = fieldsServices();
  const {
    addActivity,
    getActivityNextMat,
    updateActivity,
    refetchActivities,
    activityNextMat,
  } = activitiesServices();

  //SnackBar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const isViewMode = currentMode === "V";
  const isEditMode = currentMode === "E";
  const isAddMode = currentMode === "A";

  const listItems = {
    1: "Cadastrais",
  };

  const initializeFormData = () => {
    const initialData = {};

    fieldsList.forEach((field) => {
      switch (field.field) {
        case "activity_mat":
          initialData[field.field] = activityNextMat || "";
          break;
        default:
          // Inicializa com string vazia para garantir que o campo exista
          initialData[field.field] = "";
      }
    });

    return initialData;
  };

  useEffect(() => {
    getFieldsByTitle("activities");
  }, []);

  if (isAddMode) {
    useEffect(() => {
      if (refetchActivities) {
        getActivityNextMat();
      }
    }, [refetchActivities]);
  }

  useEffect(() => {
    if (!isAddMode && activityData) {
      setFormData({ ...activityData });
    } else if (isAddMode) {
      setFormData(initializeFormData());
    }
  }, [isAddMode, activityData, activityNextMat, fieldsList]);

  //Valida os campos
  const validateFields = (fieldsList, formData) => {
    const newErrors = {};

    fieldsList.forEach((field) => {
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Função para voltar a tela
  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

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

    console.log(currentMode)

    // Verifica se vai atualizar ou adicionar
    if (currentMode === "A") {
      setErrors({});
      addActivity(completeFormData);
      showSnackbar("Usuário adicionado com sucesso!", "success");
      setTimeout(() => navigate(-1), 1500);
    } else {
      setErrors({});
      let updateData = {};
      for (const key in formData) {
        if (!(formData[key] === activityData[key])) {
          updateData[key] = formData[key];
        }
      }

      //Verifica o tamanho do Objeto de atualização
      if (!updateData || Object.keys(updateData).length === 0) {
        showSnackbar("Nenhum dado foi atualizado", "error");
      } else {
        updateActivity(formData._id, updateData);
        showSnackbar("Activity atualizado com sucesso!", "success");
        setTimeout(() => navigate(-1), 1500);
      }
    }
  };

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <IoIosArrowDropleftCircle className="arrowBack" onClick={handleBack} />
      <h1 className={styles.title}>
        {isViewMode && "Gerenciar Atividades - Visualizar"}
        {isAddMode && "Gerenciar Atividades - Inserir"}
        {isEditMode && "Gerenciar Atividades - Alterar"}
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
            {fieldsList.map((field) => (
              <div
                key={field._id}
                className={
                  field.folder === listActive
                    ? `${styles.formField}`
                    : `${styles.formFieldHidden}`
                }
              >
                <FormTextArea
                  field={field}
                  addMode={isAddMode}
                  viewMode={isViewMode}
                  handleChange={handleChange}
                  data={formData}
                  currentMode={currentMode}
                  errors={errors}
                  nextMat={activityNextMat}
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
