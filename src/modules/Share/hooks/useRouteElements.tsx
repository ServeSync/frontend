import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from '../contexts'
import path from '../constants/path'
import AuthenticationLayout from '../layouts/AuthenticationLayout'
import MainLayout from '../layouts/MainLayout'

const Home = lazy(() => import('src/modules/Home/pages/Home'))
const NotFound = lazy(() => import('../components/NotFound'))

const Login = lazy(() => import('src/modules/Authentication/pages/Login'))
const ForgetPassword = lazy(() => import('src/modules/Authentication/pages/ForgetPassword'))
const ResetPassword = lazy(() => import('src/modules/Authentication/pages/ResetPassword'))

const Role = lazy(() => import('src/modules/RoleManagement/pages/Role'))

const Student = lazy(() => import('src/modules/StudentManagement/pages/Student'))
const CreateStudent = lazy(() => import('src/modules/StudentManagement/pages/CreateStudent'))
const EditStudent = lazy(() => import('src/modules/StudentManagement/pages/EditStudent'))

const Event = lazy(() => import('src/modules/EventManagement/pages/Event'))
const CreateEvent = lazy(() => import('src/modules/EventManagement/pages/CreateEventPage'))
const EditEvent = lazy(() => import('src/modules/EventManagement/pages/EditEvent'))

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <AuthenticationLayout>
              <Suspense>
                <Login />
              </Suspense>
            </AuthenticationLayout>
          )
        },
        {
          path: path.forget_password,
          element: (
            <AuthenticationLayout>
              <Suspense>
                <ForgetPassword />
              </Suspense>
            </AuthenticationLayout>
          )
        },
        {
          path: path.reset_password,
          element: (
            <AuthenticationLayout>
              <Suspense>
                <ResetPassword />
              </Suspense>
            </AuthenticationLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.home,
          element: (
            <MainLayout>
              <Suspense>
                <Home />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.role,
          element: (
            <MainLayout>
              <Suspense>
                <Role />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.student,
          element: (
            <MainLayout>
              <Suspense>
                <Student />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.create_student,
          element: (
            <MainLayout>
              <Suspense>
                <CreateStudent />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.edit_student,
          element: (
            <MainLayout>
              <Suspense>
                <EditStudent />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.event,
          element: (
            <MainLayout>
              <Suspense>
                <Event />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.create_event,
          element: (
            <MainLayout>
              <Suspense>
                <CreateEvent />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.edit_event,
          element: (
            <MainLayout>
              <Suspense>
                <EditEvent />
              </Suspense>
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <Suspense>
          <NotFound />
        </Suspense>
      )
    }
  ])
  return routeElements
}

export default useRouteElements
