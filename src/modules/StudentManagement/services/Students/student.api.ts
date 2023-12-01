import http from 'src/modules/Share/utils/http'
import { StudentForm, StudentType, StudentsListConfig, StudentsListType } from '../../interfaces'
import { StudentAttendedEventsListType, StudentRegisteredEventsListType } from 'src/modules/EventManagement/interfaces'
import { FormExportFileType } from '../../utils'

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

  exportAttendanceEvents: (body: { id: string; data: FormExportFileType }) =>
    http.post(`/students/${body.id}/attendance-events/export`, body.data, {
      responseType: 'arraybuffer'
    }),

  getAttendedEvents: (id: string, page: number) =>
    http.get<StudentAttendedEventsListType>(`/students/${id}/attendance-events`, { params: { page } }),

  getRegisteredEvents: (id: string) => http.get<StudentRegisteredEventsListType>(`/students/${id}/registered-events`)
}

export default studentAPI
