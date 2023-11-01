const path = {
  landing_page: '/home',
  event_detail: '/event-detail',
  login: '/login',
  forget_password: '/forgetPassword',
  reset_password: '/resetPassword',
  home: '/admin/home',
  role: '/admin/roles',
  student: '/admin/students',
  create_student: '/admin/students/create',
  edit_student: '/admin/students/edit',
  event: '/admin/events',
  create_event: '/admin/events/create',
  request_event: '/events/request',
  edit_event: '/admin/events/edit',
  event_organizer: '/admin/organizers',
  standard: '/admin/standards',
  complaint: '/admin/complaints'
} as const

export default path
