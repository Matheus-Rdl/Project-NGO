/*
    Type: Fonte
    User: Matheus Rodrigues
    Description: Tela principal do sistema, Home da página
    Date: 23/02/2026
*/

import { useState } from "react";
import styles from "./home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [activeScreen, setActiveScreen] = useState("home");

  return (
    <>
      <div className="main">
        {activeScreen === "home" && (
          <>
            <h1>Home</h1>
          </>
        )}
        {activeScreen === "cadastros" && (
          <>
            <h1>Cadastros</h1>
            <Link to={"/PeopleManagement"}>
              <h2>&bull; Gestão de Pessoas</h2>
            </Link>
            <h2>&bull; Layout de Formulário</h2>
          </>
        )}
        {activeScreen === "financeiro" && <h1>Financeiro</h1>}
        {activeScreen === "atividades" && (
          <>
            <h1>Atividades</h1>
            <Link to={"/ActivityManagement"}>
              <h2>&bull; Gerenciar Atividades</h2>
            </Link>
          </>
        )}
        {activeScreen === "relatorios" && <h1>Relatórios</h1>}
        {activeScreen === "configuracoes" && (
          <>
            <h1>Configurações</h1>
            <Link to={"/SignUp"}>
              <h2>&bull; Cadastro de usuários do sistema</h2>
            </Link>
            <Link to={"/FieldsManagement"}>
              <h2>&bull; Campos do sistema</h2>
            </Link>
            <Link to={"/SignUp"}>
              <h2>&bull; Ordenação de campos</h2>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
