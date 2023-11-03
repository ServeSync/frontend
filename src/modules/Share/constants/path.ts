const path = {
  //Client
  home_page: '/',
  event_detail: '/event-detail',
  request_event: '/events/request',
  //Auth
  login: '/login',
  forget_password: '/forgetPassword',
  reset_password: '/resetPassword',
  //Admin
  dashboard: '/admin/dashboard',
  role: '/admin/roles',
  student: '/admin/students',
  create_student: '/admin/students/create',
  edit_student: '/admin/students/edit',
  event: '/admin/events',
  create_event: '/admin/events/create',
  edit_event: '/admin/events/edit',
  event_organizer: '/admin/organizers',
  event_pending: '/admin/pendingEvents',
  edit_event_pending: '/admin/pendingEvents/edit',
  standard: '/admin/standards',
  complaint: '/admin/complaints'
} as const

export default path
