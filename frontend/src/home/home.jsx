import NavBar from "../components/navbar/navbar";
import { useState } from "react";
import styles from "./home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [activeScreen, setActiveScreen] = useState("home");

  return (
    <>
      <NavBar setActiveScreen={setActiveScreen} />
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
        {activeScreen === "configuracoes" && <h1>Configurações</h1>}
      </div>
    </>
  );
}
