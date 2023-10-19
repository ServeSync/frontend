import { EducationProgramType, FacultyType, HomeRoomType } from '.'

export interface StudentsListType {
  total: number
  totalPages: number
  data: [
    {
      id: string
      code: string
      fullName: string
      email: string
      phone: string
      dateOfBirth: string
      gender: boolean
      address: string
      faculty: FacultyType
      imageUrl: string
      identityId: string
      citizenId: string
      homeTown: string
      homeRoom: HomeRoomType
      educationProgram: EducationProgramType
    }
  ]
}

export interface StudentType {
  id: string
  code: string
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  imageUrl: string
  citizenId: string
  identityId: string
  homeTown: string
  facultyId: string
  homeRoomId: string
  educationProgramId: string
}

export interface StudentsListConfig {
  homeRoomId?: string
  facultyId?: string
  educationProgramId?: string
  gender?: boolean
  search?: string
  sorting?: string
  page?: number
  size?: number
  id?: string
}

export interface StudentForm {
  code: string
  fullName: string
  email: string
  gender: string
  birth: string
  phone: string
  address: string
  homeTown: string
  citizenId: string
  homeRoomId: string
  educationProgramId: string
  facultyId: string
  imageUrl?: string
}
