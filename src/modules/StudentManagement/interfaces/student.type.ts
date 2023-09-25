import { EducationProgramType } from './education_program.type'
import { FacultyType } from './faculty.type'
import { HomeRoomType } from './home_room.type'

export interface StudentType {
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

export interface StudentListConfig {
  homeRoomId?: string
  facultyId?: string
  educationProgramId?: string
  gender?: boolean
  search?: string
  sorting?: string
  page?: number
  size?: number
}
