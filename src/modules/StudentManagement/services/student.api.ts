import http from 'src/modules/Share/utils/http'
import { StudentForm, StudentListConfig, StudentType, StudentsListType } from '../interfaces/student.type'

const studentAPI = {
  getListStudents: (params: StudentListConfig) => http.get<StudentsListType>('/students', { params }),

  getStudent: (id: string) => http.get<StudentType>(`/students/${id}`),

  deleteStudent: (id: string) => http.delete<StudentType>(`/students/${id}`),

  createStudent: (body: Omit<StudentForm, 'facultyId'>) => http.post('/students', body)
}

export default studentAPI
