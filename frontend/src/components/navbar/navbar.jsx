/*
    Type: Componente
    User: Matheus Rodrigues
    Description: Componente para montar filtro de tabelas no sistema
    Date: 23/02/2026
*/

import styles from "./navbar.module.css";
import { useState } from "react";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
  IoMdSearch,
} from "react-icons/io";
import { PiUsersThree, PiMoneyWavy } from "react-icons/pi";
import { LiaGraduationCapSolid } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { BiHome } from "react-icons/bi";
import { LuNewspaper } from "react-icons/lu";

export default function NavBar({ setActiveScreen }) {

  // Estado interno para fechar e abrir o NAV
  const [showNav, setShowNav] = useState(false);

  // Array de itens da NavBar ("Futuramente vai pegar o menuItems do banco de dados e os icones guardado na aplicação")
  // O que vai ser fixo vai ser esses que já estão
  const menuItems = [
    { label: "Pesquisar", icon: <IoMdSearch />, screen: null },
    { label: "Início", icon: <BiHome />, screen: "home" },
    { label: "Cadastros", icon: <PiUsersThree />, screen: "cadastros" },
    { label: "Atividades", icon: <LiaGraduationCapSolid />, screen: "atividades" },
    { label: "Relatórios", icon: <LuNewspaper />, screen: "relatorios" },
    { label: "Financeiro", icon: <PiMoneyWavy />, screen: "financeiro" },
    { label: "Configurações", icon: <IoSettingsOutline />, screen: "configuracoes" },
  ];

  return (

    <div className={showNav ? `${styles.nav} ${styles.active}` : styles.nav}>

      {/*  */}
      {showNav ? (
        <IoIosArrowDropleftCircle
          className={styles.arrowMenu}
          onClick={() => setShowNav(!showNav)}
        />
      ) : (
        <IoIosArrowDroprightCircle
          className={styles.arrowMenu}
          onClick={() => setShowNav(!showNav)}
        />
      )}

      <div className={styles.menu}>
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => {
              if (item.screen) {
                setActiveScreen(item.screen);
              }
              setShowNav(false);
            }}

          >
            <a>
              {item.icon}
              <p className={showNav ? `${styles.text} ${styles.textShow}` : styles.textNone}>
                {item.label}
              </p>
            </a>
            <p className={showNav ? styles.textNone : `${styles.text} ${styles.textHover}`}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
