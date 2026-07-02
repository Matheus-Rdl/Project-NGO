/*
    Type: Page
    Name: PeopleManagement
    Description:
      Página peopleManagement responsável por orquestrar a tela, seus estados locais, integrações e componentes visuais.
    Author: Matheus Rodrigues
    Last Edit: 01/04/2026
*/

import { useEffect, useRef, useState } from "react";
import List from "../../../components/list/list";
import styles from "../styles/peopleManagement.module.css";
import { Link } from "react-router-dom";
import Loading from "../../../components/loading";
import usersServices from "../../../services/usersServices";
import { peopleManagementTR } from "../../../utils/HeaderList.json";
import HeaderFilter from "../../../components/table/headerFilter/headerFilter";
import useTableFilter from "../../../hooks/useTableFilter";
import HandleBack from "../../../components/handleBack";

export default function PeopleManagement() {

  const [userActive, setuserActive] = useState(null); // Estado local responsável por controlar "userActive" durante o ciclo de vida do componente.
  const { getUsers, refetchUsers, usersList, usersLoading } = usersServices(); // Serviço/hook de integração com a API, centralizando busca, envio e atualização de dados.
  const [open, setOpen] = useState(false); // Estado local responsável por controlar "open" durante o ciclo de vida do componente.
  const menuRef = useRef(null); // Referência persistente usada para acessar "menuRef" sem provocar nova renderização.
  const [filters, setFilters] = useState({}); // Estado local responsável por controlar "filters" durante o ciclo de vida do componente.
  const selectedUser = usersList?.find((u) => u._id === userActive);

  // Função utilitária "toggleMenu" usada para alternar estados booleanos na interface.
  const toggleMenu = () => setOpen((prev) => !prev);

  // Fecha o menu se clicar fora
  useEffect(() => {
  // Função de evento "handleClickOutside". Normalmente é acionada por clique, submit ou interação do usuário.
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //leva uma mensagem para o services, a função getUsers
  useEffect(() => {
    getUsers();
  }, [refetchUsers]);

  //Função para atualizar filtros
  // Função de evento "handleFilterChange". Normalmente é acionada por clique, submit ou interação do usuário.
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  //Função principal que vai filtrar na tela
  // Aplica a regra de filtro em memória antes da renderização, mantendo a tabela desacoplada da lógica de busca.
  const filteredUsers = useTableFilter(
    usersList,
    filters,
    peopleManagementTR
  );


  //Ele carrega a pagina até encontrar os estudantes
  if (usersLoading) {
    return <Loading />;
  }


  return (
    <div className={`${styles.pageContainer} main-page`}>
      <HandleBack/>

      <h1 className="title-page">Gestão de pessoas</h1>

      {/* Ações principais da tela: inserir, visualizar, alterar e demais operações relacionadas ao registro selecionado. */}
      <div className="card-buttons">
        <Link
          to={"/PeopleManagement/add"}
          state={{
            userId: userActive,
            userData: selectedUser,
            currentMode: "A",
          }}
        >
          <button>Inserir</button>
        </Link>

        <Link
          to={"/PeopleManagement/view"}
          state={{
            userId: userActive,
            userData: selectedUser,
            currentMode: "V",
          }}
        >
          <button disabled={userActive === null}>
            Visualizar
          </button>
        </Link>

        <Link
          to={"/PeopleManagement/alter"}
          state={{
            userId: userActive,
            userData: selectedUser,
            currentMode: "E",
          }}
        >
          <button disabled={userActive === null}>Alterar</button>
        </Link>

        <div ref={menuRef}>
          <button disabled={userActive === null} onClick={toggleMenu}>
            Outras opções ▼
          </button>

          {/* Renderização condicional: esse bloco só aparece quando o estado correspondente estiver ativo. */}
          {open && (
            <ul className="other-option-btns">
              <Link
                to={"/PeopleManagementActivities"}
                state={{
                  userData: selectedUser
                }}
              >
                <li>Atividades</li>
              </Link>
            </ul>
          )}
        </div>
      </div>

      <div className="cardList">
        <div className="tableWrapper">
          {/* Estrutura tabular principal onde o cabeçalho e as linhas são montados dinamicamente. */}
          <table>
            <HeaderFilter
              columns={peopleManagementTR}
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
                  columns={peopleManagementTR}
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
