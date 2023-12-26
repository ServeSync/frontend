const path = {
  //Client
  home_page: '/',
  login: '/login',
  event_detail: '/events/detail',
  request_event: '/events/request',
  attendance_event: '/events/attendance',
  list_events: '/events',
  profile_clients: '/profile',
  calendar_clients: '/calendar',
  //Auth
  forget_password: '/forgetPassword',
  reset_password: '/resetPassword',
  //Admin
  admin_login: '/admin/login',
  dashboard: '/admin/dashboard',
  calendar: '/admin/calendar',
  role: '/admin/roles',
  student: '/admin/students',
  create_student: '/admin/students/create',
  edit_student: '/admin/students/edit',
  event: '/admin/events',
  create_event: '/admin/events/create',
  edit_event: '/admin/events/edit',
  collaboration_request: '/admin/collaboration_requests',
  view_collaboration_request: '/admin/collaboration_requests/view',
  event_organization: '/admin/event_organizations',
  create_organization: '/admin/event_organizations/create',
  edit_event_organization: '/admin/event_organizations/edit',
  proof: '/admin/proofs'
} as const

export default path
