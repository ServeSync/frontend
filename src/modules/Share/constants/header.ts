interface Heading {
  [key: string]: string
}

export const HandleHeading = (location: string) => {
  const mappedHeading: Heading = {
    events: 'Quản lý sự kiện',
    students: 'Quản lý sinh viên',
    roles: 'Quản lý Roles',
    pendingEvents: 'Quản lý sự kiện chưa xử lý'
  }
  return mappedHeading[`${location}`]
}
