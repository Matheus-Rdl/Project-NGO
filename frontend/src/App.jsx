import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import { ImMenu3 } from "react-icons/im";

export default function App() {

  const date = new Date();
  const formattedDate = formatDate(date);

  //pega a data formatada dd/mm/yyyy
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <>
      <header className="header">
        <p>Ong Amigos da Esperança | {formattedDate} | Cedeck Sylvain</p>
        <ImMenu3 />
      </header>
      <main>
        <Outlet/>
      </main>
    </>
  );
}

