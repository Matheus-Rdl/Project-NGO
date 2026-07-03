/*
    Type: Context
    User: Matheus Rodrigues
    Description: Contexto global responsável por controlar a autenticação
    do usuário no sistema. Ele permite acessar o usuário logado, realizar
    login e logout em qualquer parte da aplicação.
    Date: 10/03/2026
*/

import { createContext, useContext, useEffect, useState } from "react";

/*
    Cria o contexto de autenticação.
    Esse contexto será responsável por compartilhar os dados de login
    entre todos os componentes do sistema.
*/
const AuthContext = createContext();

/*
    Provider do contexto de autenticação.

    Esse componente envolve toda a aplicação e disponibiliza os dados
    de autenticação para todos os componentes filhos.
*/
export function AuthProvider({ children }) {

  /*
      Estado que armazena o usuário atualmente logado.
      Quando null significa que não existe usuário autenticado.
  */
  const [user, setUser] = useState(null);

  /*
      Executa apenas uma vez quando o sistema inicia.

      Verifica se existe um usuário salvo no sessionStorage.
      Caso exista, ele restaura o usuário no estado global
      permitindo manter a sessão ativa enquanto a aba estiver aberta.
  */
  useEffect(() => {

    // busca dados de autenticação armazenados na sessão da aba
    const authData = sessionStorage.getItem("auth");

    // se existir autenticação salva
    if (authData) {

      // converte o JSON salvo para objeto
      const parsed = JSON.parse(authData);

      // define o usuário no estado global
      setUser(parsed.user);
    }

  }, []);

  /*
      Função responsável por realizar o login do usuário.

      Ela salva os dados do usuário no sessionStorage e também
      atualiza o estado global do contexto.
  */
  function login(userData) {

    // salva os dados do usuário na sessão da aba
    sessionStorage.setItem(
      "auth",
      JSON.stringify({ user: userData })
    );

    // atualiza o estado global com o usuário logado
    setUser(userData);
  }

  /*
      Função responsável por realizar logout.

      Remove os dados da sessão e limpa o estado global,
      fazendo o sistema voltar ao estado de não autenticado.
  */
  function logout() {

    // remove a autenticação da sessão
    sessionStorage.removeItem("auth");

    // limpa o usuário do estado global
    setUser(null);
  }

  /*
      Provider do contexto.

      Ele disponibiliza para toda aplicação:
      - user → dados do usuário logado
      - login() → função de autenticação
      - logout() → função de sair do sistema
  */
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/*
    Hook personalizado para acessar o contexto de autenticação.

    Permite que qualquer componente use facilmente:
    const { user, login, logout } = useAuth();
*/
export function useAuth() {
  return useContext(AuthContext);
}