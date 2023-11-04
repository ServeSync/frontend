export interface AttendanceStudentsListType {
  total: number
  totalPage: number
  data: AttendanceStudentsType[]
}

export interface AttendanceStudentsType {
  id: string
  code: string
  name: string
  email: string
  phone: string
  imageUrl: string
  role: string
  homeRoomName: string
  score: number
  attendanceAt: string
}
