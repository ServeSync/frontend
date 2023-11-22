import http from 'src/modules/Share/utils/http'
import { StudentForm, StudentType, StudentsListConfig, StudentsListType } from '../../interfaces'
import { StudentAttendedEventsListType } from 'src/modules/EventManagement/interfaces'

const studentAPI = {
  getListStudents: (params: StudentsListConfig) => http.get<StudentsListType>('/students', { params }),

  getStudent: (id: string) => http.get<StudentType>(`/students/${id}`),

  createStudent: (body: StudentForm) => http.post('/students', body),

  editStudent: (body: { id: string; data: StudentForm }) => http.put(`/students/${body.id}`, body.data),

  deleteStudent: (id: string) => http.delete<StudentType>(`/students/${id}`),

  importFileStudents: (body: FormData) =>
    http.post('/students/import', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),

  exportAttendanceEvents: (id: string) => http.get(`/students/${id}/attendance-events/export`),

  getAttendedEvents: (id: string, page: number) =>
    http.get<StudentAttendedEventsListType>(`/students/${id}/attendance-events`, { params: { page } })
}

export default studentAPI
