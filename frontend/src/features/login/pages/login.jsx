/*
    Type: Fonte
    User: Matheus Rodrigues
    Description: Tela de Login
    Date: 03/03/2026
*/

import { useState } from "react";
import styles from "../styles/login.module.css";
import userSystemServices from "../../../services/usersSystemServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Login() {

  const { login: loginService } = userSystemServices();
  const { login } = useAuth();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const response = await loginService({
      user_system_name: name,
      user_system_password: password
    });

    if (response.success) {

      // Atualiza contexto global
      login(response.body.user);

      alert("Login realizado");

      navigate("/");

    } else {
      alert(response.body);
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.cardLogin}>
        <div className={styles.cardLoginForm}>
          <h1>Login</h1>

          <form onSubmit={handleLogin}>

            <div>
              <label>Usuário</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label>Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit">Entrar</button>

          </form>

        </div>
      </div>
    </div>
  );
}