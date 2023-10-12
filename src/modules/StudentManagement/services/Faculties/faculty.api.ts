import http from 'src/modules/Share/utils/http'
import { FacultyType } from '../../interfaces/faculty.type'

const facultyAPI = {
  getListFaculties: () => http.get<FacultyType[]>('/faculties')
}

export default facultyAPI
