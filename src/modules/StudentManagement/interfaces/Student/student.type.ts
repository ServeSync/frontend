import { EducationProgramType, FacultyType, HomeRoomType } from '..'

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

export interface StudentsListType {
  total: number
  totalPages: number
  data: [
    {
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
      faculty: FacultyType
      homeRoom: HomeRoomType
      educationProgram: EducationProgramType
      score: number
    }
  ]
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
