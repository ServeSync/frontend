export interface RegisteredStudentsListType {
  total: number
  totalPages: number
  data: RegisteredStudentsType[]
}
export interface RegisteredStudentsType {
  role: string
  id: string
  studentId: string
  name: string
  email: string
  phone: string
  status: string
  imageUrl: string
  registeredAt: string
}
