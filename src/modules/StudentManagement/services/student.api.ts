import http from 'src/modules/Share/utils/http'
import { StudentForm, StudentListConfig, StudentType, StudentsListType } from '../interfaces/student.type'

const studentAPI = {
  getListStudents: (params: StudentListConfig) => http.get<StudentsListType>('/students', { params }),

  getStudent: (id: string) => http.get<StudentType>(`/students/${id}`),

  deleteStudent: (id: string) => http.delete<StudentType>(`/students/${id}`),

  createStudent: (body: Omit<StudentForm, 'facultyId'>) => http.post('/students', body),

  editStudent: (body: { id: string; data: StudentForm }) => http.put(`/students/${body.id}`, body.data)
}

export default studentAPI
