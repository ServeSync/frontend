const path = {
  //Client
  login: '/login',
  home_page: '/home',
  event_detail: '/events/detail',
  request_event: '/events/request',
  attendance_event: '/events/attendance',
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
  event_organizer: '/admin/organizers',
  standard: '/admin/standards',
  complaint: '/admin/complaints'
} as const

export default path
