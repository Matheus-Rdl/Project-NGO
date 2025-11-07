import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home/home.jsx'
import PeopleManagement from './pages/register/peopleManagement/PeopleManagement.jsx'
import Settings from './pages/settings/settings.jsx'
import Economic from './pages/economic/economic.jsx'
import PeopleManagementDetailed from './pages/register/peopleManagement/peopleManagementDetailed.jsx'
import CourseManagement from './pages/courses/courseManagement/courseManagement.jsx'
import CourseManagementDetailed from './pages/courses/courseManagement/courseManagementDetailed.jsx'

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

      {path: '/CourseManagement', element: <CourseManagement/>},
      {path: '/CourseManagement/add', element: <CourseManagementDetailed/>},
      {path: '/CourseManagement/view', element: <CourseManagementDetailed/>},
      {path: '/CourseManagement/alter', element: <CourseManagementDetailed/>},

      {path: '/settings', element: <Settings/>},
      {path: '/economic', element: <Economic/>}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={pages}></RouterProvider>
  </StrictMode>,
)
