interface Heading {
  [key: string]: string
}

export const HandleHeading = (location: string) => {
  const mappedHeading: Heading = {
    events: 'Quản lý sự kiện',
    students: 'Quản lý sinh viên',
    roles: 'Quản lý Roles',
    pending_events: 'Quản lý đề nghị hợp tác',
    event_organizations: 'Quản lý nhà tổ chức sự kiện'
  }
  return mappedHeading[`${location}`]
}
