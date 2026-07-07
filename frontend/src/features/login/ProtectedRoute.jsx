/*
    Type: Context
    User: Matheus Rodrigues / Refatorado para SSO Squamata
    Description: Componente responsável por proteger rotas da aplicação.
    Verifica se existe um token JWT válido no AuthContext.
    Caso não exista, o utilizador é redirecionado para o Squamata-Login (SSO).
    Date: 06/07/2026
*/

import { Outlet } from "react-router-dom";
import { useAuth } from "./authContext";

const SQUAMATA_FRONTEND_URL = import.meta.env.VITE_SQUAMATA_FRONTEND_URL || "http://localhost:5174";

export default function ProtectedRoute() {
  const { user, token } = useAuth();

  if (!user || !token) {
    const returnUrl = window.location.href;
    const ssoUrl = `${SQUAMATA_FRONTEND_URL}/login?appSlug=project-ngo&tenantId=default&returnUrl=${encodeURIComponent(returnUrl)}`;
    window.location.href = ssoUrl;
    return null;
  }

  return <Outlet />;
}