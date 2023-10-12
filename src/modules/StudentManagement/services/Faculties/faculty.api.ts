import http from 'src/modules/Share/utils/http'
import { FacultyType } from '../../interfaces'

const facultyAPI = {
  getListFaculties: () => http.get<FacultyType[]>('/faculties')
}

export default facultyAPI
