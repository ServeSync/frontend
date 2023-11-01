import http from 'src/modules/Share/utils/http'
import {
  AttendanceStudentsListType,
  EventAttendance,
  EventDetailType,
  EventsListConfig,
  EventsListType,
  FormEvent,
  RegisteredStudentsListType
} from '../../interfaces'

const eventAPI = {
  getListEvents: (params: EventsListConfig) => http.get<EventsListType>('/events', { params }),

  getEvent: (id: string) => http.get<EventDetailType>(`/events/${id}`),
  createEvent: (body: FormEvent) => http.post('/events', body),

  attendanceEvent: (body: { id: string; data: EventAttendance }) =>
    http.post(`/events/${body.id}/event-attendances`, body.data),

  getListEventsByStatus: (eventStatus: string, size?: number) =>
    http.get<EventsListType>('/events', {
      params: {
        eventStatus,
        size
      }
    }),

  getRegisteredStudents: (id: string) => http.get<RegisteredStudentsListType>(`/events/${id}/registered-students`),

  getAttendanceStudents: (id: string) => http.get<AttendanceStudentsListType>(`/events/${id}/attendance-students`)
}

export default eventAPI
