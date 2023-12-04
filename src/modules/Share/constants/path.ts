const path = {
  //Client
  home_page: '/',
  login: '/login',
  event_detail: '/events/detail',
  request_event: '/events/request',
  attendance_event: '/events/attendance',
  list_events: '/events',
  profile_clients: '/profile',
  //Auth
  forget_password: '/forgetPassword',
  reset_password: '/resetPassword',
  //Admin
  admin_login: '/admin/login',
  dashboard: '/admin/dashboard',
  role: '/admin/roles',
  student: '/admin/students',
  create_student: '/admin/students/create',
  edit_student: '/admin/students/edit',
  event: '/admin/events',
  create_event: '/admin/events/create',
  edit_event: '/admin/events/edit',
  event_pending: '/admin/pending_events',
  edit_event_pending: '/admin/pending_events/edit',
  event_organization: '/admin/event_organizations',
  create_organization: '/admin/event_organizations/create',
  edit_event_organization: '/admin/event_organizations/edit',
  proof: '/admin/proofs'
} as const

export default path
