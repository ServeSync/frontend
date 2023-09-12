import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import AuthenticationLayout from 'src/modules/Share/layouts/AuthenticationLayout'
import MainLayout from 'src/modules/Share/layouts/MainLayout'

const Login = lazy(() => import('src/modules/Authentication/pages/Login/Login'))
const Home = lazy(() => import('src/modules/Home/pages'))
const ForgetPassword = lazy(() => import('src/modules/Authentication/pages/ForgetPassword'))

const useRouteElements = () => {
  const routeElements = useRoutes([
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
      path: path.home,
      element: (
        <MainLayout>
          <Suspense>
            <Home />
          </Suspense>
        </MainLayout>
      )
    }
  ])
  return routeElements
}

export default useRouteElements
