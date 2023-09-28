import { EducationProgramType } from './education_program.type'
import { FacultyType } from './faculty.type'
import { HomeRoomType } from './home_room.type'

export interface StudentsListType {
  total: number
  totalPages: number
  data: [
    {
      faculty: FacultyType
      homeRoom: HomeRoomType
      educationProgram: EducationProgramType
      id: string
      code: string
      fullName: string
      gender: boolean
      dateOfBirth: string
      homeTown: string
      address: string
      imageUrl: string
      citizenId: string
      email: string
      phone: string
      identityId: string
    }
  ]
}

export interface StudentType {
  id: string
  code: string
  fullName: string
  gender: boolean
  dateOfBirth: string
  homeTown: string
  address: string
  imageUrl: string
  citizenId: string
  email: string
  phone: string
  identityId: string
  homeRoomId: string
  educationProgramId: string
  facultyId: string
}

export interface StudentListConfig {
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
  gender: NonNullable<boolean | undefined>
  dateOfBirth: string
  phone: string
  homeTown: string
  address: string
  citizenId: string
  facultyId: string
  homeRoomId: string
  educationProgramId: string
}
