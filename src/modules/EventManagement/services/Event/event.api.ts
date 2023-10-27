import http from 'src/modules/Share/utils/http'
import { EventsListConfig, EventsListType, FormEvent } from '../../interfaces'

const eventAPI = {
  getListEvents: (params: EventsListConfig) => http.get<EventsListType>('/events', { params }),

  getListEventsByStatus: (eventStatus: string, size: number) =>
    http.get<EventsListType>('/events', {
      params: {
        eventStatus,
        size
      }
    }),
  createEvent: (body: FormEvent) => http.post('/events', body)
}

export default eventAPI
