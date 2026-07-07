/*
    Type: Context
    User: Matheus Rodrigues / Refatorado para SSO Squamata
    Description: Contexto global de autenticação integrado com Squamata-Login.
    Armazena token JWT + user em localStorage, suporta pista de pouso
    (extração de ?token= da URL após redirect do SSO) e verifica expiração.
    Date: 06/07/2026
*/

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  /*
      Inicialização: restaura sessão do localStorage ou captura
      token vindo do redirect do Squamata-Login (pista de pouso).
  */
  useEffect(() => {
    // 1. Verifica se voltou do SSO com token na URL (pista de pouso)
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      try {
        // Decodifica payload do JWT (sem verificar assinatura — só para extrair dados)
        let base64 = tokenFromUrl.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        while (base64.length % 4 !== 0) base64 += "=";
        const payload = JSON.parse(window.atob(base64));

        const userData = {
          uid: payload.uid,
          email: payload.email,
          appSlug: payload.appSlug,
          tenantId: payload.tenantId,
        };

        localStorage.setItem("auth", JSON.stringify({ token: tokenFromUrl, user: userData }));
        setUser(userData);
        setToken(tokenFromUrl);

        // Limpa o token da URL para segurança
        window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
        return;
      } catch (err) {
        console.error("Erro ao processar token da URL:", err);
      }
    }

    // 2. Restaura sessão do localStorage
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        const { token: storedToken, user: storedUser } = JSON.parse(stored);

        // Verifica se o token ainda é válido (decode + check exp)
        let base64 = storedToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        while (base64.length % 4 !== 0) base64 += "=";
        const payload = JSON.parse(window.atob(base64));

        if (payload.exp * 1000 > Date.now()) {
          setUser(storedUser);
          setToken(storedToken);
        } else {
          // Token expirado — limpa
          localStorage.removeItem("auth");
        }
      } catch {
        localStorage.removeItem("auth");
      }
    }
  }, []);

  /*
      Função de login — chamada após autenticação bem-sucedida.
      Recebe o token JWT e os dados do utilizador.
  */
  function login(newToken, userData) {
    localStorage.setItem("auth", JSON.stringify({ token: newToken, user: userData }));
    setUser(userData);
    setToken(newToken);
  }

  /*
      Função de logout — limpa sessão e estado global.
  */
  function logout() {
    localStorage.removeItem("auth");
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}