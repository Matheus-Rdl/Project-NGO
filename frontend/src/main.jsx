import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './home/home.jsx'
import PeopleManagement from './features/register/pages/peopleManagement.jsx'
import PeopleManagementDetailed from './features/register/pages/peopleManagementDetailed.jsx'
import ActivityManagement from './features/activities/pages/activityManagement.jsx'
import ActivityManagementDetailed from './features/activities/pages/activityManagementDetailed.jsx'
import ActivityManagementUsers from './features/activities/pages/activityManagementUsers.jsx'
import PeopleManagementActivities from './features/register/pages/peopleManagementActivities.jsx'

const pages = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {path: '/', element: <Home/>},

      {path: '/PeopleManagement', element: <PeopleManagement/>},
      {path: '/PeopleManagement/add', element: <PeopleManagementDetailed/>},
      {path: '/PeopleManagement/view', element: <PeopleManagementDetailed/>},
      {path: '/PeopleManagement/alter', element: <PeopleManagementDetailed/>},
      {path: '/PeopleManagementActivities', element: <PeopleManagementActivities/>},

      {path: '/ActivityManagement', element: <ActivityManagement/>},
      {path: '/ActivityManagement/add', element: <ActivityManagementDetailed/>},
      {path: '/ActivityManagement/view', element: <ActivityManagementDetailed/>},
      {path: '/ActivityManagement/alter', element: <ActivityManagementDetailed/>},
      {path: '/ActivityManagementUsers', element: <ActivityManagementUsers/>},

      {/*path: '/settings', element: <Settings/>*/},
      {/*path: '/economic', element: <Economic/>*/}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={pages}></RouterProvider>
  </StrictMode>,
)
