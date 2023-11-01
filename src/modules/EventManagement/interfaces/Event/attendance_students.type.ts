export interface AttendanceStudentsListType {
  total: number
  totalPage: number
  data: AttendanceStudentsType[]
}

export interface AttendanceStudentsType {
  id: string
  name: string
  email: string
  phone: string
  imageUrl: string
  role: string
  attendanceAt: string
}
