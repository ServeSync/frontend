import http from 'src/modules/Share/utils/http'
import { RequestEventForm } from '../../interfaces/RequestEventForm/request_event_form.type'
import { EventPendingType, EventsPendingListType, RequestEventsListConfig } from '../../interfaces'

const requestEventAPI = {
  requestCreateEvent: (body: RequestEventForm) => http.post('/event-collaboration-requests', body),

  getListRequestEvents: (params: RequestEventsListConfig) =>
    http.get<EventsPendingListType>('/event-collaboration-requests', { params }),

  getRequestEvent: (id: string) => http.get<EventPendingType>(`/event-collaboration-requests/${id}`),

  approveRequestEvent: (id: string) => http.post<string>(`/event-collaboration-requests/${id}/approve`),

  rejectRequestEvent: (id: string) => http.post<string>(`/event-collaboration-requests/${id}/reject`)
}

export default requestEventAPI
