import http from 'src/modules/Share/utils/http'
import { EventsListConfig, EventsListType, FormEvent } from '../../interfaces'

const eventAPI = {
  getListEvents: (params: EventsListConfig) => http.get<EventsListType>('/events', { params }),

  createEvent: (body: FormEvent) => http.post('/events', body)
}

export default eventAPI
