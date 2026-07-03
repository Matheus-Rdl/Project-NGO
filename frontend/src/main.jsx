import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createHashRouter, RouterProvider } from 'react-router-dom'

// 1. IMPORTAÇÕES DO CHAKRA UI
import { ChakraProvider } from '@chakra-ui/react'
import system from './theme.js'

import Home from './home/home.jsx'
import PeopleManagement from './features/register/pages/peopleManagement.jsx'
import PeopleManagementDetailed from './features/register/pages/peopleManagementDetailed.jsx'
import ActivityManagement from './features/activities/pages/activityManagement.jsx'
import ActivityManagementDetailed from './features/activities/pages/activityManagementDetailed.jsx'
import ActivityManagementUsers from './features/activities/pages/activityManagementUsers.jsx'
import PeopleManagementActivities from './features/register/pages/peopleManagementActivities.jsx'

import Login from './features/login/pages/login.jsx'
import SignUp from './features/login/pages/signUp.jsx'
import SignUpDetailed from './features/login/pages/signUpDetailed.jsx'

import FieldsManagement from './features/fields/pages/fieldsManagement.jsx'
import FieldsManagementList from './features/fields/pages/fieldsManagementList.jsx'

import { AuthProvider } from './features/login/context/authContext.jsx'
import ProtectedRoute from './features/login/routes/ProtectedRoute.jsx'
import FieldsManagementMenu from './features/fields/pages/fieldsManagementMenu.jsx'
import UnderConstruction from './components/underConstruction.jsx'
import Configuracoes from './features/configuracoes/pages/configuracoes.jsx'

// 2. MANTIDO PARA COMPATIBILIDADE COM CSS LEGADO
document.documentElement.setAttribute(
  "data-env",
  import.meta.env.VITE_ENV
);

const pages = createHashRouter([

  // ROTA PUBLICA
  {
    path: "/Login",
    element: <Login />
  },

  // ROTAS PROTEGIDAS
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [

          { path: "/", element: <Home /> },

          { path: "/SignUp", element: <SignUp /> },
          { path: "/SignUp/add", element: <SignUpDetailed /> },
          { path: "/SignUp/view", element: <SignUpDetailed /> },
          { path: "/SignUp/alter", element: <SignUpDetailed /> },

          { path: "/PeopleManagement", element: <PeopleManagement /> },
          { path: "/PeopleManagement/add", element: <PeopleManagementDetailed /> },
          { path: "/PeopleManagement/view", element: <PeopleManagementDetailed /> },
          { path: "/PeopleManagement/alter", element: <PeopleManagementDetailed /> },
          { path: "/PeopleManagementActivities", element: <PeopleManagementActivities /> },

          { path: "/ActivityManagement", element: <ActivityManagement /> },
          { path: "/ActivityManagement/add", element: <ActivityManagementDetailed /> },
          { path: "/ActivityManagement/view", element: <ActivityManagementDetailed /> },
          { path: "/ActivityManagement/alter", element: <ActivityManagementDetailed /> },
          { path: "/ActivityManagementUsers", element: <ActivityManagementUsers /> },
          
          { path: "/FieldsManagement", element: <FieldsManagement /> },
          { path: "/FieldsManagementList", element: <FieldsManagementList /> },
          { path: "/FieldsManagementMenu", element: <FieldsManagementMenu /> },

          { path: "/relatorios", element: <UnderConstruction title="Relatórios" /> },
          { path: "/financeiro", element: <UnderConstruction title="Financeiro" /> },
          { path: "/configuracoes", element: <Configuracoes /> },

        ]
      }
    ]
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      {/* 3. ENVELOPAMENTO COM O CHAKRAPROVIDER USANDO O NOVO SISTEMA */}
      <ChakraProvider value={system}>
        <RouterProvider router={pages} />
      </ChakraProvider>
    </AuthProvider>
  </StrictMode>
)