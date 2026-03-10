import { Outlet } from "react-router-dom";
import "./App.css";
import { ImMenu3 } from "react-icons/im";
import { getCurrentDate } from "./utils/dateFunctions";
import { useAuth } from "./features/login/context/authContext";

export default function App() {

  const { user } = useAuth();
  const formattedDate = getCurrentDate();

  return (
    <>
      <header className="header">
        <p>
          Ong Amigos da Esperança | {formattedDate} | {user?.user_system_name}
        </p>
        <ImMenu3 />
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}