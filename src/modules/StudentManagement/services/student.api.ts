import http from 'src/modules/Share/utils/http'
import { StudentListConfig, StudentType } from '../interfaces/student.type'

const studentAPI = {
  getListStudents: (params: StudentListConfig) =>
    http.get<{ total: number; totalPages: number; data: StudentType[] }>('/students', { params })
}

export default studentAPI
