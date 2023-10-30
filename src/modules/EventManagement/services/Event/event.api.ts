import http from 'src/modules/Share/utils/http'
import { EventDetailType, EventsListConfig, EventsListType, FormEvent } from '../../interfaces'

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

  createEvent: (body: FormEvent) => http.post('/events', body)
}

export default eventAPI
