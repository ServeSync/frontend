export interface RegisteredStudentsListType {
  total: number
  totalPages: number
  data: RegisteredStudentsType[]
}

export interface RegisteredStudentsType {
  role: string
  id: string
  code: string
  studentId: string
  name: string
  email: string
  phone: string
  description: string
  rejectReason: string
  status: string
  imageUrl: string
  homeRoomName: string
  registeredAt: string
}
