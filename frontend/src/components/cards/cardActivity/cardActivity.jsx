/*
    Type: Component
    Name: CardActivity
    Description:
      Componente cardActivity responsável por renderizar parte da interface do sistema.
    Author: Matheus Rodrigues
    Last Edit: 01/04/2026
*/

import styles from "./cardActivity.module.css";
import { selectOptions } from "../../../utils/userSelectOptions";
import usersServices from "../../../services/usersServices";
import { useEffect } from "react";

/*
  Componente principal do arquivo.
  A partir daqui ficam concentrados os estados, integrações,
  funções auxiliares e o JSX responsável pela renderização da tela.
*/
export default function CardActivity({ data }) {
  const { getUsersByActivity, userListActivies, refetchUsers } =
  // Serviço/hook de integração com a API, centralizando busca, envio e atualização de dados.
    usersServices();

  /*
    Efeito colateral executado conforme as dependências abaixo.
    Esse bloco é usado para sincronizar a interface com eventos externos,
    carregamento inicial, listeners ou reações a mudanças de estado.
  */
  useEffect(() => {
    if (refetchUsers) {
      getUsersByActivity(data.activity_mat);
    }
  }, [refetchUsers]);

  // Função segura para obter as opções
  const getSelectOptions = (fieldName) => {
    return selectOptions?.[fieldName] || {};
  };

  // Função segura para obter o valor formatado
  const getFormattedValue = (fieldName, value) => {
    if (!fieldName || value === undefined || value === null) return "";
    const options = getSelectOptions(fieldName);
    return options?.[value] || value || "";
  };

  /*
    Bloco de renderização.
    Aqui o componente transforma estado + props em interface visual.
    A leitura do JSX abaixo deve ser feita de cima para baixo, como a montagem da tela.
  */
  return (
    <div className={styles.cardBox}>
      <div className={styles.cardContent}>
        <h1>{data.activity_title} - {getFormattedValue("activity_type", data.activity_type).slice(3)}</h1>
        <p>Quantidade de usuários: <strong>{userListActivies.length}</strong></p>
        <p>Inicio: <strong>{data.activity_time_start}</strong> - Fim <strong>{data.activity_time_end}</strong></p>
        <p>Código: <strong>{data.activity_mat}</strong></p>
        <p>
          {Array.isArray(data.activity_days)
            ? data.activity_days
              .map(day => getFormattedValue("activity_days", day).slice(3))
              .join(" | ")
            : getFormattedValue("activity_days", data.activity_days).slice(3)}
        </p>
      </div>
    </div>
  );
}
