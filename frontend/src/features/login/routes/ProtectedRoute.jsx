/*
    Type: Context
    User: Matheus Rodrigues
    Description: Componente responsável por proteger rotas da aplicação.
    Ele verifica se existe um usuário autenticado no AuthContext.
    Caso não exista, o usuário é redirecionado automaticamente para a
    tela de login. Caso exista, a rota solicitada é renderizada normalmente.
    Date: 10/03/2026
*/

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function ProtectedRoute() {

  // Recupera o usuário autenticado do contexto global de autenticação
  const { user } = useAuth();

  // Se não existir usuário autenticado
  // o sistema redireciona automaticamente para a página de login
  if (!user) {
    return <Navigate to="/Login" replace />;
  }

  // Caso exista usuário autenticado
  // o Outlet renderiza a rota filha correspondente
  return <Outlet />;
}