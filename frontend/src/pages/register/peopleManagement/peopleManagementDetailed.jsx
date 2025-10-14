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
import { selectOptions } from "../../../utils/userSelectOptions"
import usersServices from "../../../services/usersServices";

export default function PeopleManagementDetailed() {
  const location = useLocation();
  const [listActive, setListActive] = useState("Cadastrais");
  const { getUserNextMat, refetchUsers, userNextMat } = usersServices();
  const { userId, userData, mode } = location.state || {};
  const navigate = useNavigate();

  const isViewMode = mode === "visualizar";
  const isEditMode = mode === "alterar";
  const isAddMode = mode === "inserir";

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
    "Outros",
    "Estrangeiro",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: typeof value === "string" ? value.toUpperCase() : value,
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
    <div div className={`${styles.pageContainer} main-page`}>
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

      <div>
        <form className={styles.peopleManagementForm}>
          {listActive === "Cadastrais" && (
            <div className={styles.formCard}>
              <div className={styles.formGroup}>
                <label htmlFor="mat">Matrícula:</label>
                <input
                  id="mat"
                  name="mat"
                  type="text"
                  value={isAddMode ? userNextMat : formData.mat || ""}
                  onChange={handleChange}
                  disabled={isViewMode || isEditMode || isAddMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="name">Nome:</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="mother_name">Nome da mãe:</label>
                <input
                  id="mother_name"
                  name="mother_name"
                  type="text"
                  value={formData.mother_name || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="father_name">Nome do Pai:</label>
                <input
                  id="father_name"
                  name="father_name"
                  type="text"
                  value={formData.father_name || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="ddd_cel">DDD celular:</label>
                <input
                  id="ddd_cel"
                  name="ddd_cel"
                  type="text"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Numero do celular:</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="gender">Sexo:</label>
                {isViewMode ? (
                  <input
                    type="text"
                    disabled
                    value={selectOptions.gender[formData.gender] || ""}
                  />
                ) : (
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender || ""}
                    onChange={handleChange}
                    disabled={isViewMode}
                    required
                  >
                    <option value="">Selecione...</option>
                    {Object.entries(selectOptions.gender).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="civil_status">Estado Civil:</label>
                {isViewMode ? (
                  <input
                    type="text"
                    disabled
                    value={selectOptions.civil_status[formData.civil_status] || ""}
                  />
                ) : (
                  <select
                    id="civil_status"
                    name="civil_status"
                    value={formData.civil_status || ""}
                    onChange={handleChange}
                    disabled={isViewMode}
                    required
                  >
                    <option value="">Selecione...</option>
                    {Object.entries(selectOptions.civil_status).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="date_nasc">Data de nascimento:</label>
                <input
                  id="date_nasc"
                  name="date_nasc"
                  type="text"
                  value={formData.date_nasc || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="nationality">Naturalidade:</label>
                <input
                  id="nationality"
                  name="nationality"
                  type="text"
                  value={formData.nationality || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="birthplace">Nacionalidade:</label>
                <input
                  id="birthplace"
                  name="birthplace"
                  type="text"
                  value={formData.birthplace || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="munic_nasc">Municipio de nascimento:</label>
                <input
                  id="munic_nasc"
                  name="munic_nasc"
                  type="text"
                  value={formData.munic_nasc || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="color">Raça / Cor da pele:</label>
                {isViewMode ? (
                  <input
                    type="text"
                    disabled
                    value={selectOptions.color[formData.color] || ""}
                  />
                ) : (
                  <select
                    id="color"
                    name="color"
                    value={formData.color || ""}
                    onChange={handleChange}
                    disabled={isViewMode}
                    required
                  >
                    <option value="">Selecione...</option>
                    {Object.entries(selectOptions.color).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="physically_disabled">Deficiente:</label>
                <input
                  id="physically_disabled"
                  name="physically_disabled"
                  type="text"
                  value={formData.physically_disabled || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="type_physically_disabled">
                  Tipo de Deficiencia:
                </label>
                <input
                  id="type_physically_disabled"
                  name="type_physically_disabled"
                  type="text"
                  value={formData.type_physically_disabled || ""}
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
                <label htmlFor="registration_date">Data de registro:</label>
                <input
                  id="registration_date"
                  name="registration_date"
                  type="text"
                  value={formData.registration_date || ""}
                  onChange={handleChange}
                  disabled={isViewMode || isEditMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="education">Escolaridade:</label>
                {isViewMode ? (
                  <input
                    type="text"
                    disabled
                    value={selectOptions.education[formData.education] || ""}
                  />
                ) : (
                  <select
                    id="education"
                    name="education"
                    value={formData.education || ""}
                    onChange={handleChange}
                    disabled={isViewMode}
                    required
                  >
                    <option value="">Selecione...</option>
                    {Object.entries(selectOptions.education).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="type_user">Tipo de usuário:</label>
                <input
                  id="type_user"
                  name="type_user"
                  type="text"
                  value={formData.type_user || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="free_period">Periodo livre:</label>
                <input
                  id="free_period"
                  name="free_period"
                  type="text"
                  value={formData.free_period || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="courses">Cursos:</label>
                <input
                  id="courses"
                  name="courses"
                  type="text"
                  value={formData.courses || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>
            </div>
          )}

          {listActive === "Documentos" && (
            <div className={styles.formCard}>
              <div className={styles.formGroup}>
                <label htmlFor="cpf">CPF:</label>
                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  value={formData.cpf || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="rg">RG:</label>
                <input
                  id="rg"
                  name="rg"
                  type="text"
                  value={formData.rg || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="date_of_issue_rg">Data emissão do RG:</label>
                <input
                  id="date_of_issue_rg"
                  name="date_of_issue_rg"
                  type="text"
                  value={formData.date_of_issue_rg || ""}
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
                  value={formData.expiration_date_rg || ""}
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
                  value={formData.issuing_authority_rg || ""}
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
                  value={formData.uf_rg || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>
            </div>
          )}

          {listActive === "Endereço" && (
            <div className={styles.formCard}>
              <div className={styles.formGroup}>
                <label htmlFor="cep">CEP:</label>
                <input
                  id="cep"
                  name="cep"
                  type="text"
                  value={formData.cep || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="state">Estado:</label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={formData.state || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="street">Endereço:</label>
                <input
                  id="street"
                  name="street"
                  type="text"
                  value={formData.street || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="number">Numero Endereço:</label>
                <input
                  id="number"
                  name="number"
                  type="text"
                  value={formData.number || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="complement">Complemento Endereço:</label>
                <input
                  id="complement"
                  name="complement"
                  type="text"
                  value={formData.complement || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="district">Bairro:</label>
                <input
                  id="district"
                  name="district"
                  type="text"
                  value={formData.district || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="municipality">Município</label>
                <input
                  id="municipality"
                  name="municipality"
                  type="text"
                  value={formData.municipality || ""}
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
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={formData.email || ""}
                  onChange={handleChange}
                  disabled={isViewMode}
                  required
                />
              </div>
            </div>
          )}

          {listActive === "Estrangeiro" && (
            <div>
              <h1>Funcionais</h1>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
