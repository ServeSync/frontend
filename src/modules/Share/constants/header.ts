interface Heading {
  [key: string]: string
}

export const HandleHeading = (location: string) => {
  const mappedHeading: Heading = {
    events: 'Quản lý sự kiện',
    students: 'Quản lý sinh viên',
    roles: 'Quản lý Roles'
  }
  return mappedHeading[`${location}`]
}
