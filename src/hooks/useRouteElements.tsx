import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import path from 'src/constants/path'
import LoginLayout from 'src/layouts/LoginLayout'
import MainLayout from 'src/layouts/MainLayout'

const Login = lazy(() => import('src/pages/Login'))
const Home = lazy(() => import('src/pages/Home'))

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: path.login,
      element: (
        <LoginLayout>
          <Suspense>
            <Login />
          </Suspense>
        </LoginLayout>
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
