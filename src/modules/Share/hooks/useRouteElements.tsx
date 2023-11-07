import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import { AppContext } from '../contexts/app.context'
import AuthenticationLayout from '../layouts/AuthenticationLayout'
import MainLayout from '../layouts/MainLayout'
import HomePageLayout from '../layouts/HomePageLayout'

//Client
const StudentSignIn = lazy(() => import('src/modules/Authentication/pages/StudentSignIn'))
const HomePage = lazy(() => import('src/modules/HomePage/pages/HomePage'))
const EventDetailPage = lazy(() => import('src/modules/EventManagement/pages/EventDetailPage/EventDetailPage'))
const RequestEventPage = lazy(() => import('src/modules/EventManagement/pages/RequestEventPage/RequestEventPage'))
const AttendanceEvent = lazy(() => import('src/modules/EventManagement/pages/AttendanceEventPage'))
const EventsPage = lazy(() => import('src/modules/HomePage/pages/EventsPage'))
const ForgetPassword = lazy(() => import('src/modules/Authentication/pages/ForgetPassword'))
const ResetPassword = lazy(() => import('src/modules/Authentication/pages/ResetPassword'))

//Admin
const AdminSignIn = lazy(() => import('src/modules/Authentication/pages/AdminSignIn'))
const Dashboard = lazy(() => import('src/modules/Dashboard/pages/Dashboard'))
const RolePage = lazy(() => import('src/modules/RoleManagement/pages/RolePage'))
const StudentPage = lazy(() => import('src/modules/StudentManagement/pages/StudentPage'))
const CreateStudentPage = lazy(() => import('src/modules/StudentManagement/pages/CreateStudentPage'))
const EditStudentPage = lazy(() => import('src/modules/StudentManagement/pages/EditStudentPage'))
const EventPage = lazy(() => import('src/modules/EventManagement/pages/EventPage'))
const CreateEventPage = lazy(() => import('src/modules/EventManagement/pages/CreateEventPage/CreateEventPage'))
const EditEventPage = lazy(() => import('src/modules/EventManagement/pages/EditEventPage/EditEventPage'))
const EventPending = lazy(() => import('src/modules/EventManagement/pages/EventPending/EventPendingPage'))
const EditEventPendingPage = lazy(() => import('src/modules/EventManagement/pages/EditEventPendingPage'))
const NotFound = lazy(() => import('src/modules/Share/components/NotFound'))

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.dashboard} />
}

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.home_page} />
}

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: path.home_page,
      element: (
        <HomePageLayout>
          <Suspense>
            <HomePage />
          </Suspense>
        </HomePageLayout>
      )
    },
    {
      path: path.event_detail,
      element: (
        <Suspense>
          <EventDetailPage />
        </Suspense>
      )
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.admin_login,
          element: (
            <AuthenticationLayout>
              <Suspense>
                <AdminSignIn />
              </Suspense>
            </AuthenticationLayout>
          )
        },
        {
          path: path.login,
          element: (
            <AuthenticationLayout>
              <Suspense>
                <StudentSignIn />
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
        },
        {
          path: path.request_event,
          element: (
            <Suspense>
              <RequestEventPage />
            </Suspense>
          )
        },
        {
          path: path.attendance_event,
          element: (
            <Suspense>
              <AttendanceEvent />
            </Suspense>
          )
        },
        {
          path: path.list_events,
          element: (
            <Suspense>
              <EventsPage />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.dashboard,
          element: (
            <MainLayout>
              <Suspense>
                <Dashboard />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.role,
          element: (
            <MainLayout>
              <Suspense>
                <RolePage />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.student,
          element: (
            <MainLayout>
              <Suspense>
                <StudentPage />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.create_student,
          element: (
            <MainLayout>
              <Suspense>
                <CreateStudentPage />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.edit_student,
          element: (
            <MainLayout>
              <Suspense>
                <EditStudentPage />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.event,
          element: (
            <MainLayout>
              <Suspense>
                <EventPage />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.create_event,
          element: (
            <MainLayout>
              <Suspense>
                <CreateEventPage />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.edit_event,
          element: (
            <MainLayout>
              <Suspense>
                <EditEventPage />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.event_pending,
          element: (
            <MainLayout>
              <Suspense>
                <EventPending />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.edit_event_pending,
          element: (
            <MainLayout>
              <Suspense>
                <EditEventPendingPage />
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
