import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import { ImMenu3 } from "react-icons/im";
import { getCurrentDate } from "./utils/dateFunctions"

export default function App() {

  const formattedDate = getCurrentDate();

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

