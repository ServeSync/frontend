import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import AuthenticationLayout from 'src/modules/Share/layouts/AuthenticationLayout'
import MainLayout from 'src/modules/Share/layouts/MainLayout'
import { AppContext } from '../contexts/app.context'

const Login = lazy(() => import('src/modules/Authentication/pages/Login/Login'))
const Home = lazy(() => import('src/modules/Home/pages'))
const ForgetPassword = lazy(() => import('src/modules/Authentication/pages/ForgetPassword'))
const NotFound = lazy(() => import('../components/NotFound'))

const Role = lazy(() => import('src/modules/RoleManagement/pages/Role'))

const Student = lazy(() => import('src/modules/StudentManagement/pages/Student'))
const CreateStudent = lazy(() => import('src/modules/StudentManagement/pages/CreateStudent'))
const EditStudent = lazy(() => import('src/modules/StudentManagement/pages/EditStudent'))

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
