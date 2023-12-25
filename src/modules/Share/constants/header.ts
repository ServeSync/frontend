interface Heading {
  [key: string]: string
}

export const HandleHeading = (location: string) => {
  const mappedHeading: Heading = {
    events: 'Quản lý sự kiện',
    students: 'Quản lý sinh viên',
    roles: 'Quản lý Roles',
    user: 'Quản lý người dùng',
    collaboration_requests: 'Quản lý đề nghị hợp tác',
    event_organizations: 'Quản lý nhà tổ chức sự kiện',
    proofs: 'Quản lý minh chứng'
  }
  return mappedHeading[`${location}`]
}
