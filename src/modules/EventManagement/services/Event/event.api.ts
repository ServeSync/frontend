import http from 'src/modules/Share/utils/http'
import {
  AttendanceStudentsListType,
  EventAttendance,
  EventDetailType,
  EventsListConfig,
  EventsListType,
  FormEvent,
  RegisteredEventType,
  RegisteredStudentsListType
} from '../../interfaces'

const eventAPI = {
  getListEvents: (params: EventsListConfig) => http.get<EventsListType>('/events', { params }),

  getEventById: (id: string) => http.get<EventDetailType>(`/events/${id}`),

  createEvent: (body: FormEvent) => http.post('/events', body),

  attendanceEvent: (body: { id: string; data: EventAttendance }) =>
    http.post(`/events/${body.id}/event-attendances`, body.data),

  cancelEvent: (id: string) => http.post(`/events/${id}/cancel`),

  approveEvent: (id: string) => http.post(`/events/${id}/approve`),

  registerEvent: (body: RegisteredEventType) => http.post('/events/register', body),

  rejectEvent: (id: string) => http.post(`/events/${id}/reject`),

  getListEventsByStatus: (eventStatus: string, size?: number) =>
    http.get<EventsListType>('/events', {
      params: {
        eventStatus,
        size
      }
    }),

  getRegisteredStudents: (id: string, page: number) =>
    http.get<RegisteredStudentsListType>(`/events/${id}/registered-students`, { params: { page } }),

  getAttendanceStudents: (id: string) => http.get<AttendanceStudentsListType>(`/events/${id}/attendance-students`)
}

export default eventAPI
