import http from 'src/modules/Share/utils/http'
import { RequestEventForm } from '../../interfaces/RequestEvent/request_event_form.type'
import { CollaborationRequestType, CollaborationRequestsListType, RequestEventsListConfig } from '../../interfaces'

const collaborationRequestAPI = {
  requestCreateEvent: (body: RequestEventForm) => http.post('/event-collaboration-requests', body),

  getListRequestEvents: (params: RequestEventsListConfig) =>
    http.get<CollaborationRequestsListType>('/event-collaboration-requests', { params }),

  getRequestEvent: (id: string) => http.get<CollaborationRequestType>(`/event-collaboration-requests/${id}`),

  approveRequestEvent: (id: string) => http.post(`/event-collaboration-requests/${id}/approve`),

  rejectRequestEvent: (id: string) => http.post(`/event-collaboration-requests/${id}/reject`)
}

export default collaborationRequestAPI
