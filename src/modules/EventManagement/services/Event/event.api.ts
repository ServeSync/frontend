import http from 'src/modules/Share/utils/http'
import {
  AttendanceStudentsListType,
  EventDetailType,
  EventsListConfig,
  EventsListType,
  FormEvent,
  RegisteredStudentsListType
} from '../../interfaces'

const eventAPI = {
  getListEvents: (params: EventsListConfig) => http.get<EventsListType>('/events', { params }),

  getListEventsByStatus: (eventStatus: string, size?: number) =>
    http.get<EventsListType>('/events', {
      params: {
        eventStatus,
        size
      }
    }),

  getEvent: (id: string) => http.get<EventDetailType>(`/events/${id}`),

  getRegisteredStudents: (id: string) => http.get<RegisteredStudentsListType>(`/events/${id}/registered-students`),

  getAttendanceStudents: (id: string) => http.get<AttendanceStudentsListType>(`/events/${id}/attendance-students`),

  createEvent: (body: FormEvent) => http.post('/events', body)
}

export default eventAPI
