interface Heading {
  [key: string]: string
}

export function HandleHeading(location: string) {
  const mappedHeading: Heading = {
    events: 'Quản lý sự kiện',
    students: 'Quản lý sinh viên',
    roles: 'Quản lý role'
  }
  return mappedHeading[`${location}`]
}