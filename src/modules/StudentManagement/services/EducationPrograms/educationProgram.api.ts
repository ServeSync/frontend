import http from 'src/modules/Share/utils/http'
import { EducationProgramType, StudentEducationProgramResultType } from '../../interfaces'

const educationProgramAPI = {
  getListEducationPrograms: () => http.get<EducationProgramType[]>('/education-programs'),

  getStudentEducationProgramResult: (id: string) => http.get<StudentEducationProgramResultType>(`/students/${id}/education-program`)
}

export default educationProgramAPI
