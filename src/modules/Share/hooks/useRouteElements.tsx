import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import { AppContext } from '../contexts/app.context'
import AuthenticationLayout from '../layouts/AuthenticationLayout'
import MainLayout from '../layouts/MainLayout'
import HomePageLayout from '../layouts/HomePageLayout'
import { GetProfileQuery } from '../services'
import { PermissionProvider } from '../contexts'
import { Permission } from '../interfaces'
import Restricted from '../components/Restricted'
import NotAllowed from '../components/NotAllowed'

//Client
const StudentSignIn = lazy(() => import('src/modules/Authentication/pages/StudentSignIn'))
const HomePage = lazy(() => import('src/modules/HomePage/pages/HomePage'))
const EventDetailPage = lazy(() => import('src/modules/EventManagement/pages/EventDetailPage/EventDetailPage'))
const RequestEventPage = lazy(() => import('src/modules/EventManagement/pages/RequestEventPage/RequestEventPage'))
const AttendanceEvent = lazy(() => import('src/modules/EventManagement/pages/AttendanceEventPage'))
const EventsPage = lazy(() => import('src/modules/HomePage/pages/EventsPage'))
const ProfileClientPage = lazy(() => import('src/modules/HomePage/pages/ProfileClientPage'))
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
const EventOrganizationPage = lazy(() => import('src/modules/EventOrganizationManagement/pages/EventOrganizationPage'))
const CreateOrganizationPage = lazy(
  () => import('src/modules/EventOrganizationManagement/pages/CreateEventOrganizationPage')
)
const EditEventOrganizationPage = lazy(
  () => import('src/modules/EventOrganizationManagement/pages/EditEventOrganizationPage')
)
const ProofPage = lazy(() => import('src/modules/Proof/pages/ProofPage'))
const NotFound = lazy(() => import('src/modules/Share/components/NotFound'))

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.dashboard} />
}

const ProtectedStudentRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)

  const getProfileQuery = new GetProfileQuery()
  const permissions = getProfileQuery.fetch()?.permissions

  const fetchPermission = (permission: Permission): boolean => {
    return permissions.includes(permission)
  }

  if (!getProfileQuery.isLoading()) {
    return (
      <PermissionProvider fetchPermission={fetchPermission}>
        {isAuthenticated && permissions ? <Outlet /> : <Navigate to={path.home_page} />}
      </PermissionProvider>
    )
  }
}

const useRouteElements = () => {
  const routeElements = useRoutes([
    // Public routes
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
        <HomePageLayout>
          <Suspense>
            <EventDetailPage />
          </Suspense>
        </HomePageLayout>
      )
    },
    {
      path: path.list_events,
      element: (
        <HomePageLayout>
          <Suspense>
            <EventsPage />
          </Suspense>
        </HomePageLayout>
      )
    },

    {
      path: '',
      element: <ProtectedStudentRoute />,
      children: [
        {
          path: path.attendance_event,
          element: (
            <Suspense>
              <AttendanceEvent />
            </Suspense>
          )
        },
        {
          path: path.profile_clients,
          element: (
            <HomePageLayout>
              <Suspense>
                <ProfileClientPage />
              </Suspense>
            </HomePageLayout>
          )
        }
      ]
    },
    // Rejected routes
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
            <HomePageLayout>
              <Suspense>
                <RequestEventPage />
              </Suspense>
            </HomePageLayout>
          )
        }
      ]
    },
    // Protected routes
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
                <Restricted to='ServeSync.Permissions.Roles.View' fallback={<NotAllowed />}>
                  <RolePage />
                </Restricted>
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.student,
          element: (
            <MainLayout>
              <Suspense>
                <Restricted to='ServeSync.Permissions.Students.View' fallback={<NotAllowed />}>
                  <StudentPage />
                </Restricted>
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.create_student,
          element: (
            <MainLayout>
              <Suspense>
                <Restricted to='ServeSync.Permissions.Students.Create' fallback={<NotAllowed />}>
                  <CreateStudentPage />
                </Restricted>
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.edit_student,
          element: (
            <MainLayout>
              <Suspense>
                <Restricted
                  to={'ServeSync.Permissions.Students.ViewProfile' && 'ServeSync.Permissions.Students.Edit'}
                  fallback={<NotAllowed />}
                >
                  <EditStudentPage />
                </Restricted>
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.event,
          element: (
            <MainLayout>
              <Suspense>
                <Restricted to={'ServeSync.Permissions.Events.View'} fallback={<NotAllowed />}>
                  <EventPage />
                </Restricted>
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.create_event,
          element: (
            <MainLayout>
              <Suspense>
                <Restricted to={'ServeSync.Permissions.Events.Create'} fallback={<NotAllowed />}>
                  <CreateEventPage />
                </Restricted>
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.edit_event,
          element: (
            <MainLayout>
              <Suspense>
                <Restricted to={'ServeSync.Permissions.Events.Edit'} fallback={<NotAllowed />}>
                  <EditEventPage />
                </Restricted>
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
        },
        {
          path: path.event_organization,
          element: (
            <MainLayout>
              <Suspense>
                <Restricted to={'ServeSync.Permissions.EventOrganizations.View'} fallback={<NotAllowed />}>
                  <EventOrganizationPage />
                </Restricted>
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.create_organization,
          element: (
            <MainLayout>
              <Suspense>
                <CreateOrganizationPage />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.edit_event_organization,
          element: (
            <MainLayout>
              <Suspense>
                <EditEventOrganizationPage />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.proofs,
          element: (
            <MainLayout>
              <Suspense>
                <ProofPage />
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
