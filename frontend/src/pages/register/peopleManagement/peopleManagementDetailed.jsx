import { useLocation, useNavigate } from "react-router-dom";
import styles from "./peopleManagementDetailed.module.css";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import CardListUser from "../../../components/cards/cardListUser/cardListUser";
import { useEffect, useState } from "react";
import {
  formatCPF,
  formatDate,
  formatName,
  formatRG,
  formatProperNoun,
} from "../../../utils/formatters";
import { fields } from "../../../utils/fields";
import { selectOptions } from "../../../utils/userSelectOptions";
import usersServices from "../../../services/usersServices";
import TextArea from "../../../components/formTextArea/formTextArea";
import FormTextArea from "../../../components/formTextArea/formTextArea";
import Select from "react-select";
import { getCurrentDate } from "../../../utils/dateFunctions"

export default function PeopleManagementDetailed() {
  const location = useLocation();
  const [listActive, setListActive] = useState("Cadastrais");
  const { getUserNextMat, refetchUsers, userNextMat } = usersServices();
  const { userId, userData, mode } = location.state || {};
  const navigate = useNavigate();
  const formattedDate = getCurrentDate();

  //console.log(userData)
  //console.log(fields)

  const isViewMode = mode === "visualizar";
  const isEditMode = mode === "alterar";
  const isAddMode = mode === "inserir";
  const view = mode;

  // Leva uma mensagem para o services, a função getUserNextMat caso seja para adicionar usuário
  if (isAddMode) {
    useEffect(() => {
      if (refetchUsers) {
        getUserNextMat();
      }
    }, [refetchUsers]);
  }

  // Lista dos menus do cadastro de usuários
  const listItems = [
    "Cadastrais",
    "Funcionais",
    "Documentos",
    "Endereço",
    "Contatos",
    "Outros",
  ];

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!isAddMode && userData) {
      setFormData({ ...userData }); // pega todos os campos de userData
    } else if (isAddMode) {
      setFormData({}); // limpa para adicionar
    }
  }, [isAddMode, userData]);

  //FUNÇõES
  // VErifica a mudança dos inputs 

  /* COLOCA PARA MAIUSCULO, É MELHOR COLOCAR EM MAIUSCULO NA JHORA QUE ENVIAR O FORMULÁRIO
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: typeof value === "string" ? value.toUpperCase() : value,
    }));
  };
  */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  {
    /*    
      const [mat, setMat] = useState("");
    
      useEffect(() => {
        if (!isAddMode && userData) {
          setMat(userData.mat|| "");
        }
      }, [isAddMode, userData]);
    */
  }

  //Função para voltar a tela
  const handleBack = () => {
    navigate(-1);
  };

  //console.log(listActive);

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <IoIosArrowDropleftCircle className="arrowBack" onClick={handleBack} />
      <h1 className={styles.title}>
        {isViewMode && "Gestão de pessoas - Visualizar"}
        {isAddMode && "Gestão de pessoas - Inserir"}
        {isEditMode && "Gestão de pessoas - Alterar"}
      </h1>

      <div className={styles.cardListBox}>
        {listItems.map((item) => (
          <CardListUser
            key={item}
            text={item}
            active={listActive === item}
            onClick={() => setListActive(item)}
          />
        ))}
      </div>

      {/*
      <form className={styles.peopleManagementForm}>
        <div className={styles.formCard}>
          {fields.map((field) => (
            <>
              <FormTextArea
                key={field.id}
                label={field.label}
                id={field.id}
                name={field.id}
                type={field.type}
                field={field.id}
                input={field.input}
                data={formData}
                view={isViewMode}
                onChange={handleChange}
              />
            </>
          ))}
        </div>
        <FormTextArea
          label={"Nome:"}
          id={"name"}
          name={"name"}
          type={"text"}
          field={"name"}
          data={formData}
          view={isViewMode}
          onChange={handleChange}
        />
      </form>
*/}

      <div>
        <form className={styles.peopleManagementForm}>
          {listActive === "Cadastrais" && (
            <div className={styles.formCard}>
              <div className={styles.formGroup}>
                <label htmlFor="user_mat">Matrícula:</label>
                <input
                  id="user_mat"
                  name="user_mat"
                  type="text"
                  value={isAddMode ? userNextMat : formData.user_mat || ""}
                  onChange={handleChange}
                  disabled={isViewMode || isEditMode || isAddMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_name">Nome:</label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  value={formData.user_name || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_mother_name">Nome da mãe:</label>
                <input
                  id="user_mother_name"
                  name="user_mother_name"
                  type="text"
                  value={formData.user_mother_name || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_father_name">Nome do Pai:</label>
                <input
                  id="user_father_name"
                  name="user_father_name"
                  type="text"
                  value={formData.user_father_name || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_gender">Sexo:</label>
                {isViewMode ? (
                  <input
                    type="text"
                    disabled
                    value={selectOptions.gender[formData.user_gender] || ""}
                  />
                ) : (
                  <select
                    id="user_gender"
                    name="user_gender"
                    value={formData.user_gender || ""}
                    onChange={handleChange}
                    disabled={isViewMode}
                    required
                  >
                    <option value="">Selecione...</option>
                    {Object.entries(selectOptions.gender).map(
                      ([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_civil_status">Estado Civil:</label>
                {isViewMode ? (
                  <input
                    type="text"
                    disabled
                    value={
                      selectOptions.civil_status[formData.user_civil_status] ||
                      ""
                    }
                  />
                ) : (
                  <select
                    id="user_civil_status"
                    name="user_civil_status"
                    value={formData.user_civil_status || ""}
                    onChange={handleChange}
                    disabled={isViewMode}
                    required
                  >
                    <option value="">Selecione...</option>
                    {Object.entries(selectOptions.civil_status).map(
                      ([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_date_nasc">Data de nascimento:</label>
                <input
                  id="user_date_nasc"
                  name="user_date_nasc"
                  type="text"
                  value={formData.user_date_nasc || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_naturality_country">Cidade de naturalidade:</label>
                <input
                  id="user_naturality_country"
                  name="user_naturality_country"
                  type="text"
                  value={formData.user_naturality_country || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>


              <div className={styles.formGroup}>
                <label htmlFor="user_naturality_state">Estado de naturalidade:</label>
                <input
                  id="user_naturality_state"
                  name="user_naturality_state"
                  type="text"
                  value={formData.user_naturality_state || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_nationality">Nacionalidade:</label>
                <input
                  id="user_nationality"
                  name="user_nationality"
                  type="text"
                  value={formData.user_nationality || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>
            </div>
          )}

          {listActive === "Funcionais" && (
            <div className={styles.formCard}>
              <div className={styles.formGroup}>
                <label htmlFor="user_registration_date">Data de registro:</label>
                <input
                  id="user_registration_date"
                  name="user_registration_date"
                  type="text"
                  value={isAddMode ? formattedDate : formData.user_registration_date || ""}
                  onChange={handleChange}
                  disabled={isViewMode || isEditMode || isAddMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_education">Escolaridade:</label>
                {isViewMode ? (
                  <input
                    type="text"
                    disabled
                    value={
                      selectOptions.education[formData.user_education] || ""
                    }
                  />
                ) : (
                  <select
                    id="user_education"
                    name="user_education"
                    value={formData.user_education || ""}
                    onChange={handleChange}
                    disabled={isViewMode}
                    required
                  >
                    <option value="">Selecione...</option>
                    {Object.entries(selectOptions.education).map(
                      ([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                )}
              </div>

              {/* =====-----=====-----===== TIPO DE USUÁRIO =====-----=====-----=====*/}
              <div className={styles.formGroup}>
                <label htmlFor="user_type">Tipo de Usuário:</label>
                {isViewMode ? (
                  <input
                    type="text"
                    disabled
                    value={
                      Array.isArray(formData.user_type)
                        ? formData.user_type
                            .map((id) => selectOptions.user_type[id])
                            .join(", ")
                        : selectOptions.user_type[formData.user_type] || ""
                    }
                    //  value: lógica para formatar o que aparece no modo de visualização:
                    //    - Array.isArray(formData.user_type)
                    //        verifica se user_type é um array (caso o campo suporte múltiplas escolhas).
                    //    - se for array: .map((id) => selectOptions.user_type[id])
                    //        transforma cada id em seu rótulo legível (ex: "1" -> "1 - Administrador").
                    //      .join(", ")
                    //        junta todos os rótulos numa string separada por vírgula para exibição.
                    //    - se não for array: tenta pegar selectOptions.user_type[formData.user_type]
                    //        (caso seja um único valor armazenado como string/number).
                    //    - || "" garante que, se não encontrar nada, mostra string vazia em vez de undefined.
                  />
                ) : (
                  // Se não for modo visualização (ou seja, modo de edição/inserção), renderiza o Select do react-select.
                  <Select
                    className={styles.multiSelect}
                    id="user_type"
                    name="user_type"
                    isMulti
                    // isMulti habilita seleção múltipla (tags) no react-select.
                    value={
                      Array.isArray(formData.user_type)
                        ? formData.user_type.map((id) => ({
                            value: String(id),
                            label: selectOptions.user_type[id],
                          }))
                        : []
                    }
                    // value: o react-select espera um array de objetos { value, label } para isMulti.
                    //    - Se formData.user_type for array, mapeamos cada id para { value: id, label: texto }.
                    //    - Caso contrário (nenhuma seleção), passamos [] (select vazio).
                    //    OBS: os "value" aqui são os mesmos IDs que você quer gravar no estado/backend.
                    onChange={(selectedOptions) => {
                      const values_user_type = selectedOptions.map(
                        (option) => option.value
                      );
                      setFormData((prev) => ({
                        ...prev,
                        user_type: values_user_type,
                      }));
                    }}
                    // onChange: callback quando o usuário altera a seleção
                    //    - selectedOptions é um array de objetos { value, label } (react-select).
                    //    - selectedOptions.map(...option.value) extrai apenas os valores (ids).
                    //    - setFormData atualiza o estado mantendo os outros campos (spread de prev)
                    //      e definindo user_type como o array de ids selecionados.
                    //    => Assim você mantém o formato de estado: formData.user_type === ["1","3",...].
                    options={Object.entries(selectOptions.user_type).map(
                      ([value, label]) => ({
                        value : String(value),
                        label,
                      })
                    )}
                    // options: constrói a lista de opções consumida pelo react-select
                    //     - Object.entries(selectOptions.user_type) transforma o objeto em array de pares [[key, val], ...].
                    //     - .map transforma cada par em { value, label }, que é o formato esperado por react-select.
                    isDisabled={isViewMode}
                    // isDisabled: desabilita o select quando em modo visualização (opcional redundância).
                    placeholder="Selecione um ou mais tipos..."
                    // placeholder visível quando não há seleção.

                    // classNamePrefix="react-select"
                    // classNamePrefix cria classes CSS com prefixo para facilitar estilização:
                    //     ex: .react-select__control, .react-select__multi-value, etc.
                  />
                )}
              </div>

              {/* =====-----=====-----===== PERIODO LIVRE =====-----=====-----=====*/}
              <div className={styles.formGroup}>
                <label htmlFor="user_free_period">Periodo livre:</label>
                {isViewMode ? (
                  <input
                    type="text"
                    disabled
                    value={
                      Array.isArray(formData.user_free_period)
                        ? formData.user_free_period
                            .map((id) => selectOptions.user_free_period[id])
                            .join(", ")
                        : selectOptions.user_free_period[formData.user_free_period] || ""
                    }
                  />
                ) : (
                  <Select
                    className={styles.multiSelect}
                    id="user_free_period"
                    name="user_free_period"
                    isMulti
                    value={
                      Array.isArray(formData.user_free_period)
                        ? formData.user_free_period.map((id) => ({
                            value: String(id),
                            label: selectOptions.user_free_period[id],
                          }))
                        : []
                    }
                    onChange={(selectedOptions) => {
                      const values = selectedOptions.map(
                        (option) => option.value
                      );
                      setFormData((prev) => ({
                        ...prev,
                        user_free_period: values,
                      }));
                    }}
                    options={Object.entries(selectOptions.user_free_period).map(
                      ([value, label]) => ({
                        value : String(value),
                        label,
                      })
                    )}
                    isDisabled={isViewMode}
                    placeholder="Selecione um ou mais periodos..."
                  />
                )}
              </div>

              {/* =====-----=====-----===== CURSOS =====-----=====-----=====*/}
              <div className={styles.formGroup}>
                <label htmlFor="user_courses">Cursos:</label>
                {isViewMode ? (
                  <input
                    type="text"
                    disabled
                    value={
                      Array.isArray(formData.user_courses)
                        ? formData.user_courses
                            .map((id) => selectOptions.user_courses[id])
                            .join(", ")
                        : selectOptions.user_courses[formData.user_courses] || ""
                    }
                  />
                ) : (
                  <Select
                    className={styles.multiSelect}
                    id="user_courses"
                    name="user_courses"
                    isMulti
                    value={
                      Array.isArray(formData.user_courses)
                        ? formData.user_courses.map((id) => ({
                            value: String(id),
                            label: selectOptions.user_courses[id],
                          }))
                        : []
                    }
                    onChange={(selectedOptions) => {
                      const values = selectedOptions.map(
                        (option) => option.value
                      );
                      setFormData((prev) => ({
                        ...prev,
                        user_courses: values,
                      }));
                    }}
                    options={Object.entries(selectOptions.user_courses).map(
                      ([value, label]) => ({
                        value : String(value),
                        label,
                      })
                    )}
                    isDisabled={isViewMode}
                    placeholder="Selecione um ou mais cursos..."
                  />
                )}
              </div>
            </div>
          )}

          {listActive === "Documentos" && (
            <div className={styles.formCard}>
              <div className={styles.formGroup}>
                <label htmlFor="user_cpf">CPF:</label>
                <input
                  id="user_cpf"
                  name="user_cpf"
                  type="text"
                  value={formData.user_cpf || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_rg">RG:</label>
                <input
                  id="user_rg"
                  name="user_rg"
                  type="text"
                  value={formData.user_rg || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div>
                {/*
              <div className={styles.formGroup}>
                <label htmlFor="date_of_issue_rg">Data emissão do RG:</label>
                <input
                  id="date_of_issue_rg"
                  name="date_of_issue_rg"
                  type="text"
                  value={formData.user_date_of_issue_rg || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="expiration_date_rg">
                  Data de validade do RG:
                </label>
                <input
                  id="expiration_date_rg"
                  name="expiration_date_rg"
                  type="text"
                  value={formData.user_expiration_date_rg || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="issuing_authority_rg">Orgão Emissor:</label>
                <input
                  id="issuing_authority_rg"
                  name="issuing_authority_rg"
                  type="text"
                  value={formData.user_issuing_authority_rg || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="uf_rg">UF do RG:</label>
                <input
                  id="uf_rg"
                  name="uf_rg"
                  type="text"
                  value={formData.user_uf_rg || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>
*/}
              </div>
            </div>
          )}

          {listActive === "Endereço" && (
            <div className={styles.formCard}>
              <div className={styles.formGroup}>
                <label htmlFor="user_cep">CEP:</label>
                <input
                  id="user_cep"
                  name="user_cep"
                  type="text"
                  value={formData.user_cep || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_country">Cidade:</label>
                <input
                  id="user_country"
                  name="user_country"
                  type="text"
                  value={formData.user_country || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_state">Estado:</label>
                <input
                  id="user_state"
                  name="user_state"
                  type="text"
                  value={formData.user_state || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_street">Endereço:</label>
                <input
                  id="user_street"
                  name="user_street"
                  type="text"
                  value={formData.user_street || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_number">Numero Endereço:</label>
                <input
                  id="user_number"
                  name="user_number"
                  type="text"
                  value={formData.user_number || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_complement">Complemento Endereço:</label>
                <input
                  id="user_complement"
                  name="user_complement"
                  type="text"
                  value={formData.user_complement || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_district">Bairro:</label>
                <input
                  id="user_district"
                  name="user_district"
                  type="text"
                  value={formData.user_district || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>
            </div>
          )}

          {listActive === "Contatos" && (
            <div className={styles.formCard}>
              <div className={styles.formGroup}>
                <label htmlFor="user_email">Email:</label>
                <input
                  id="user_email"
                  name="user_email"
                  type="text"
                  value={formData.user_email || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_phone">Numero do celular:</label>
                <input
                  id="user_phone"
                  name="user_phone"
                  type="text"
                  value={formData.user_phone || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>
            </div>
          )}

          {listActive === "Outros" && (
            <div className={styles.formCard}>
              <div className={styles.formGroup}>
                <label htmlFor="user_color">Raça / Cor da pele:</label>
                {isViewMode ? (
                  <input
                    type="text"
                    disabled
                    value={selectOptions.color[formData.user_color] || ""}
                  />
                ) : (
                  <select
                    id="user_color"
                    name="user_color"
                    value={formData.user_color || ""}
                    onChange={handleChange}
                    disabled={isViewMode}
                    required
                  >
                    <option value="">Selecione...</option>
                    {Object.entries(selectOptions.color).map(
                      ([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_physically_disabled">Deficiente:</label>
                {isViewMode ? (
                  <input
                    type="text"
                    disabled
                    value={
                      selectOptions.physically_disabled[
                        formData.user_physically_disabled
                      ] || ""
                    }
                  />
                ) : (
                  <select
                    id="user_physically_disabled"
                    name="user_physically_disabled"
                    value={formData.user_physically_disabled || ""}
                    onChange={handleChange}
                    disabled={isViewMode}
                    required
                  >
                    <option value="">Selecione...</option>
                    {Object.entries(selectOptions.physically_disabled).map(
                      ([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="user_type_physically_disabled">
                  Tipo de Deficiencia:
                </label>
                {isViewMode ? (
                  <input
                    type="text"
                    disabled
                    value={
                      selectOptions.type_physically_disabled[
                        formData.user_type_physically_disabled
                      ] || ""
                    }
                  />
                ) : (
                  <select
                    id="user_type_physically_disabled"
                    name="user_type_physically_disabled"
                    value={formData.user_type_physically_disabled || ""}
                    onChange={handleChange}
                    disabled={isViewMode}
                    required
                  >
                    <option value="">Selecione...</option>
                    {Object.entries(selectOptions.type_physically_disabled).map(
                      ([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
