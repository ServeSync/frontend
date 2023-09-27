import http from 'src/modules/Share/utils/http'
import { StudentListConfig, StudentType } from '../interfaces/student.type'

const studentAPI = {
  getListStudents: (params: StudentListConfig) =>
    http.get<{ total: number; totalPages: number; data: StudentType[] }>('/students', { params }),

  getStudent: (id: string) => http.get<StudentType>(`/students/${id}`),

  deleteStudent: (id: string) => http.delete<StudentType>(`/students/${id}`)
}

export default studentAPI
