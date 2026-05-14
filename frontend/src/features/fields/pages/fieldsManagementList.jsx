/*
    Type: Page
    Name: FieldsManagementList
    Description:
      Página FieldsManagementList, mostra os campos em lista da coleção selecionada.
    Author: Matheus Rodrigues
    Last Edit: 21/04/2026
*/

import { useLocation } from "react-router-dom";
import HandleBack from "../../../components/handleBack/handleBack";
import styles from "../styles/fieldsManagement.module.css";
import HeaderFilter from "../../../components/table/headerFilter/headerFilter";
import { peopleManagementTR, activitiesManagementTR, fieldsManagementTR } from "../../../utils/HeaderList.json";
import { useEffect, useState } from "react";
import useTableFilter from "../../../hooks/useTableFilter";
import usersServices from "../../../services/usersServices";
import List from "../../../components/list/list";
import fieldsServices from "../../../services/fieldsServices";

export default function FieldsManagementList() {

  const [userActive, setuserActive] = useState(null); // Estado local responsável por controlar "userActive" durante o ciclo de vida do componente.
  const location = useLocation();
  const { collection, label } = location.state || {};
  const { getUsers, refetchUsers, userList, usersLoading } = usersServices(); // Serviço/hook de integração com a API, centralizando busca, envio e atualização de dados.
  const { getFieldsByTitle, refetchFields, fieldsList } = fieldsServices();
  const [filters, setFilters] = useState({}); // Estado local responsável por controlar "filters" durante o ciclo de vida do componente.
  const selectedUser = fieldsList?.find((u) => u._id === userActive);

  //leva uma mensagem para o services, a função getUsers
  useEffect(() => {
    getUsers();
  }, [refetchUsers]);

  useEffect(() => {
    if (collection) {
      getFieldsByTitle(collection);
    }
  }, [collection, refetchFields]);

  //console.log(fieldsList)

  //Função para atualizar filtros
  // Função de evento "handleFilterChange". Normalmente é acionada por clique, submit ou interação do usuário.
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Ordena os campos antes de aplicar os filtros
  const sortedFields = [...fieldsList].sort((a, b) => {

    // Primeiro ordena pela pasta/menu
    const folderA = Number(a.folder);
    const folderB = Number(b.folder);

    if (folderA !== folderB) {
      return folderA - folderB;
    }

    // Depois ordena pela ordem do campo
    const orderA = Number(a.order);
    const orderB = Number(b.order);

    return orderA - orderB;
  });

  //Função principal que vai filtrar na tela
  // Aplica a regra de filtro em memória antes da renderização, mantendo a tabela desacoplada da lógica de busca.
  const filteredUsers = useTableFilter(
    sortedFields,
    filters,
    fieldsManagementTR
  );

  return (
    <div className={`${styles.pageContainer} main-page`}>
      <HandleBack />
      <h1 className="title-page">Campos - {label}</h1>

      <div className="cardList">
        <div className="tableWrapper">
          {/* Estrutura tabular principal onde o cabeçalho e as linhas são montados dinamicamente. */}
          <table>
            <HeaderFilter
              columns={fieldsManagementTR}
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            {/* Corpo da tabela: percorre os dados já filtrados e instancia uma linha por item. */}
            <tbody>
              {/* Mapeamento da lista para JSX: cada elemento do array gera um componente visual independente. */}
              {filteredUsers.map((data) => (
                <List
                  key={data._id}
                  data={data}
                  columns={fieldsManagementTR}
                  ativo={userActive === data._id}
                  onClick={() => setuserActive(data._id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
