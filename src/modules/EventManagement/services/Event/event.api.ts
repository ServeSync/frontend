import http from 'src/modules/Share/utils/http'
import { EventsListConfig, EventsListType } from '../../interfaces'

const eventAPI = {
  getListEvents: (params: EventsListConfig) => http.get<EventsListType>('/events', { params }),

  getListEventsByStatus: (eventStatus: string, size: number) =>
    http.get<EventsListType>('/events', {
      params: {
        eventStatus,
        size
      }
    })
}

export default eventAPI
