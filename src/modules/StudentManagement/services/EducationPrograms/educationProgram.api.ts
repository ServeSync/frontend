import http from 'src/modules/Share/utils/http'
import { EducationProgramType } from '../../interfaces'

const educationProgramAPI = {
  getListEducationPrograms: () => http.get<EducationProgramType[]>('/education-programs')
}

export default educationProgramAPI
